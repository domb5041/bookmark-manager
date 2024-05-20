import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import TagsInput from "./TagsInput";

const meta: Meta<typeof TagsInput> = {
    title: "Components/TextInputs/TagsInput",
    component: TagsInput,
    parameters: {
        layout: "centered"
    },
    tags: ["autodocs"],
    args: {}
};
export default meta;

type Story = StoryObj<typeof TagsInput>;

export const Default: Story = {
    args: {},
    play: async ({ canvasElement }) => {},
    render: (args) => {
        return <TagsInput style={{ width: 300 }} />;
    }
};
