import { observer } from "mobx-react";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useStores } from "../store";
import Tag from "./bookmarks/Tag";

const Container = styled.div`
    display: flex;
    padding: 5px;
    background-color: white;
    border: 1px solid grey;
    border-radius: 3px;
    flex-wrap: wrap;
    cursor: text;
`;

const HiddenInput = styled.input`
    min-width: 25px;
    outline: none;
    border: none;
    background-color: transparent;
`;

const TagsInput = () => {
    const { bookmarkStore } = useStores();
    const [newTag, setNewTag] = useState("");
    const [activeTagIndex, setActiveTagIndex] = useState(-1);

    const addTag = (validKey: boolean) => {
        const notEmpty = newTag !== "";
        const notDuplicate = !bookmarkStore.tagsInput.includes(newTag);
        if (validKey && notEmpty && notDuplicate) {
            const updatedTags = [...bookmarkStore.tagsInput];
            updatedTags.push(newTag);
            bookmarkStore.setTagsInput(updatedTags);
            setNewTag("");
        }
    };

    const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const validKey = e.key === "Backspace" || e.key === "ArrowLeft";
        const emptyInput = newTag === "";
        const cursorAtZero = inputRef?.current?.selectionStart === 0 && inputRef?.current?.selectionEnd === 0;
        const activeTag = activeTagIndex >= 0;
        if (e.key === "Tab" && !emptyInput) {
            e.preventDefault();
        }
        if (validKey && cursorAtZero && !activeTag) {
            focusTag(bookmarkStore.tagsInput.length - 1);
        }
    };

    const handleTagKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
        const backspaceKey = e.key === "Backspace";
        const keyLeft = e.key === "ArrowLeft";
        const keyRight = e.key === "ArrowRight";
        const activeTag = activeTagIndex >= 0;
        if (keyLeft && activeTagIndex > 0) {
            focusTag(activeTagIndex - 1);
        }
        if (keyRight) {
            if (activeTagIndex < bookmarkStore.tagsInput.length - 1) {
                focusTag(activeTagIndex + 1);
            } else if (activeTagIndex === bookmarkStore.tagsInput.length - 1) {
                focusInput();
            }
        }
        if (backspaceKey && activeTag) {
            focusInput();
            const updatedTags = [...bookmarkStore.tagsInput];
            updatedTags.splice(activeTagIndex, 1);
            bookmarkStore.setTagsInput(updatedTags);
        }
    };

    const inputRef = useRef<HTMLInputElement>(null);

    const focusInput = () => {
        inputRef?.current?.select();
    };

    const focusTag = (index: number) => {
        const tag = document.getElementById(`tags-input-${index}`);
        tag?.focus();
    };

    return (
        <Container onClick={focusInput}>
            {bookmarkStore.tagsInput.map((tag, i) => (
                <Tag
                    name={tag}
                    key={`${i}-${tag}`}
                    active={activeTagIndex === i}
                    onKeyDown={(e) => handleTagKeyPress(e)}
                    id={`tags-input-${i}`}
                    onClick={(e) => {
                        e.stopPropagation();
                        focusTag(i);
                    }}
                    onFocus={() => setActiveTagIndex(i)}
                />
            ))}
            <HiddenInput
                style={{ width: newTag.length + "ch" }}
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onFocus={() => setActiveTagIndex(-1)}
                onBlur={() => addTag(true)}
                onKeyDown={(e) => {
                    addTag(e.key === "Enter" || e.key === "Tab");
                    handleInputKeyPress(e);
                }}
                placeholder={bookmarkStore.tagsInput.length > 0 ? "" : "tags"}
                ref={inputRef}
            />
        </Container>
    );
};

export default observer(TagsInput);
