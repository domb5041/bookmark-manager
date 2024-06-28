import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";
import { fn } from "@storybook/test";

const meta: Meta<typeof Button> = {
    title: "Components/Buttons/Button",
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
        onClick: fn(),
        id: "button",
        styleType: "primary"
    }
};
