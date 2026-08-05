import { useMemo, useState } from "react";
import { Bell, Menu, RefreshCcw, Search } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { FinanceSidebar, FINANCE_GROUPS, VIEW_LABELS } from "./FinanceSidebar";
import { FinanceNotifications } from "./FinanceNotifications";
import type { FinanceView } from "@/lib/finance/views";

import OverviewSections from "./sections/OverviewSections";
import WalletSections from "./sections/WalletSections";
import PaymentSections from "./sections/PaymentSections";
import GatewaySections from "./sections/GatewaySections";
import InvoiceSections from "./sections/InvoiceSections";
import PlanSections from "./sections/PlanSections";
import CommissionSections from "./sections/CommissionSections";
import CostSections from "./sections/CostSections";
import AiBillingSections from "./sections/AiBillingSections";
import RefundSections from "./sections/RefundSections";
import TaxSections from "./sections/TaxSections";
import ReportSections from "./sections/ReportSections";
import AlertSections from "./sections/AlertSections";
import LogSections from "./sections/LogSections";
import ConsoleSections from "./sections/ConsoleSections";

const GROUP_COMPONENTS: Record<string, (props: { view: FinanceView }) => React.ReactElement> = {
  overview: OverviewSections,
  wallet: WalletSections,
  payments: PaymentSections,
  gateways: GatewaySections,
  invoices: InvoiceSections,
  plans: PlanSections,
  commissions: CommissionSections,
  costs: CostSections,
  ai_billing: AiBillingSections,
  refunds: RefundSections,
  tax: TaxSections,
  reports: ReportSections,
  alerts: AlertSections,
  logs: LogSections,
  consoles: ConsoleSections,
};

export function FinanceManager() {
  const [view, setView] = useState<FinanceView>("overview_total_balance");
  const [search, setSearch] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const queryClient = useQueryClient();

  const groupId = useMemo(
    () => FINANCE_GROUPS.find((g) => g.items.some((i) => i.id === view))?.id ?? "overview",
    [view],
  );
  const Section = GROUP_COMPONENTS[groupId] ?? OverviewSections;
  const meta = VIEW_LABELS[view];

  const results = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return [];
    return FINANCE_GROUPS.flatMap((g) =>
      g.items
        .filter((i) => i.label.toLowerCase().includes(q) || g.label.toLowerCase().includes(q))
        .map((i) => ({ ...i, group: g.label })),
    ).slice(0, 8);
  }, [search]);

  const select = (next: FinanceView) => {
    setView(next);
    setSearch("");
    setMobileOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="sticky top-0 hidden h-screen w-72 shrink-0 border-r border-border/60 bg-sidebar lg:block">
        <FinanceSidebar activeView={view} onSelect={select} />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-border/60 bg-background/85 px-4 py-3 backdrop-blur lg:px-8">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open finance menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0">
              <SheetTitle className="sr-only">Finance navigation</SheetTitle>
              <FinanceSidebar activeView={view} onSelect={select} />
            </SheetContent>
          </Sheet>

          <div className="min-w-0 flex-1">
            <p className="text-[11px] uppercase tracking-wide text-muted-foreground">{meta?.group}</p>
            <p className="truncate font-display text-sm font-semibold text-foreground">{meta?.label}</p>
          </div>

          <div className="relative hidden md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search finance modules"
              className="w-64 pl-9"
            />
            {results.length > 0 ? (
              <div className="absolute right-0 top-full z-30 mt-2 w-80 overflow-hidden rounded-lg border border-border bg-popover shadow-lg">
                {results.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => select(r.id)}
                    className="block w-full px-3 py-2 text-left text-sm hover:bg-muted"
                  >
                    <span className="text-foreground">{r.label}</span>
                    <span className="ml-2 text-xs text-muted-foreground">{r.group}</span>
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => queryClient.invalidateQueries({ queryKey: ["finance"] })}
          >
            <RefreshCcw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button variant="ghost" size="icon" aria-label="Open finance notifications" onClick={() => setNotificationsOpen(true)}>
            <Bell className="h-4 w-4" />
          </Button>
        </header>

        <main className="flex-1 px-4 py-6 lg:px-8">
          <Section view={view} />
        </main>
        <FinanceNotifications open={notificationsOpen} onOpenChange={setNotificationsOpen} />
      </div>
    </div>
  );
}
