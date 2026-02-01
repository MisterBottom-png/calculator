import type { Meta, StoryObj } from "@storybook/react";
import { BreakdownTable } from "@/components/BreakdownTable";

const meta: Meta<typeof BreakdownTable> = {
  title: "Tables/BreakdownTable",
  component: BreakdownTable
};

export default meta;

type Story = StoryObj<typeof BreakdownTable>;

const columns = [
  { key: "component", label: "Component" },
  { key: "code", label: "Code" },
  { key: "pct", label: "%", align: "right" },
  { key: "kg", label: "Weight (kg)", align: "right" },
  { key: "g", label: "Weight (g)", align: "right" }
];

export const SingleRow: Story = {
  args: {
    columns,
    rows: [
      {
        component: "Fibre 1",
        code: "A6FIBRENO4YGRS",
        pct: "65%",
        kg: "0.585",
        g: 585
      }
    ]
  }
};

export const ManyRows: Story = {
  args: {
    columns,
    rows: [
      {
        component: "Fibre 1",
        code: "A6FIBRENO4YGRS",
        pct: "65%",
        kg: "0.585",
        g: 585
      },
      {
        component: "Fibre 2",
        code: "A6FIBRENO2CGRS",
        pct: "35%",
        kg: "0.315",
        g: 315
      },
      {
        component: "Fibre 3",
        code: "—",
        pct: "0%",
        kg: "0.000",
        g: 0
      }
    ]
  }
};
