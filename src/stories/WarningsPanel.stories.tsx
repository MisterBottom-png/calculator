import type { Meta, StoryObj } from "@storybook/react";
import { WarningsPanel } from "@/components/WarningsPanel";

const meta: Meta<typeof WarningsPanel> = {
  title: "Components/WarningsPanel",
  component: WarningsPanel
};

export default meta;

type Story = StoryObj<typeof WarningsPanel>;

export const MissingConstant: Story = {
  args: {
    warnings: ["No constant available for the selected fibre/tog/mode."]
  }
};

export const InvalidSize: Story = {
  args: {
    warnings: ["Check width and length (must be greater than 0).", "Recommended roll width cannot be determined."]
  }
};

export const PercentTotalWarning: Story = {
  args: {
    warnings: ["Total should be 100%."]
  }
};
