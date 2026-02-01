import type { Meta, StoryObj } from "@storybook/react";
import { KpiCard } from "@/components/KpiCard";

const meta: Meta<typeof KpiCard> = {
  title: "Components/KpiCard",
  component: KpiCard
};

export default meta;

type Story = StoryObj<typeof KpiCard>;

export const Primary: Story = {
  args: {
    label: "Base fabric length",
    value: "2.88 m",
    variant: "primary",
    helper: "Includes finish allowance"
  }
};

export const Secondary: Story = {
  args: {
    label: "Corovin length",
    value: "2.99 m",
    variant: "secondary",
    helper: "+4% corovin rule"
  }
};

export const Loading: Story = {
  args: {
    label: "Binding length",
    value: "—",
    variant: "secondary",
    helper: "Awaiting required inputs"
  }
};

export const Empty: Story = {
  args: {
    label: "Recommended roll width",
    value: "—",
    variant: "secondary"
  }
};
