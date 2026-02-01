import type { Meta, StoryObj } from "@storybook/react";
import { TopBar } from "@/components/TopBar";
import { Tabs } from "@/components/ui/tabs";

const meta: Meta<typeof TopBar> = {
  title: "Layout/TopBar",
  component: TopBar,
  decorators: [
    (Story) => (
      <Tabs value="duvet">
        <Story />
      </Tabs>
    )
  ]
};

export default meta;

type Story = StoryObj<typeof TopBar>;

export const Default: Story = {};

export const PillowTab: Story = {
  decorators: [
    (Story) => (
      <Tabs value="pillow">
        <Story />
      </Tabs>
    )
  ]
};
