"use client";

import { useTheme } from "next-themes";

import { CATEGORICAL, CHART_INK } from "@/lib/chart-colors";
import { useMounted } from "@/hooks/use-mounted";

export function useChartTheme() {
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();

  const mode = mounted && resolvedTheme === "dark" ? "dark" : "light";

  return {
    mode,
    colors: CATEGORICAL[mode],
    ink: CHART_INK[mode],
  };
}
