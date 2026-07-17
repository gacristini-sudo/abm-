// Validated categorical order (fixed, never cycled) — see dataviz skill palette reference.
export const CATEGORICAL = {
  light: ["#2a78d6", "#008300", "#e87ba4", "#eda100", "#1baf7a", "#eb6834", "#4a3aa7", "#e34948"],
  dark: ["#3987e5", "#008300", "#d55181", "#c98500", "#199e70", "#d95926", "#9085e9", "#e66767"],
} as const;

export const SEQUENTIAL_BLUE = ["#cde2fb", "#9ec5f4", "#6da7ec", "#3987e5", "#256abf", "#184f95", "#0d366b"];

// Brand status palette (spec-defined) — reserved, never reused as a categorical slot.
export const STATUS = {
  success: "#22C55E",
  warning: "#F59E0B",
  danger: "#EF4444",
  info: "#2563EB",
};

export const CHART_INK = {
  light: { grid: "#e1e0d9", axis: "#c3c2b7", muted: "#898781", text: "#52514e" },
  dark: { grid: "#2c2c2a", axis: "#383835", muted: "#898781", text: "#c3c2b7" },
};

export function categorical(theme: "light" | "dark" = "light"): readonly string[] {
  return CATEGORICAL[theme];
}
