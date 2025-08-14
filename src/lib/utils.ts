import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function hexToRgb(hex: string) {
  const h = (hex || "#000000").replace("#", "");
  const n = parseInt(
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h,
    16
  );
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return { r, g, b };
}

function relativeLuminance({ r, g, b }: { r: number; g: number; b: number }) {
  const s = [r, g, b].map((v) => v / 255);
  const l = s.map((v) =>
    v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  );
  return 0.2126 * l[0] + 0.7152 * l[1] + 0.0722 * l[2];
}

export function autoContrast(hex: string) {
  try {
    return relativeLuminance(hexToRgb(hex)) > 0.179 ? "#000000" : "#ffffff";
  } catch {
    return "#000000";
  }
}
