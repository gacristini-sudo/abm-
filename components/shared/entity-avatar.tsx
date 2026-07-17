import { cn, initials } from "@/lib/utils";

const PALETTE = [
  "bg-blue-500/15 text-blue-700 dark:text-blue-400",
  "bg-violet-500/15 text-violet-700 dark:text-violet-400",
  "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
  "bg-amber-500/15 text-amber-700 dark:text-amber-400",
  "bg-rose-500/15 text-rose-700 dark:text-rose-400",
  "bg-cyan-500/15 text-cyan-700 dark:text-cyan-400",
  "bg-indigo-500/15 text-indigo-700 dark:text-indigo-400",
  "bg-orange-500/15 text-orange-700 dark:text-orange-400",
];

function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

interface EntityAvatarProps {
  name: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  shape?: "circle" | "square";
  className?: string;
}

const SIZE_MAP: Record<NonNullable<EntityAvatarProps["size"]>, string> = {
  xs: "size-6 text-[10px]",
  sm: "size-8 text-xs",
  md: "size-10 text-sm",
  lg: "size-14 text-lg",
  xl: "size-20 text-2xl",
};

export function EntityAvatar({ name, size = "sm", shape = "circle", className }: EntityAvatarProps) {
  const color = PALETTE[hashString(name) % PALETTE.length];
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center font-semibold",
        shape === "circle" ? "rounded-full" : "rounded-lg",
        SIZE_MAP[size],
        color,
        className
      )}
    >
      {initials(name) || "?"}
    </div>
  );
}
