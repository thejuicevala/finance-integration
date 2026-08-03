import { useState } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowDownCircle,
  ArrowUpCircle,
  BadgePercent,
  BarChart3,
  Bot,
  ChevronDown,
  CreditCard,
  FileText,
  LayoutDashboard,
  Landmark,
  type LucideIcon,
  Receipt,
  RefreshCcw,
  Scale,
  ShieldCheck,
  Wallet,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import type { FinanceView } from "@/lib/finance/views";

type Item = { id: FinanceView; label: string };
type Group = { id: string; label: string; icon: LucideIcon; items: Item[] };

export const FINANCE_GROUPS: Group[] = [
  {
    id: "overview",
    label: "Finance Overview",
    icon: LayoutDashboard,
    items: [
      { id: "overview_total_balance", label: "Total Balance" },
      { id: "overview_today_inflow", label: "Today's Income" },
      { id: "overview_today_outflow", label: "Today's Expense" },
      { id: "overview_net_profit", label: "Net Profit" },
      { id: "overview_pending", label: "Pending Payments" },
    ],
  },
  {
    id: "wallet",
    label: "Wallet Management",
    icon: Wallet,
    items: [
      { id: "wallet_master", label: "Master Wallet" },
      { id: "wallet_franchise", label: "Franchise Wallets" },
      { id: "wallet_reseller", label: "Reseller Wallets" },
      { id: "wallet_user", label: "User Wallets" },
      { id: "wallet_topup", label: "Wallet Top-up" },
      { id: "wallet_deduction", label: "Wallet Deduction" },
      { id: "wallet_low_balance", label: "Low Balance Alerts" },
    ],
  },
  {
    id: "payments",
    label: "Payment Management",
    icon: CreditCard,
    items: [
      { id: "payment_incoming", label: "Incoming Payments" },
      { id: "payment_outgoing", label: "Outgoing Payments" },
      { id: "payment_failed", label: "Failed Payments" },
      { id: "payment_pending", label: "Pending Payments" },
      { id: "payment_partial", label: "Partial Payments" },
    ],
  },
  {
    id: "gateways",
    label: "Payment Gateways",
    icon: Landmark,
    items: [
      { id: "gateway_upi", label: "UPI" },
      { id: "gateway_bank", label: "Bank Transfer" },
      { id: "gateway_payu", label: "PayU / Razorpay" },
      { id: "gateway_stripe", label: "Stripe" },
      { id: "gateway_paypal", label: "PayPal" },
      { id: "gateway_crypto", label: "Crypto (optional)" },
    ],
  },
  {
    id: "invoices",
    label: "Invoice Management",
    icon: FileText,
    items: [
      { id: "invoice_generate", label: "Generate Invoice" },
      { id: "invoice_auto", label: "Auto Invoice" },
      { id: "invoice_franchise", label: "Franchise Invoice" },
      { id: "invoice_reseller", label: "Reseller Invoice" },
      { id: "invoice_tax", label: "Tax Invoice" },
      { id: "invoice_credit_note", label: "Credit Note" },
      { id: "invoice_debit_note", label: "Debit Note" },
    ],
  },
  {
    id: "plans",
    label: "Subscription & Plans",
    icon: Receipt,
    items: [
      { id: "plan_active", label: "Active Plans" },
      { id: "plan_expired", label: "Expired Plans" },
      { id: "plan_renewal", label: "Renewal Tracking" },
      { id: "plan_upgrade", label: "Upgrade Requests" },
      { id: "plan_downgrade", label: "Downgrade Requests" },
    ],
  },
  {
    id: "commissions",
    label: "Commission Management",
    icon: BadgePercent,
    items: [
      { id: "commission_franchise", label: "Franchise Commission" },
      { id: "commission_reseller", label: "Reseller Commission" },
      { id: "commission_influencer", label: "Influencer Payout" },
      { id: "commission_rules", label: "Commission Rules" },
      { id: "commission_auto_deduct", label: "Auto Deduction" },
    ],
  },
  {
    id: "costs",
    label: "Cost & Expense",
    icon: ArrowDownCircle,
    items: [
      { id: "cost_server", label: "Server Cost" },
      { id: "cost_ai_api", label: "AI / API Cost" },
      { id: "cost_marketing", label: "Marketing Cost" },
      { id: "cost_support", label: "Support Cost" },
      { id: "cost_manual_entry", label: "Manual Expense Entry" },
    ],
  },
  {
    id: "ai_billing",
    label: "AI / API Billing",
    icon: Bot,
    items: [
      { id: "ai_usage_cost", label: "AI Usage Cost" },
      { id: "api_usage_cost", label: "API Usage Cost" },
      { id: "ai_spike_alert", label: "Cost Spike Alerts" },
      { id: "ai_stop_resume", label: "Auto Stop / Resume" },
      { id: "ai_budget_limit", label: "Budget Limits" },
    ],
  },
  {
    id: "refunds",
    label: "Refund & Adjustment",
    icon: RefreshCcw,
    items: [
      { id: "refund_requests", label: "Refund Requests" },
      { id: "refund_approved", label: "Approved Refunds" },
      { id: "refund_rejected", label: "Rejected Refunds" },
      { id: "refund_wallet_adjust", label: "Wallet Adjustment" },
    ],
  },
  {
    id: "tax",
    label: "Compliance & Tax",
    icon: Scale,
    items: [
      { id: "tax_gst_vat", label: "GST / VAT" },
      { id: "tax_tds", label: "TDS" },
      { id: "tax_country_wise", label: "Country-wise Tax" },
      { id: "tax_audit_reports", label: "Audit Reports" },
    ],
  },
  {
    id: "reports",
    label: "Reports & Analytics",
    icon: BarChart3,
    items: [
      { id: "report_daily", label: "Daily Report" },
      { id: "report_monthly", label: "Monthly Report" },
      { id: "report_yearly", label: "Yearly Report" },
      { id: "report_export", label: "Export (PDF / Excel)" },
    ],
  },
  {
    id: "alerts",
    label: "Alerts & Approval",
    icon: AlertTriangle,
    items: [
      { id: "alert_high_amount", label: "High Amount Approval" },
      { id: "alert_manual_override", label: "Manual Override Alert" },
      { id: "alert_risky_transaction", label: "Risky Transaction Alert" },
    ],
  },
  {
    id: "logs",
    label: "Logs & Security",
    icon: ShieldCheck,
    items: [
      { id: "log_transactions", label: "Transaction Logs" },
      { id: "log_activity", label: "Activity Logs" },
      { id: "log_masked_view", label: "Masked Data View" },
      { id: "log_fraud_detection", label: "Fraud Detection" },
    ],
  },
  {
    id: "consoles",
    label: "Finance Consoles",
    icon: Activity,
    items: [
      { id: "revenue", label: "Revenue Dashboard" },
      { id: "payouts", label: "Payout Manager" },
      { id: "wallets", label: "Wallet System" },
      { id: "commissions", label: "Commission Engine" },
      { id: "invoices", label: "Invoice Center" },
      { id: "heatmap", label: "Activity Heatmap" },
      { id: "fraud", label: "Fraud Monitor" },
      { id: "audit", label: "Audit Trail" },
    ],
  },
];

export const VIEW_LABELS: Record<string, { group: string; label: string }> = Object.fromEntries(
  FINANCE_GROUPS.flatMap((g) => g.items.map((i) => [i.id, { group: g.label, label: i.label }])),
);

export function FinanceSidebar({
  activeView,
  onSelect,
}: {
  activeView: FinanceView;
  onSelect: (view: FinanceView) => void;
}) {
  const activeGroup = FINANCE_GROUPS.find((g) => g.items.some((i) => i.id === activeView))?.id;
  const [open, setOpen] = useState<string[]>(activeGroup ? [activeGroup] : ["overview"]);

  const toggle = (id: string) =>
    setOpen((prev) => (prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]));

  return (
    <ScrollArea className="h-full">
      <nav className="space-y-1 p-3">
        <div className="mb-4 flex items-center gap-3 px-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 text-primary">
            <ArrowUpCircle className="h-5 w-5" />
          </span>
          <div className="leading-tight">
            <p className="font-display text-sm font-semibold text-foreground">Finance Manager</p>
            <p className="text-[11px] text-muted-foreground">Software Vala</p>
          </div>
        </div>

        {FINANCE_GROUPS.map((group) => {
          const isOpen = open.includes(group.id);
          const GroupIcon = group.icon;
          const hasActive = group.items.some((i) => i.id === activeView);
          return (
            <div key={group.id}>
              <Button
                variant="ghost"
                onClick={() => toggle(group.id)}
                className={cn(
                  "h-9 w-full justify-between px-2 text-[13px] font-medium",
                  hasActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
                )}
              >
                <span className="flex items-center gap-2 truncate">
                  <GroupIcon className="h-4 w-4 shrink-0" />
                  <span className="truncate">{group.label}</span>
                </span>
                <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
              </Button>
              {isOpen ? (
                <div className="mt-0.5 space-y-0.5 border-l border-border/60 pl-3 ml-4">
                  {group.items.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => onSelect(item.id)}
                      className={cn(
                        "block w-full rounded-md px-2.5 py-1.5 text-left text-[13px] transition-colors",
                        activeView === item.id
                          ? "bg-primary/15 font-medium text-primary"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground",
                      )}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          );
        })}
      </nav>
    </ScrollArea>
  );
}
