import { transparentize } from "polished";
import React, { FC, useRef, useState } from "react";
import styled from "styled-components";
import { useStores } from "../../store";
import { theme } from "../../theme";
import Symbol from "./Symbol";

const Container = styled.div<{ focused: boolean }>`
    border: 1px solid ${(props) => props.theme.color.border.light};
    background-color: ${(props) => props.theme.color.background.surface};
    border-radius: 5px;
    box-shadow: 0 1px 0 ${(props) => props.theme.color.border.heavy} inset;
    overflow: hidden;
    display: flex;
    align-items: center;
    padding-left: 7px;
    cursor: text;
    outline: ${(props) => (props.focused ? "2px solid " + theme.color.accent.secondary : "none")};
    & > .material-symbols-outlined {
        color: ${(props) => props.theme.color.foreground.tinted};
        margin-right: 3px;
        pointer-events: none;
    }
    & > input {
        flex: 1;
        box-sizing: border-box;
        height: 30px;
        padding: 1px 7px 0 7px;
        width: 100%;
        font-family: "Heebo", sans-serif;
        border: none;
        background-color: transparent;
        outline: none;
        font-weight: 400;
        &::placeholder {
            text-transform: capitalize;
        }
    }
`;

const MicroButton = styled.button`
    background-color: transparent;
    color: ${(props) => props.theme.color.foreground.tinted};
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    height: 22px;
    width: 24px;
    border-radius: 4px;
    padding: 0;
    &:hover {
        background-color: ${(props) => transparentize(0.9, props.theme.color.foreground.tinted)};
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
}

const TextInput: FC<ITextInputProps> = ({ value, onChange, style, id, label, placeholder, disabled }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [focused, setFocused] = useState(false);
    const { bookmarkStore } = useStores();
    return (
        <Container
            style={style}
            id={id + "-container"}
            focused={focused}
            onMouseDown={(e: React.MouseEvent) => {
                e.preventDefault();
                inputRef.current?.focus();
            }}
        >
            <Symbol name="search" size="19px" />
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
            {bookmarkStore.searchTerm !== "" && (
                <MicroButton
                    id="search-filter-clear"
                    onClick={() => bookmarkStore.setSearchTerm("")}
                    style={{ marginRight: 5, marginTop: 1 }}
                >
                    <Symbol name="close" size="18px" />
                </MicroButton>
            )}
        </Container>
    );
};

export default TextInput;
