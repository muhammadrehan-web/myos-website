"use client";

import type { CSSProperties, PointerEvent, ReactNode } from "react";
import type { WindowId } from "@/lib/types";

interface Props {
  id: WindowId;
  title?: string;
  className?: string;
  style?: CSSProperties;
  open: boolean;
  max: boolean;
  z: number;
  children: ReactNode;
  socials?: boolean;
  home?: boolean;
  onClose: () => void;
  onMin: () => void;
  onMax: () => void;
  onHome?: () => void;
  onPointerDownBar: (event: PointerEvent<HTMLDivElement>) => void;
}

export function OsWindow({
  className = "",
  style,
  open,
  max,
  z,
  children,
  socials,
  home,
  onClose,
  onMin,
  onMax,
  onHome,
  onPointerDownBar,
}: Props) {
  return (
    <section className={`win ${className} ${open ? "open" : ""} ${max ? "max" : ""}`} style={{ ...style, zIndex: z }}>
      <div className="titlebar" onPointerDown={onPointerDownBar}>
        <div className="traffic">
          <button className="tl-close" type="button" onClick={onClose} />
          <button className="tl-min" type="button" onClick={onMin} />
          <button className="tl-max" type="button" onClick={onMax} />
        </div>
        {home ? (
          <button className="home-btn" type="button" aria-label="Home" onClick={onHome}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M3 11.5 12 4l9 7.5" />
              <path d="M6 10.5V20h12v-9.5" />
            </svg>
          </button>
        ) : null}
        {socials ? (
          <div className="win-socials">
            <a href="#" aria-label="LinkedIn"><img src="/assets/icons/linkedin.svg" alt="" /></a>
            <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="X"><img src="/assets/icons/x.svg" alt="" /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><img src="/assets/icons/instagram.svg" alt="" /></a>
          </div>
        ) : null}
      </div>
      {children}
    </section>
  );
}
