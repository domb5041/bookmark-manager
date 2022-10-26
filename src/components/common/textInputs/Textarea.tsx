import React, { FC, useRef, useState } from "react";
import styled from "styled-components";
import { GenericTextInputContainer } from "./TextInput";

const TextAreaContainer = styled(GenericTextInputContainer)`
    & > textarea {
        flex: 1;
        box-sizing: border-box;
        padding: 6px 8px;
        margin-top: 1px;
        resize: none;
        height: 100px;
        width: 100%;
        font-family: "Heebo", sans-serif;
        outline: none;
        border: none;
        background-color: transparent;
    }
`;

interface ITextareaProps {
    value: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    style?: any;
    id: string;
    disabled?: boolean;
    label?: string;
}

const Textarea: FC<ITextareaProps> = ({ value, onChange, style, id, disabled, label }) => {
    const [focused, setFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    return (
        <>
            {label && <label htmlFor={id}>{label}</label>}
            <TextAreaContainer
                style={style}
                id={id + "-container"}
                focused={focused}
                onClick={(e: React.MouseEvent) => inputRef.current?.focus()}
            >
                <textarea
                    value={value}
                    onChange={onChange}
                    id={id}
                    disabled={disabled}
                    autoComplete="off"
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                />
            </TextAreaContainer>
        </>
    );
};

export default Textarea;
