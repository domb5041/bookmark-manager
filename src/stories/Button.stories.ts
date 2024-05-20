import type { Meta, StoryObj } from "@storybook/react";
import Button from "../components/common/buttons/Button";
import { fn } from "@storybook/test";

const meta: Meta<typeof Button> = {
    title: "Button",
    component: Button,
    parameters: {
        layout: "centered"
    },
    tags: ["autodocs"]
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
    args: {
        text: "Button",
        symbol: "emoji_emotions",
        onClick: fn(),
        id: "button",
        styleType: "minimal"
    }
};
