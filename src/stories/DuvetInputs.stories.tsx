import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { DuvetInputs, type DuvetFormState } from "@/components/DuvetInputs";

const meta: Meta<typeof DuvetInputs> = {
  title: "Inputs/DuvetInputs",
  component: DuvetInputs
};

export default meta;

type Story = StoryObj<typeof DuvetInputs>;

const presetState: DuvetFormState = {
  sizeMode: "preset",
  sizePreset: "SINGLE",
  width: 135,
  length: 200,
  productKey: "ss_without",
  togOption: "10.5",
  togCustom: 10.5,
  fibreIndex: 0
};

const customState: DuvetFormState = {
  sizeMode: "custom",
  sizePreset: "CUSTOM SIZE",
  width: 150,
  length: 210,
  productKey: "bd_with",
  togOption: "custom",
  togCustom: 12.5,
  fibreIndex: 1
};

const Template = (initial: DuvetFormState) => {
  const [state, setState] = useState<DuvetFormState>(initial);
  return <DuvetInputs state={state} onChange={setState} />;
};

export const Preset: Story = {
  render: () => Template(presetState)
};

export const Custom: Story = {
  render: () => Template(customState)
};
