import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export function KpiCardSkeleton() {
  return (
    <Card className="gap-3">
      <div className="flex items-start justify-between px-5">
        <div className="space-y-2">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-6 w-24" />
        </div>
        <Skeleton className="size-9 rounded-lg" />
      </div>
      <div className="px-5">
        <Skeleton className="h-3 w-16" />
      </div>
      <div className="px-5">
        <Skeleton className="h-10 w-full" />
      </div>
    </Card>
  );
}

export function KpiGridSkeleton({ count = 10 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
      {Array.from({ length: count }).map((_, i) => (
        <KpiCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function ChartSkeleton({ height = 300 }: { height?: number }) {
  return (
    <Card className="p-5">
      <Skeleton className="mb-4 h-4 w-40" />
      <Skeleton className="w-full" style={{ height }} />
    </Card>
  );
}

export function TableSkeleton({ rows = 8 }: { rows?: number }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <div className="border-b border-border bg-muted/40 p-3">
        <Skeleton className="h-4 w-full max-w-md" />
      </div>
      <div className="divide-y divide-border/70">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 p-3">
            <Skeleton className="size-8 rounded-full" />
            <Skeleton className="h-3.5 flex-1" />
            <Skeleton className="h-3.5 w-16" />
            <Skeleton className="h-3.5 w-16" />
            <Skeleton className="h-3.5 w-16" />
          </div>
        ))}
      </div>
    </div>
  );
}
