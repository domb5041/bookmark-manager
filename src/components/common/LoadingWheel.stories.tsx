import type { Meta, StoryObj } from "@storybook/react";
import LoadingWheel from "./LoadingWheel";
import { useArgs } from "@storybook/preview-api";
import Button from "./buttons/Button";

const meta: Meta<typeof LoadingWheel> = {
    title: "Components/LoadingWheel",
    component: LoadingWheel,
    parameters: {},
    tags: [],
    args: {},
    argTypes: {
        size: { control: { type: "range", min: 5, max: 100, step: 1 } }
    }
};
export default meta;

type Story = StoryObj<typeof LoadingWheel>;

export const Default: Story = {
    render: (args) => {
        const [{ isVisible }, updateArgs] = useArgs();

        const handleLoading = () => {
            updateArgs({ isVisible: true });
            setTimeout(() => updateArgs({ isVisible: false }), 5000);
        };

        return (
            <div
                style={{
                    position: "relative",
                    width: 500,
                    height: 400,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: 20,
                    border: "1px solid grey"
                }}
            >
                <Button id="test-button" text="test" onClick={handleLoading} disabled={isVisible} />
                <LoadingWheel {...args} isVisible={isVisible} />
            </div>
        );
    }
};

export const InButton: Story = {
    render: (args) => {
        const [{ isVisible }, updateArgs] = useArgs();

        const handleLoading = () => {
            updateArgs({ isVisible: true });
            setTimeout(() => updateArgs({ isVisible: false }), 5000);
        };

        return (
            <Button
                id="test-button"
                onClick={handleLoading}
                loading={isVisible}
                styleType="primary"
                text="test"
                symbol="arrow_forward"
            />
        );
    }
};
