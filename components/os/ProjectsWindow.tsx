"use client";

import type { ReactNode } from "react";
import { PROJECTS, PROJECT_KEYS } from "@/lib/data/projects";
import type { ProjectKey } from "@/lib/types";

const ICONS: Record<ProjectKey, ReactNode> = {
  laver: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18" /></svg>
  ),
  atria: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 11.5 12 4l9 7.5" /><path d="M6 10.5V20h12v-9.5" /></svg>
  ),
  plinq: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="4" y="4" width="7" height="7" rx="1" /><rect x="13" y="4" width="7" height="7" rx="1" /><rect x="4" y="13" width="7" height="7" rx="1" /><rect x="13" y="13" width="7" height="7" rx="1" /></svg>
  ),
  nuvio: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M7 7h10M7 12h10M7 17h10" /><path d="m15 7 4 5-4 5M9 7 5 12l4 5" /></svg>
  ),
  sorae: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 5.6-7 10-7 10Z" /></svg>
  ),
  veyra: (
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.5 14.2 9h6.3l-5.1 4 1.9 6.5L12 16.2 6.7 19.5 8.6 13 3.5 9h6.3L12 2.5Z" /></svg>
  ),
};

export function ProjectsWindow({ active, onSelect }: { active: ProjectKey; onSelect: (key: ProjectKey) => void }) {
  const project = PROJECTS[active];
  return (
    <div className="proj">
      <aside className="proj-side">
        <h4>Projects</h4>
        {PROJECT_KEYS.map((key) => (
          <button key={key} className={`proj-item ${key === active ? "active" : ""}`} type="button" onClick={() => onSelect(key)}>
            {ICONS[key]} {PROJECTS[key].name}
          </button>
        ))}
      </aside>
      <div className="win-body">
        <div className="crumb">User / Projects / <b>{project.name}</b></div>
        <div className="proj-head">
          <h2>{project.name}</h2>
          <a className="visit" href="#" target="_blank" rel="noreferrer">
            Visit{" "}
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ display: "inline", verticalAlign: "-1px" }}>
              <path d="M7 17 17 7M8 7h9v9" />
            </svg>
          </a>
        </div>
        <p className="proj-desc">{project.desc}</p>
        <div className="proj-meta">
          <div><small>Category</small>{project.category}</div>
          <div><small>Client</small>{project.client}</div>
        </div>
        <div className="proj-hero"><img src={project.img} alt={project.name} /></div>
        <div className="proj-extra">
          <h4>Challenges</h4>
          <p>{project.challenge}</p>
          <h4>Final thoughts</h4>
          <p>{project.thoughts}</p>
        </div>
        {project.extras.map((src) => (
          <div className="proj-hero" key={src}><img src={src} alt="" /></div>
        ))}
      </div>
    </div>
  );
}
