"use client";

import type { RefObject } from "react";
import { IPOD_EXTRAS, IPOD_MENU, IPOD_SETTINGS, SONGS } from "@/lib/data/songs";
import { formatTrackTime } from "@/lib/format";
import type { IpodView } from "@/lib/types";

interface IpodProps {
  open: boolean;
  lit: boolean;
  playing: boolean;
  view: IpodView;
  songI: number;
  menuI: number;
  extraI: number;
  setI: number;
  elapsed: number;
  thumb: string;
  title: string;
  artist: string;
  duration: number;
  mediaRef: RefObject<HTMLVideoElement | null>;
  onClose: () => void;
  onSelect: () => void;
  onMenu: () => void;
  onMove: (dir: number) => void;
  onPlay: () => void;
  onPick: (index: number) => void;
  onStartVideo: () => void;
  onShowVideo: () => void;
}

function IpodBar({ title, playing }: { title: string; playing: boolean }) {
  return (
    <div className="ipod-bar">
      <span className="eq">
        {playing ? (
          <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor"><polygon points="1,0 8,4 1,8" /></svg>
        ) : (
          <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor"><rect x="0" y="0" width="3" height="8" /><rect x="5" y="0" width="3" height="8" /></svg>
        )}
      </span>
      <b>{title}</b>
      <span className="bat" />
    </div>
  );
}

function rows(items: readonly string[], on: number, onPick: (index: number) => void) {
  return items.map((label, index) => (
    <button type="button" className={`ipod-row ${index === on ? "on" : ""}`} key={label} onClick={() => onPick(index)}>
      {label}
    </button>
  ));
}

export function Ipod({
  open,
  lit,
  playing,
  view,
  songI,
  menuI,
  extraI,
  setI,
  elapsed,
  thumb,
  title,
  artist,
  duration,
  mediaRef,
  onClose,
  onSelect,
  onMenu,
  onMove,
  onPlay,
  onPick,
  onStartVideo,
  onShowVideo,
}: IpodProps) {
  const pct = Math.round((elapsed / duration) * 100);
  const screenClass = `ipod-screen ${view !== "home" ? "menu" : ""} ${view === "video" ? "video" : ""}`;

  return (
    <div className={`ipod-layer ${open ? "open" : ""}`} onClick={onClose}>
      <div className={`ipod ${playing ? "playing" : ""} ${lit ? "lit" : ""}`} onClick={(event) => event.stopPropagation()}>
        <div className={screenClass} onClick={() => view === "now" && onShowVideo()}>
          <div className="yt-host" onClick={(event) => {
            if (view === "video") {
              event.stopPropagation();
              onStartVideo();
            }
          }}>
            <video ref={mediaRef} playsInline preload="auto" />
          </div>
          <img className="ipod-poster" alt="" src={thumb} />
          {view === "video" && !playing ? (
            <button type="button" className="yt-overlay" aria-label="Play song" onClick={onStartVideo}>
              <span className="yt-btn" aria-hidden="true">
                <svg viewBox="0 0 68 48" width="44" height="31">
                  <path fill="#FF0000" d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55C3.97 2.33 2.26 4.81 1.48 7.74 0 13.05 0 24 0 24s0 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C68 34.95 68 24 68 24s0-10.95-1.48-16.26z" />
                  <path fill="#fff" d="M45 24 27 14v20" />
                </svg>
              </span>
            </button>
          ) : null}
          <div className="ipod-ui">
            {view === "home" ? (
              <div className="ipod-home"><div className="apple"></div><small>Masen James&apos;s iPod</small></div>
            ) : null}
            {view === "menu" ? <><IpodBar title="iPod" playing={playing} />{rows(IPOD_MENU, menuI, onPick)}</> : null}
            {view === "extras" ? <><IpodBar title="Extras" playing={playing} />{rows(IPOD_EXTRAS, extraI, onPick)}</> : null}
            {view === "settings" ? <><IpodBar title="Settings" playing={playing} />{rows(IPOD_SETTINGS, setI, onPick)}</> : null}
            {view === "songs" ? (
              <>
                <IpodBar title="All Songs" playing={playing} />
                {SONGS.map((item, index) => (
                  <button type="button" className={`ipod-row ${index === songI ? "on" : ""}`} key={item.id} onClick={() => onPick(index)}>
                    {item.title}
                  </button>
                ))}
              </>
            ) : null}
            {view === "loading" ? (
              <div className="ipod-now">
                <IpodBar title="Now Playing" playing={playing} />
                <div className="ipod-load"><b>{title}</b><span>{artist}</span><em>Loading...</em></div>
              </div>
            ) : null}
            {view === "video" ? (
              <div className="ipod-now"><IpodBar title="Now Playing" playing={playing} /></div>
            ) : null}
            {view === "now" ? (
              <div className="ipod-now">
                <IpodBar title="Now Playing" playing={playing} />
                <div className="of">{songI + 1} of {SONGS.length}</div>
                <div className="meta"><b>{title}</b><span>{artist}</span></div>
                <div className="ipod-prog">
                  <span>{formatTrackTime(elapsed)}</span>
                  <div className="track"><i style={{ width: `${pct}%` }} /></div>
                  <span>-{formatTrackTime(duration - elapsed)}</span>
                </div>
              </div>
            ) : null}
          </div>
        </div>
        <div className="wheel">
          <div className="wheel-shine" />
          <button type="button" className="wh m" aria-label="Menu" onClick={onMenu}>
            <svg width="32" height="12" viewBox="0 0 32 12" fill="#666" aria-hidden="true"><text x="16" y="9" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="system-ui, -apple-system, sans-serif">MENU</text></svg>
          </button>
          <button type="button" className="wh l" aria-label="Previous" onClick={() => onMove(-1)}>
            <svg width="12" height="12" viewBox="0 0 16 16" fill="#666" aria-hidden="true"><rect x="1" y="2" width="2" height="12" /><polygon points="10,2 4,8 10,14" /><polygon points="16,2 10,8 16,14" /></svg>
          </button>
          <button type="button" className="wh r" aria-label="Next" onClick={() => onMove(1)}>
            <svg width="12" height="12" viewBox="0 0 16 16" fill="#666" aria-hidden="true"><polygon points="0,2 6,8 0,14" /><polygon points="6,2 12,8 6,14" /><rect x="13" y="2" width="2" height="12" /></svg>
          </button>
          <button type="button" className="wh p" aria-label="Play" onClick={onPlay}>
            {playing ? (
              <svg width="12" height="12" viewBox="0 0 16 16" fill="#666" aria-hidden="true"><rect x="3" y="2" width="3" height="12" /><rect x="10" y="2" width="3" height="12" /></svg>
            ) : (
              <svg width="12" height="12" viewBox="0 0 16 16" fill="#666" aria-hidden="true"><polygon points="4,2 14,8 4,14" /></svg>
            )}
          </button>
          <button type="button" className="hub" aria-label="Select" onClick={onSelect}><span className="hub-gloss" /></button>
        </div>
        <button className="ipod-x" type="button" aria-label="Close" onClick={onClose}>×</button>
      </div>
    </div>
  );
}
