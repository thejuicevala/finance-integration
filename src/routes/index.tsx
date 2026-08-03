import { createFileRoute } from "@tanstack/react-router";

import { FinanceManager } from "@/components/finance/FinanceManager";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Finance Manager Console — Software Vala" },
      {
        name: "description",
        content:
          "Operate wallets, payments, gateways, invoices, subscriptions, commissions, expenses, tax and fraud monitoring from the Software Vala finance console.",
      },
      { property: "og:title", content: "Finance Manager Console — Software Vala" },
      {
        property: "og:description",
        content:
          "Wallets, payments, gateways, invoices, subscriptions, commissions, expenses, tax and fraud monitoring in one console.",
      },
    ],
  }),
  component: FinanceManager,
});
