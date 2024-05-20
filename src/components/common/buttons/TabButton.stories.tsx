import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import TabButton from "./TabButton";
import { useArgs } from "@storybook/preview-api";
import { userEvent, within, expect } from "@storybook/test";

const meta: Meta<typeof TabButton> = {
    title: "Components/Buttons/TabButton",
    component: TabButton,
    parameters: {
        layout: "centered"
    },
    tags: ["autodocs"],
    args: {
        activeListener: "tab-1"
    }
};
export default meta;

type Story = StoryObj<typeof TabButton>;

export const Default: Story = {
    args: {
        activeListener: "tab-1",
        label: "tab buttons"
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await userEvent.click(canvas.getByTestId("tabs-button-0"));
        await userEvent.click(canvas.getByTestId("tabs-button-1"));
        await userEvent.click(canvas.getByTestId("tabs-button-2"));
        await userEvent.click(canvas.getByTestId("tabs-button-3"));
        await userEvent.click(canvas.getByTestId("tabs-button-4"));
    },
    render: (args) => {
        const [{ activeTab }, updateArgs] = useArgs();

        const array = ["looks_one", "looks_two", "looks_3", "looks_4", "looks_5"];
        const tabs = array.map((icon, i) => ({
            id: "tab-" + i,
            activeId: "tab-" + i,
            icon: icon,
            onClick: () => {
                updateArgs({ activeTab: "tab-" + i });
            }
        }));

        return <TabButton {...args} activeListener={activeTab} buttons={tabs} id="tabs" />;
    }
};
