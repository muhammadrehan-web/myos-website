export type WindowId =
  | "about"
  | "projects"
  | "gallery"
  | "reel"
  | "contact"
  | "resume"
  | "resources"
  | "movies";

export type OverlayId = "ipod" | "game";

export type OpenTarget = WindowId | OverlayId | "external";

export type ProjectKey = "laver" | "atria" | "plinq" | "nuvio" | "sorae" | "veyra";

export interface Project {
  key: ProjectKey;
  name: string;
  img: string;
  extras: string[];
  desc: string;
  category: string;
  year: string;
  client: string;
  challenge: string;
  thoughts: string;
  aboutShot?: string;
}

export interface DesktopIcon {
  id: string;
  className: string;
  label: string;
  src: string;
  open: OpenTarget;
  url?: string;
  project?: ProjectKey;
  wide?: boolean;
}

export interface Song {
  title: string;
  artist: string;
  id: string;
  duration: number;
}

export type IpodView =
  | "home"
  | "menu"
  | "songs"
  | "extras"
  | "settings"
  | "now"
  | "video"
  | "loading";

export interface MovieCard {
  title: string;
  img: string;
  genre: string;
  year: string;
  gem?: string;
  quote?: string;
}

export interface ResourceLink {
  label: string;
  href: string;
  img: string;
}

export interface WindowLayout {
  id: WindowId;
  x: number;
  y: number;
  narrow?: boolean;
  extraClass?: string;
}

export interface WinRuntime {
  open: boolean;
  max: boolean;
  z: number;
  left: number;
  top: number;
}
