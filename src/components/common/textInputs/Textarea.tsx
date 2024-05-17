import React, { useRef, useState } from "react";
import css from "./TextInputs.module.css";
import classNames from "classnames";

interface TextareaPropTypes {
    value: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    style?: any;
    id: string;
    disabled?: boolean;
    label?: string;
}

const Textarea = ({ value, onChange, style, id, disabled, label }: TextareaPropTypes) => {
    const [focused, setFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    return (
        <>
            {label && <label htmlFor={id}>{label}</label>}
            <div
                style={style}
                id={id + "-container"}
                onClick={() => inputRef.current?.focus()}
                className={classNames(css.inputContainer, css.textArea, {
                    [css.focused]: focused
                })}
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
            </div>
        </>
    );
};

export default Textarea;
