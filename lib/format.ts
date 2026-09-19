export function formatClock(date: Date): { datePart: string; timePart: string } {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
  let hours = date.getHours();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return {
    datePart: `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`,
    timePart: `${hours}:${minutes} ${ampm}`,
  };
}

export function formatTrackTime(seconds: number): string {
  const safe = Math.max(0, Math.floor(seconds || 0));
  return `${Math.floor(safe / 60)}:${String(safe % 60).padStart(2, "0")}`;
}

export function wrapIndex(index: number, length: number): number {
  return ((index % length) + length) % length;
}

export function lerpKeys(t: number, keys: Array<[number, number]>): number {
  if (t <= keys[0][0]) return keys[0][1];
  for (let i = 1; i < keys.length; i += 1) {
    if (t <= keys[i][0]) {
      const [t0, v0] = keys[i - 1];
      const [t1, v1] = keys[i];
      const u = (t - t0) / (t1 - t0);
      return v0 + (v1 - v0) * u;
    }
  }
  return keys[keys.length - 1][1];
}

export function directionFromDelta(dx: number, dy: number): "e" | "se" | "s" | "sw" | "w" | "nw" | "n" | "ne" {
  const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
  if (angle >= -22.5 && angle < 22.5) return "e";
  if (angle >= 22.5 && angle < 67.5) return "se";
  if (angle >= 67.5 && angle < 112.5) return "s";
  if (angle >= 112.5 && angle < 157.5) return "sw";
  if (angle >= 157.5 || angle < -157.5) return "w";
  if (angle >= -157.5 && angle < -112.5) return "nw";
  if (angle >= -112.5 && angle < -67.5) return "n";
  return "ne";
}
