"use client";

import { useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { DESKTOP_ICONS, DOCK_ITEMS, GAME_URL, WINDOW_LAYOUTS } from "@/lib/data/desktop";
import { useClock } from "@/hooks/useClock";
import { useIpod } from "@/hooks/useIpod";
import { useNeko } from "@/hooks/useNeko";
import { useWindows } from "@/hooks/useWindows";
import { AboutWindow } from "@/components/os/AboutWindow";
import { ContactWindow, GalleryWindow, MoviesWindow, ReelWindow, ResourcesWindow, ResumeWindow } from "@/components/os/ContentWindows";
import { IntroHello } from "@/components/os/IntroHello";
import { Ipod } from "@/components/os/Ipod";
import { OsWindow } from "@/components/os/OsWindow";
import { ProjectsWindow } from "@/components/os/ProjectsWindow";
import type { OpenTarget, ProjectKey, WindowId } from "@/lib/types";

export function MyOS() {
  const clock = useClock();
  const [catsOn, setCatsOn] = useState(false);
  const [narrow, setNarrow] = useState(false);
  const neko = useNeko(catsOn);
  const os = useWindows();
  const ipod = useIpod(os.overlays.ipod);
  const drag = useRef<{ id: WindowId; dx: number; dy: number } | null>(null);

  useEffect(() => {
    const onResize = () => {
      setNarrow(window.innerWidth <= 900);
      os.reflow();
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [os.reflow]);

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      if (!drag.current) return;
      os.moveWindow(drag.current.id, event.clientX - drag.current.dx, event.clientY - drag.current.dy);
    };
    const onUp = () => {
      drag.current = null;
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [os.moveWindow]);

  const openTarget = (kind: OpenTarget, project?: ProjectKey, fromInside = false) => {
    if (kind === "external") return;
    os.toggleWindow(kind, project, fromInside);
  };

  const onIcon = (kind: OpenTarget, url?: string, project?: ProjectKey) => {
    if (kind === "external" && url) {
      window.open(url, "_blank", "noopener");
      return;
    }
    openTarget(kind, project);
  };

  const onBarDown = (id: WindowId, event: ReactPointerEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (target.closest("button,a")) return;
    if (os.windows[id].max) return;
    os.bring(id);
    const rect = (event.currentTarget.closest(".win") as HTMLElement).getBoundingClientRect();
    drag.current = { id, dx: event.clientX - rect.left, dy: event.clientY - rect.top };
  };

  const winProps = (id: WindowId) => {
    const state = os.windows[id];
    const layout = WINDOW_LAYOUTS.find((item) => item.id === id);
    return {
      id,
      open: state.open,
      max: state.max,
      z: state.z,
      className: `${layout?.narrow ? "narrow" : ""} ${layout?.extraClass || ""}`.trim(),
      style: { left: state.left, top: state.top },
      onClose: () => os.closeWindow(id),
      onMin: () => os.closeWindow(id),
      onMax: () => os.maximize(id),
      onPointerDownBar: (event: ReactPointerEvent<HTMLDivElement>) => onBarDown(id, event),
    };
  };

  return (
    <>
      <div className="os" id="os">
        <div className="wallpaper" />
        <header className="menubar">
          <div className="logo">Masen James</div>
          <div className="menubar-right">
            <div className="socials">
              <a href="#" aria-label="Notes"><img src="/assets/icons/notes.svg" alt="" /></a>
              <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="X"><img src="/assets/icons/x.svg" alt="" /></a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><img src="/assets/icons/instagram.svg" alt="" /></a>
            </div>
            <div className="clock">
              {clock.datePart} <span className="clock-sep">|</span> {clock.timePart}
            </div>
          </div>
        </header>

        <div className="desktop">
          {DESKTOP_ICONS.map((icon) => (
            <button
              key={icon.id}
              className={`icon ${icon.className}`}
              type="button"
              onClick={() => onIcon(icon.open, icon.url, icon.project)}
            >
              <img src={icon.src} alt="" />
              <span>{icon.id === "about" && narrow ? "Tips" : icon.label}</span>
            </button>
          ))}
        </div>

        <button className={`cats-toggle ${catsOn ? "on" : ""}`} type="button" onClick={() => setCatsOn((on) => !on)}>
          <span>You like cats?</span>
          <span className="switch"><i /></span>
        </button>

        <div className="dock-wrap">
          <nav className="dock">
            {DOCK_ITEMS.map((item) => (
              <button key={item.tip} className="dock-item" type="button" onClick={() => openTarget(item.open)}>
                <span className="tip">{item.tip}</span>
                <img src={item.src} alt={item.tip} />
                {"badge" in item && item.badge ? <span className="badge">{item.badge}</span> : null}
              </button>
            ))}
          </nav>
        </div>

        <a className="framer-badge" href="https://www.framer.com" target="_blank" rel="noreferrer">
          <svg width="12" height="12" viewBox="0 0 12 12"><path fill="#000" d="M0 0h12v4H6L0 0Zm0 4h6l6 4H6v4L0 8V4Z" /></svg>
          Made in Framer
        </a>

        <OsWindow {...winProps("about")} socials>
          <AboutWindow copied={os.copied} onCopy={os.copyValue} onOpenProject={(key) => os.openWindow("projects", key)} />
        </OsWindow>
        <OsWindow {...winProps("projects")} home onHome={() => os.openWindow("about")}>
          <ProjectsWindow active={os.activeProject} onSelect={os.setActiveProject} />
        </OsWindow>
        <OsWindow {...winProps("gallery")} socials>
          <GalleryWindow />
        </OsWindow>
        <OsWindow {...winProps("reel")} socials>
          <ReelWindow playing={os.windows.reel.open} />
        </OsWindow>
        <OsWindow {...winProps("contact")}>
          <ContactWindow />
        </OsWindow>
        <OsWindow {...winProps("resume")} socials>
          <ResumeWindow />
        </OsWindow>
        <OsWindow {...winProps("resources")} socials>
          <ResourcesWindow />
        </OsWindow>
        <OsWindow {...winProps("movies")} socials>
          <MoviesWindow />
        </OsWindow>

        <Ipod
          open={os.overlays.ipod}
          lit={ipod.lit}
          playing={ipod.playing}
          view={ipod.view}
          songI={ipod.songI}
          menuI={ipod.menuI}
          extraI={ipod.extraI}
          setI={ipod.setI}
          elapsed={ipod.elapsed}
          thumb={ipod.thumb}
          title={ipod.song.title}
          artist={ipod.song.artist}
          duration={ipod.song.duration}
          mediaRef={ipod.mediaRef}
          onClose={() => os.closeOverlay("ipod")}
          onSelect={ipod.select}
          onMenu={ipod.menu}
          onMove={ipod.move}
          onPlay={ipod.togglePlay}
          onPick={ipod.pick}
          onStartVideo={ipod.startVideo}
          onShowVideo={ipod.showVideo}
        />

        <div className={`game-layer ${os.overlays.game ? "open" : ""}`} onClick={() => os.closeOverlay("game")}>
          <div className="game-stage" onClick={(event) => event.stopPropagation()}>
            <iframe title="Herding cats" src={os.overlays.game ? GAME_URL : "about:blank"} allow="autoplay; fullscreen; gamepad" />
          </div>
        </div>
      </div>
      <img id="neko" alt="" src={neko.src} style={{ left: neko.pos.x, top: neko.pos.y }} />
      <IntroHello />
    </>
  );
}
