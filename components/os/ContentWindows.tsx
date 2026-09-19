"use client";

import { useEffect, useRef, useState } from "react";
import { GALLERY, RESUME_SKILLS, RESOURCES } from "@/lib/data/desktop";
import { MovieGrid } from "@/components/os/MovieGrid";

export function GalleryWindow() {
  return (
    <div className="win-body">
      <h2 className="win-title">Life Dump - Gallery</h2>
      <div className="gal-grid">
        {GALLERY.map((item) => (
          <img key={item.src} src={item.src} alt={item.alt} />
        ))}
      </div>
    </div>
  );
}

export function ReelWindow({ playing }: { playing: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (playing) {
      video.currentTime = 0;
      video.muted = true;
      video.play().catch(() => undefined);
    } else {
      video.pause();
    }
  }, [playing]);
  return (
    <div className="win-body reel-body">
      <video ref={ref} className="reel-video" src="/assets/video/reel.mp4" muted loop playsInline controls />
    </div>
  );
}

export function ContactWindow() {
  const [sent, setSent] = useState(false);
  return (
    <div className="win-body">
      <div className="contact-head">
        <div>
          <h2>Mason James</h2>
          <p className="role">Product Designer <span>|</span> Brooklyn</p>
        </div>
        <div className="icon-row">
          <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><img src="/assets/icons/instagram.svg" alt="" /></a>
          <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="X"><img src="/assets/icons/x.svg" alt="" /></a>
          <a href="tel:+84123456789" aria-label="Phone"><img src="/assets/icons/phone.svg" alt="" /></a>
          <a href="mailto:masonjames@designer" aria-label="Mail"><img src="/assets/icons/mail.svg" alt="" /></a>
          <a href="#" aria-label="LinkedIn"><img src="/assets/icons/linkedin.svg" alt="" /></a>
        </div>
      </div>
      <p style={{ marginBottom: 10, fontSize: 13, color: "#555" }}>Get In Touch:</p>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setSent(true);
        }}
      >
        <label>Name *</label>
        <input placeholder="Enter your name" required />
        <label>Email *</label>
        <input type="email" placeholder="Enter you email" required />
        <label>Message</label>
        <textarea placeholder="Enter your message" />
        <button className="btn" type="submit">{sent ? "Sent" : "Submit"}</button>
      </form>
      <p className="fine">Turning ideas into bold digital experiences, products, and visual systems that people remember.</p>
    </div>
  );
}

export function ResumeWindow() {
  return (
    <div className="win-body">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h2 style={{ fontSize: 24 }}>Mason James</h2>
          <p style={{ color: "#555", marginTop: 4 }}>Product Designer (UI/UX)</p>
        </div>
        <div className="avail">
          <span className="dot" style={{ width: 7, height: 7, borderRadius: "50%", background: "#34c759", display: "inline-block" }} /> Available for work
        </div>
      </div>
      <div className="stats">
        <span>6+ Years Experience</span>
        <span>50+ Projects Completed</span>
        <span>25+ Collaborations</span>
      </div>
      <p>Creative and detail-oriented Product Designer with 7+ years of experience designing SaaS platforms, mobile applications, dashboards, and high-converting websites. Passionate about simplifying complex problems through thoughtful user experiences and clean visual design.</p>
      <div className="about-meta">
        <span>masonjames@designer</span>
        <span>+84(123) 456-789</span>
        <span>2025</span>
      </div>
      <h3 style={{ margin: "22px 0 8px", fontSize: 15, color: "#888", fontWeight: 500 }}>Education</h3>
      <p>University of California · B.A. in Design & Human-Computer Interaction</p>
      <h3 style={{ margin: "22px 0 8px", fontSize: 15, color: "#888", fontWeight: 500 }}>Core Skills</h3>
      <ul className="skills">
        {RESUME_SKILLS.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </div>
  );
}

export function ResourcesWindow() {
  return (
    <div className="win-body">
      <h2 className="win-title">Resources</h2>
      <div className="res-grid">
        {RESOURCES.map((item) => (
          <a className="res" href={item.href} target="_blank" rel="noreferrer" key={item.label}>
            <img src={item.img} alt="" />
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
}

export function MoviesWindow() {
  return (
    <div className="win-body">
      <h2 className="win-title">My Favorites</h2>
      <MovieGrid />
    </div>
  );
}
