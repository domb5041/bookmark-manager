import type { Meta, StoryObj } from "@storybook/react";
import MiniButton from "./MiniButton";
import { fn } from "@storybook/test";

const meta: Meta<typeof MiniButton> = {
    title: "Components/Buttons/MiniButton",
    component: MiniButton,
    parameters: {
        layout: "centered"
    },
    tags: ["autodocs"]
};
export default meta;

type Story = StoryObj<typeof MiniButton>;

export const Primary: Story = {
    args: {
        symbol: "emoji_emotions",
        onClick: fn(),
        id: "minibutton"
    }
};
