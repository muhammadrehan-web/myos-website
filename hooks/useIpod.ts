"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { IPOD_EXTRAS, IPOD_MENU, IPOD_SETTINGS, SONGS, songFile, songThumb } from "@/lib/data/songs";
import { wrapIndex } from "@/lib/format";
import type { IpodView } from "@/lib/types";

export function useIpod(open: boolean) {
  const mediaRef = useRef<HTMLVideoElement | null>(null);
  const loadTimer = useRef<number>(0);
  const [view, setView] = useState<IpodView>("songs");
  const [songI, setSongI] = useState(0);
  const [menuI, setMenuI] = useState(0);
  const [extraI, setExtraI] = useState(0);
  const [setI, setSetI] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [lit, setLit] = useState(false);
  const [loaded, setLoaded] = useState("");
  const playingRef = useRef(false);
  const songRef = useRef(0);
  const viewRef = useRef<IpodView>("songs");

  playingRef.current = playing;
  songRef.current = songI;
  viewRef.current = view;

  const song = SONGS[songI];

  const loadSong = useCallback((autoplay: boolean, index = songRef.current, time = 0) => {
    const media = mediaRef.current;
    const next = SONGS[index];
    if (!media || !next) return;
    const src = songFile(next.id);
    if (loaded !== next.id) {
      setLoaded(next.id);
      media.src = src;
      media.load();
    }
    media.muted = false;
    media.volume = 1;
    try {
      if (Math.abs((media.currentTime || 0) - time) > 0.4) media.currentTime = time;
    } catch {
      /* ignore seek until metadata */
    }
    if (autoplay) {
      media.play().catch(() => undefined);
    } else {
      media.pause();
    }
  }, [loaded]);

  const playIndex = useCallback((index: number, autoplay = false) => {
    const next = wrapIndex(index, SONGS.length);
    setSongI(next);
    setElapsed(0);
    setLoaded("");
    setView("loading");
    const media = mediaRef.current;
    if (media) {
      try { media.currentTime = 0; } catch { /* ignore */ }
    }
    window.clearTimeout(loadTimer.current);
    if (autoplay) {
      setPlaying(true);
      loadSong(true, next, 0);
    } else {
      setPlaying(false);
      loadSong(false, next, 0);
    }
    loadTimer.current = window.setTimeout(() => setView("video"), 500);
  }, [loadSong]);

  const startVideo = useCallback(() => {
    setView("video");
    setPlaying(true);
    loadSong(true, songRef.current, mediaRef.current?.currentTime || 0);
  }, [loadSong]);

  const chooseMenu = useCallback((index: number) => {
    setMenuI(index);
    if (index === 0) setView("songs");
    else if (index === 1) setView("extras");
    else if (index === 2) setView("settings");
    else if (index === 3) playIndex(Math.floor(Math.random() * SONGS.length), true);
    else if (index === 4) setLit((on) => !on);
    else if (!playingRef.current && elapsed === 0) playIndex(songRef.current);
    else setView("now");
  }, [elapsed, playIndex]);

  const select = useCallback(() => {
    if (view === "home") setView("menu");
    else if (view === "menu") chooseMenu(menuI);
    else if (view === "extras" || view === "settings") setView("menu");
    else if (view === "songs") playIndex(songI);
    else if (view === "now") setView("video");
    else if (view === "video") startVideo();
  }, [chooseMenu, menuI, playIndex, songI, startVideo, view]);

  const menu = useCallback(() => {
    if (view === "home") setView("menu");
    else if (view === "video" || view === "now" || view === "loading") setView("songs");
    else if (view === "songs" || view === "extras" || view === "settings") setView("menu");
    else setView("home");
  }, [view]);

  const move = useCallback((dir: number) => {
    if (view === "menu") setMenuI((i) => wrapIndex(i + dir, IPOD_MENU.length));
    else if (view === "extras") setExtraI((i) => wrapIndex(i + dir, IPOD_EXTRAS.length));
    else if (view === "settings") setSetI((i) => wrapIndex(i + dir, IPOD_SETTINGS.length));
    else if (view === "songs") setSongI((i) => wrapIndex(i + dir, SONGS.length));
    else if (view === "now" || view === "video") playIndex(songI + dir, true);
  }, [playIndex, songI, view]);

  const pick = useCallback((index: number) => {
    if (view === "songs") playIndex(index);
    else if (view === "menu") chooseMenu(index);
    else if (view === "extras") {
      setExtraI(index);
      setView("menu");
    } else if (view === "settings") {
      setSetI(index);
      setView("menu");
    }
  }, [chooseMenu, playIndex, view]);

  const togglePlay = useCallback(() => {
    if (view === "home" || view === "menu" || view === "songs" || view === "extras" || view === "settings") {
      playIndex(songI, true);
      return;
    }
    setPlaying((on) => {
      const next = !on;
      loadSong(next, songRef.current, mediaRef.current?.currentTime || elapsed);
      return next;
    });
  }, [elapsed, loadSong, playIndex, songI, view]);

  const reset = useCallback(() => {
    setPlaying(false);
    setView("songs");
    setElapsed(0);
    setLoaded("");
    const media = mediaRef.current;
    if (media) {
      media.pause();
      media.removeAttribute("src");
      media.load();
    }
  }, []);

  useEffect(() => {
    if (open) setView("songs");
    else reset();
  }, [open, reset]);

  useEffect(() => {
    const media = mediaRef.current;
    if (!media) return;
    const onTime = () => setElapsed(media.currentTime || 0);
    const onEnded = () => {
      if (playingRef.current) playIndex(songRef.current + 1, true);
    };
    media.addEventListener("timeupdate", onTime);
    media.addEventListener("ended", onEnded);
    return () => {
      media.removeEventListener("timeupdate", onTime);
      media.removeEventListener("ended", onEnded);
    };
  }, [playIndex]);

  return {
    mediaRef,
    view,
    songI,
    menuI,
    extraI,
    setI,
    playing,
    elapsed,
    lit,
    song,
    thumb: songThumb(song.id),
    select,
    menu,
    move,
    pick,
    togglePlay,
    startVideo,
    showVideo: () => setView("video"),
    reset,
  };
}
