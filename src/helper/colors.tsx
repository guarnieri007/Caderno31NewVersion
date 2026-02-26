// utils/colors.js

// Convert hex or rgb color to rgba with custom alpha
export function withAlpha(color: string, alpha: number = 1) {
  // If already rgba, just replace the alpha
  if (color.startsWith("rgba")) {
    return color.replace(/rgba\(([^)]+),[^)]+\)/, `rgba($1, ${alpha})`);
  }

  // If rgb, convert to rgba
  if (color.startsWith("rgb(")) {
    return color.replace("rgb(", "rgba(").replace(")", `, ${alpha})`);
  }

  // If hex (#RRGGBB)
  if (color.startsWith("#")) {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  // Fallback (CSS variables etc)
  return color;
}