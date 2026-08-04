import type { ComponentType, ReactNode } from "react";
import { AlertCircle, Inbox, type LucideIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

/* ---------------------------------- shell --------------------------------- */

export function SectionShell({
  title,
  description,
  icon: Icon,
  actions,
  children,
}: {
  title: string;
  description?: string;
  icon?: LucideIcon | ComponentType<{ className?: string }>;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="space-y-6">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          {Icon ? (
            <span className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <Icon className="h-5 w-5" />
            </span>
          ) : null}
          <div>
            <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground">{title}</h1>
            {description ? (
              <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{description}</p>
            ) : null}
          </div>
        </div>
        {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
      </header>
      {children}
    </section>
  );
}

/* --------------------------------- metrics -------------------------------- */

export function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  tone = "default",
  loading,
}: {
  label: string;
  value: ReactNode;
  hint?: ReactNode;
  icon?: LucideIcon | ComponentType<{ className?: string }>;
  tone?: "default" | "success" | "warning" | "danger" | "info";
  loading?: boolean;
}) {
  const toneClass = {
    default: "text-primary bg-primary/15",
    success: "text-success bg-success/15",
    warning: "text-warning bg-warning/15",
    danger: "text-destructive bg-destructive/15",
    info: "text-info bg-info/15",
  }[tone];

  return (
    <Card className="border-border/60 bg-card/80">
      <CardContent className="flex items-start justify-between gap-4 p-5">
        <div className="min-w-0 space-y-1">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
          {loading ? (
            <Skeleton className="h-7 w-28" />
          ) : (
            <p className="break-words font-display text-xl font-semibold leading-tight text-foreground">
              {value}
            </p>
          )}
          {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
        </div>
        {Icon ? (
          <span className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl", toneClass)}>
            <Icon className="h-5 w-5" />
          </span>
        ) : null}
      </CardContent>
    </Card>
  );
}

export function StatGrid({ children }: { children: ReactNode }) {
  return <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{children}</div>;
}

/* -------------------------------- status ---------------------------------- */

const STATUS_TONES: Record<string, string> = {
  active: "bg-success/15 text-success border-success/30",
  completed: "bg-success/15 text-success border-success/30",
  success: "bg-success/15 text-success border-success/30",
  paid: "bg-success/15 text-success border-success/30",
  approved: "bg-success/15 text-success border-success/30",
  resolved: "bg-success/15 text-success border-success/30",
  processed: "bg-success/15 text-success border-success/30",
  reimbursed: "bg-success/15 text-success border-success/30",
  filed: "bg-success/15 text-success border-success/30",
  sent: "bg-info/15 text-info border-info/30",
  processing: "bg-info/15 text-info border-info/30",
  investigating: "bg-info/15 text-info border-info/30",
  acknowledged: "bg-info/15 text-info border-info/30",
  credit: "bg-success/15 text-success border-success/30",
  debit: "bg-destructive/15 text-destructive border-destructive/30",
  pending: "bg-warning/15 text-warning border-warning/30",
  partial: "bg-warning/15 text-warning border-warning/30",
  on_hold: "bg-warning/15 text-warning border-warning/30",
  draft: "bg-muted text-muted-foreground border-border",
  paused: "bg-warning/15 text-warning border-warning/30",
  open: "bg-warning/15 text-warning border-warning/30",
  overdue: "bg-destructive/15 text-destructive border-destructive/30",
  failed: "bg-destructive/15 text-destructive border-destructive/30",
  rejected: "bg-destructive/15 text-destructive border-destructive/30",
  cancelled: "bg-destructive/15 text-destructive border-destructive/30",
  expired: "bg-destructive/15 text-destructive border-destructive/30",
  frozen: "bg-destructive/15 text-destructive border-destructive/30",
  reversed: "bg-destructive/15 text-destructive border-destructive/30",
  disabled: "bg-muted text-muted-foreground border-border",
  false_positive: "bg-muted text-muted-foreground border-border",
  critical: "bg-destructive/15 text-destructive border-destructive/30",
  warning: "bg-warning/15 text-warning border-warning/30",
  info: "bg-info/15 text-info border-info/30",
};

export function StatusBadge({ status, className }: { status: string | null | undefined; className?: string }) {
  const key = (status ?? "").toLowerCase();
  return (
    <Badge
      variant="outline"
      className={cn("capitalize", STATUS_TONES[key] ?? "bg-muted text-muted-foreground border-border", className)}
    >
      {(status ?? "unknown").replace(/_/g, " ")}
    </Badge>
  );
}

/* ------------------------------ table wrapper ------------------------------ */

export function PanelCard({
  title,
  actions,
  children,
  className,
}: {
  title?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Card className={cn("border-border/60 bg-card/80", className)}>
      {title ? (
        <CardHeader className="flex flex-row items-center justify-between gap-3 space-y-0 pb-3">
          <CardTitle className="text-base font-semibold text-foreground">{title}</CardTitle>
          {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
        </CardHeader>
      ) : null}
      <CardContent className={cn(title ? "pt-0" : "pt-6")}>{children}</CardContent>
    </Card>
  );
}

export function QueryState({
  isLoading,
  error,
  isEmpty,
  emptyLabel = "No records yet",
  rows = 5,
  children,
}: {
  isLoading: boolean;
  error?: unknown;
  isEmpty?: boolean;
  emptyLabel?: string;
  rows?: number;
  children: ReactNode;
}) {
  if (isLoading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: rows }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-full" />
        ))}
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex items-center gap-3 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
        <AlertCircle className="h-4 w-4" />
        {error instanceof Error ? error.message : "Could not load data"}
      </div>
    );
  }
  if (isEmpty) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border py-10 text-center">
        <Inbox className="h-6 w-6 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">{emptyLabel}</p>
      </div>
    );
  }
  return <>{children}</>;
}
