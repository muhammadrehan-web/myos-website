import type { Song } from "@/lib/types";

export const SONGS: Song[] = [
  { title: "Never Gonna Give You Up", artist: "Rick Astley", id: "dQw4w9WgXcQ", duration: 214 },
  { title: "Gangnam Style", artist: "PSY", id: "9bZkp7q19f0", duration: 253 },
  { title: "Despacito", artist: "Luis Fonsi", id: "kJQP7kiw5Fk", duration: 281 },
];

export const IPOD_MENU = ["Music", "Extras", "Settings", "Shuffle Songs", "Backlight", "Now Playing"] as const;
export const IPOD_EXTRAS = ["Photos", "Games", "Clock"] as const;
export const IPOD_SETTINGS = ["About", "Repeat", "Clicker"] as const;

export function songFile(id: string): string {
  return `/assets/video/${id}.mp4`;
}

export function songThumb(id: string): string {
  return `/assets/img/yt-${id}.jpg`;
}
