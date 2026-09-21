"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { WINDOW_LAYOUTS } from "@/lib/data/desktop";
import type { OpenTarget, OverlayId, ProjectKey, WindowId, WinRuntime } from "@/lib/types";

const WINDOW_IDS: WindowId[] = WINDOW_LAYOUTS.map((item) => item.id);

function place(layout: (typeof WINDOW_LAYOUTS)[number], vw: number, vh: number) {
  if (vw <= 809) return { left: 8, top: 44 };
  return {
    left: Math.round(layout.x * (vw / 1440)),
    top: Math.max(40, Math.round(layout.y * (vh / 900)) - 70),
  };
}

function initialWindows(): Record<WindowId, WinRuntime> {
  const next = {} as Record<WindowId, WinRuntime>;
  WINDOW_LAYOUTS.forEach((layout, index) => {
    const pos = place(layout, 1440, 900);
    next[layout.id] = { open: false, max: false, z: 20 + index, left: pos.left, top: pos.top };
  });
  return next;
}

export function useWindows() {
  const zRef = useRef(40);
  const [windows, setWindows] = useState<Record<WindowId, WinRuntime>>(initialWindows);
  const [overlays, setOverlays] = useState<Record<OverlayId, boolean>>({ ipod: false, game: false });
  const [activeProject, setActiveProject] = useState<ProjectKey>("laver");
  const [copied, setCopied] = useState<string | null>(null);
  const copyTimer = useRef<number>(0);

  const bring = useCallback((id: WindowId) => {
    zRef.current += 1;
    const z = zRef.current;
    setWindows((prev) => ({ ...prev, [id]: { ...prev[id], z } }));
  }, []);

  const closeWindow = useCallback((id: WindowId) => {
    setWindows((prev) => ({ ...prev, [id]: { ...prev[id], open: false, max: false } }));
  }, []);

  const openWindow = useCallback(
    (id: WindowId, project?: ProjectKey) => {
      if (project) setActiveProject(project);
      zRef.current += 1;
      const z = zRef.current;
      setWindows((prev) => ({ ...prev, [id]: { ...prev[id], open: true, z } }));
    },
    [],
  );

  const toggleWindow = useCallback(
    (kind: OpenTarget, project?: ProjectKey, fromInside = false) => {
      if (kind === "external") return;
      if (kind === "ipod" || kind === "game") {
        setOverlays((prev) => ({ ...prev, [kind]: fromInside ? true : !prev[kind] }));
        return;
      }
      setWindows((prev) => {
        const current = prev[kind];
        const sameProject = !project || kind !== "projects" || activeProject === project;
        if (!fromInside && current.open && sameProject) {
          return { ...prev, [kind]: { ...current, open: false, max: false } };
        }
        zRef.current += 1;
        return { ...prev, [kind]: { ...current, open: true, z: zRef.current } };
      });
      if (project) setActiveProject(project);
    },
    [activeProject],
  );

  const maximize = useCallback((id: WindowId) => {
    setWindows((prev) => ({ ...prev, [id]: { ...prev[id], max: !prev[id].max } }));
    bring(id);
  }, [bring]);

  const moveWindow = useCallback((id: WindowId, left: number, top: number) => {
    setWindows((prev) => ({ ...prev, [id]: { ...prev[id], left, top } }));
  }, []);

  const copyValue = useCallback((value: string) => {
    if (navigator.clipboard?.writeText) navigator.clipboard.writeText(value).catch(() => undefined);
    setCopied(value);
    window.clearTimeout(copyTimer.current);
    copyTimer.current = window.setTimeout(() => setCopied(null), 1200);
  }, []);

  const closeOverlay = useCallback((id: OverlayId) => {
    setOverlays((prev) => ({ ...prev, [id]: false }));
  }, []);

  const layoutById = useMemo(() => {
    return Object.fromEntries(WINDOW_LAYOUTS.map((item) => [item.id, item])) as Record<WindowId, (typeof WINDOW_LAYOUTS)[number]>;
  }, []);

  const reflow = useCallback(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    setWindows((prev) => {
      const next = { ...prev };
      WINDOW_IDS.forEach((id) => {
        if (!next[id].open || next[id].max) return;
        const layout = WINDOW_LAYOUTS.find((item) => item.id === id);
        if (!layout) return;
        const pos = place(layout, vw, vh);
        next[id] = { ...next[id], left: pos.left, top: pos.top };
      });
      return next;
    });
  }, []);

  return {
    windows,
    overlays,
    activeProject,
    setActiveProject,
    copied,
    copyValue,
    bring,
    closeWindow,
    openWindow,
    toggleWindow,
    maximize,
    moveWindow,
    closeOverlay,
    layoutById,
    reflow,
  };
}
