"use client";

import { useEffect, useState } from "react";
import { formatClock } from "@/lib/format";

export function useClock() {
  const [label, setLabel] = useState({ datePart: "", timePart: "" });

  useEffect(() => {
    const tick = () => setLabel(formatClock(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return label;
}
