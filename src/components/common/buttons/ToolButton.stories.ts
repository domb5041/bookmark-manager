import type { Meta, StoryObj } from "@storybook/react";
import ToolButton from "./ToolButton";
import { fn } from "@storybook/test";

const meta: Meta<typeof ToolButton> = {
    title: "Components/Buttons/ToolButton",
    component: ToolButton,
    parameters: {
        layout: "centered"
    },
    tags: ["autodocs"]
};
export default meta;

type Story = StoryObj<typeof ToolButton>;

export const Primary: Story = {
    args: {
        text: "Tool",
        onClick: fn()
    }
};
