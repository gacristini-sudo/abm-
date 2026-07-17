import { formatCurrency, formatNumber } from "@/lib/utils";

// Chart components are Client Components; pages that render them are often Server
// Components. A function prop can't cross that boundary, so charts take this
// preset key instead and resolve the actual formatter internally.
export type ValueFormat = "number" | "currency" | "percent";

export function resolveFormatter(format: ValueFormat = "number"): (value: number) => string {
  switch (format) {
    case "currency":
      return (v: number) => formatCurrency(v);
    case "percent":
      return (v: number) => `${v}%`;
    default:
      return (v: number) => formatNumber(v);
  }
}
