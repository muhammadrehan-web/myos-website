"use client";

import { SERVICES } from "@/lib/data/desktop";
import { PROJECTS, PROJECT_KEYS } from "@/lib/data/projects";
import type { ProjectKey } from "@/lib/types";
import { MovieGrid } from "@/components/os/MovieGrid";

interface Props {
  copied: string | null;
  onCopy: (value: string) => void;
  onOpenProject: (key: ProjectKey) => void;
}

export function AboutWindow({ copied, onCopy, onOpenProject }: Props) {
  return (
    <div className="win-body">
      <h2 className="win-title">About Me</h2>
      <div className="about-grid">
        <img src="/assets/img/xgbjcCXCBjxJCXwrzv72FvO0SBs.png" alt="Mason James" />
        <div className="about-copy">
          <h3>Mason James</h3>
          <p>I’m a multidisciplinary designer turning ideas into bold digital experiences, thoughtful products, and visual systems people remember.</p>
          <div className="status"><span className="dot" /> Available for work</div>
          <div className="about-links">
            <CopyChip value="masonjames@designer" copied={copied} onCopy={onCopy} />
            <CopyChip value="+92 300 642 1234" copied={copied} onCopy={onCopy} />
          </div>
        </div>
      </div>
      <div className="services">
        <h3>Services</h3>
        <div className="svc-row">
          {SERVICES.map((item) => (
            <div className="svc" key={item.title}>
              <img src={item.img} alt="" />
              <strong>{item.title}</strong>
              <span>{item.copy}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="about-projects">
        <h3>Projects</h3>
        <div className="ap-grid">
          {PROJECT_KEYS.map((key) => {
            const project = PROJECTS[key];
            return (
              <button type="button" className="ap-card" key={key} onClick={() => onOpenProject(key)}>
                <img className={project.aboutShot ? "shot" : undefined} src={project.aboutShot || project.img} alt={project.name} />
                <div className="ap-meta">
                  <strong>{project.name}</strong>
                  <span>{project.category}</span>
                  <em>{project.year}</em>
                </div>
              </button>
            );
          })}
        </div>
      </div>
      <div className="about-favs">
        <h3>My Favorites</h3>
        <MovieGrid className="about-mov-grid" />
      </div>
    </div>
  );
}

function CopyChip({ value, copied, onCopy }: { value: string; copied: string | null; onCopy: (value: string) => void }) {
  return (
    <button type="button" className={`copy-chip ${copied === value ? "copied" : ""}`} onClick={() => onCopy(value)}>
      <span className="copy-label">{value}</span>
      <span className="copy-done">Copied!</span>
    </button>
  );
}
