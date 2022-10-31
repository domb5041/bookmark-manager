import React, { FC, ReactElement, useRef, useState } from "react";
import styled from "styled-components";

export const GenericTextInputContainer = styled.div<{ focused: boolean }>`
    border: 1px solid ${(props) => props.theme.color.border.light};
    background-color: ${(props) => props.theme.color.background.surface};
    border-radius: 5px;
    box-shadow: 0 1px 0 ${(props) => props.theme.color.border.heavy} inset;
    cursor: text;
    outline: ${(props) => (props.focused ? "2px solid " + props.theme.color.accent.primary : "none")};
    box-sizing: border-box;
`;

const TextInputContainer = styled(GenericTextInputContainer)<{ leftWidget: boolean; rightWidget: boolean }>`
    display: flex;
    align-items: center;
    padding-left: ${(props) => (props.leftWidget ? 5 : 0)}px;
    padding-right: ${(props) => (props.rightWidget ? 5 : 0)}px;
    & > .material-symbols-outlined {
        color: ${(props) => props.theme.color.foreground.faded};
        pointer-events: none;
    }
    & > * {
        margin-top: 1px;
    }
    & > input {
        padding-top: 3px;
        padding-bottom: 3px;
        padding-left: ${(props) => (props.leftWidget ? 3 : 8)}px;
        padding-right: ${(props) => (props.rightWidget ? 3 : 8)}px;
        flex: 1;
        box-sizing: border-box;
        width: 100%;
        font-family: "Heebo", sans-serif;
        border: none;
        background-color: transparent;
        outline: none;
        font-weight: 400;
    }
`;

interface ITextInputProps {
    value: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    style?: any;
    id: string;
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    leftWidget?: ReactElement | false;
    rightWidget?: ReactElement | false;
}

const TextInput: FC<ITextInputProps> = ({
    value,
    onChange,
    style,
    id,
    label,
    placeholder,
    disabled,
    leftWidget,
    rightWidget
}) => {
    const [focused, setFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    return (
        <>
            {label && <label htmlFor={id}>{label}</label>}
            <TextInputContainer
                style={style}
                id={id + "-container"}
                focused={focused}
                onClick={(e: React.MouseEvent) => inputRef.current?.focus()}
                leftWidget={leftWidget !== false}
                rightWidget={rightWidget !== false}
            >
                {leftWidget && leftWidget}
                <input
                    ref={inputRef}
                    value={value}
                    onChange={onChange}
                    id={id}
                    placeholder={placeholder}
                    disabled={disabled}
                    autoComplete="off"
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                />
                {rightWidget && rightWidget}
            </TextInputContainer>
        </>
    );
};

export default TextInput;
