"use client";

import { useEffect, useRef, useState } from "react";
import { directionFromDelta } from "@/lib/format";

const SPRITES: Record<string, string | [string, string]> = {
  still: "still.gif",
  alert: "alert.gif",
  yawn: "yawn.gif",
  sleep: ["sleep1.gif", "sleep2.gif"],
  itch: ["itch1.gif", "itch2.gif"],
  lick: "lickpaw.gif",
  n: ["nrun1.gif", "nrun2.gif"],
  ne: ["nerun1.gif", "nerun2.gif"],
  e: ["erun1.gif", "erun2.gif"],
  se: ["serun1.gif", "serun2.gif"],
  s: ["srun1.gif", "srun2.gif"],
  sw: ["swrun1.gif", "swrun2.gif"],
  w: ["wrun1.gif", "wrun2.gif"],
  nw: ["nwrun1.gif", "nwrun2.gif"],
};

export function useNeko(catsOn: boolean) {
  const [src, setSrc] = useState("/assets/img/sleep2.gif");
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const mouse = useRef({ x: 0, y: 0 });
  const neko = useRef({ x: 0, y: 0 });
  const idle = useRef(0);
  const frame = useRef(0);

  useEffect(() => {
    neko.current = { x: window.innerWidth / 2 - 16, y: window.innerHeight / 2 - 40 };
    mouse.current = { ...neko.current };
    setPos({ ...neko.current });

    const onMove = (event: MouseEvent) => {
      mouse.current = { x: event.clientX, y: event.clientY };
    };
    window.addEventListener("mousemove", onMove);

    const id = window.setInterval(() => {
      frame.current += 1;
      const dx = mouse.current.x - neko.current.x;
      const dy = mouse.current.y - neko.current.y;
      const dist = Math.hypot(dx, dy);
      const speed = catsOn ? 14 : 10;
      let file = "still.gif";
      if (dist > 48) {
        idle.current = 0;
        const dir = directionFromDelta(dx, dy);
        neko.current.x += (dx / dist) * speed;
        neko.current.y += (dy / dist) * speed;
        const files = SPRITES[dir] as [string, string];
        file = files[frame.current % 2];
      } else {
        idle.current += 1;
        if (idle.current < 8) file = SPRITES.alert as string;
        else if (idle.current < 16) file = SPRITES.yawn as string;
        else if (idle.current < 24) file = (SPRITES.itch as [string, string])[frame.current % 2];
        else if (idle.current < 30) file = SPRITES.lick as string;
        else file = (SPRITES.sleep as [string, string])[frame.current % 2];
      }
      setSrc(`/assets/img/${file}`);
      setPos({ x: neko.current.x, y: neko.current.y });
    }, 180);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.clearInterval(id);
    };
  }, [catsOn]);

  return { src, pos };
}
