import { observer } from "mobx-react";
import React, { useEffect, useRef, useState } from "react";
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

const HiddenInput = styled.input<{ inputValidationError: boolean }>`
    min-width: 25px;
    outline: none;
    border: none;
    background-color: transparent;
    color: ${(props) => (props.inputValidationError ? "red" : "initial")};
`;

const SuggestionContainer = styled.div`
    position: relative;
`;

const TagsSuggest = styled.div`
    position: absolute;
    background-color: white;
    border: 1px solid silver;
    top: 110%;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
`;

const TagSuggestRow = styled.div<{ active: boolean }>`
    padding: 2px 10px 2px 7px;
    background-color: ${(props) => (props.active ? "yellow" : "transparent")};
    cursor: pointer;
    white-space: nowrap;
    &:first-of-type {
        margin-top: 2px;
    }
    &:last-of-type {
        margin-bottom: 2px;
    }
`;

const Error = styled.p`
    color: red;
`;

const TagsInput = () => {
    const { bookmarkStore } = useStores();
    const [newTag, setNewTag] = useState("");
    const [activeTagIndex, setActiveTagIndex] = useState(-1);
    const [tagSuggestions, setTagSuggestions] = useState<string[]>([]);
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
    const [flipListAlignment, setFlipListAlignment] = useState(false);
    const [inputValidationError, setInputValidationError] = useState(false);

    const addTag = () => {
        const empty = newTag === "";
        const lowerCaseTags = bookmarkStore.tagsInput.map((tag) => tag.toLowerCase());
        const duplicate = lowerCaseTags.includes(newTag.toLowerCase());
        const restricted = [
            bookmarkStore.allItemsFilter,
            bookmarkStore.taggedItemsFilter,
            bookmarkStore.untaggedItemsFilter
        ].includes(newTag.toLowerCase());

        if (!empty && !duplicate && !restricted) {
            const updatedTags = [...bookmarkStore.tagsInput];
            updatedTags.push(newTag);
            bookmarkStore.setTagsInput(updatedTags);
            setNewTag("");
            resetSuggestionList();
        } else if (duplicate || restricted) {
            setInputValidationError(true);
        }
    };

    const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const emptyInput = newTag === "";
        const cursorAtZero = inputRef?.current?.selectionStart === 0 && inputRef?.current?.selectionEnd === 0;
        const activeTag = activeTagIndex >= 0;

        switch (e.key) {
            case "Escape":
                if (tagSuggestions.length > 0) {
                    e.preventDefault();
                    resetSuggestionList();
                    focusInput();
                }
                break;
            case "Backspace":
            case "ArrowLeft":
                if (cursorAtZero && !activeTag) {
                    e.preventDefault();
                    focusTag(bookmarkStore.tagsInput.length - 1);
                }
                break;
            case "ArrowDown":
                if (activeSuggestionIndex < tagSuggestions.length - 1) {
                    e.preventDefault();
                    setActiveSuggestionIndex(activeSuggestionIndex + 1);
                    setNewTag(tagSuggestions[activeSuggestionIndex + 1]);
                    focusInput();
                }
                break;
            case "ArrowUp":
                if (activeSuggestionIndex > 0) {
                    e.preventDefault();
                    setActiveSuggestionIndex(activeSuggestionIndex - 1);
                    setNewTag(tagSuggestions[activeSuggestionIndex - 1]);
                    focusInput();
                } else if (activeSuggestionIndex === 0) {
                    e.preventDefault();
                    setNewTag("");
                    resetSuggestionList();
                    focusInput();
                }
                break;
            case "Enter":
                e.preventDefault();
                addTag();
                break;
            case "Tab":
                if (!emptyInput) e.preventDefault();
                addTag();
                break;
        }
    };

    const handleInputValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValidationError(false);
        setNewTag(e.target.value);
        if (e.target.value === "") {
            resetSuggestionList();
        } else {
            getSuggestionList(e.target.value);
        }
    };

    const getTagsSuggestAlignment = () => {
        const container = document.getElementById("tags-input-container");
        const element = document.getElementById("suggestion-container");
        const list = document.getElementById("suggestion-list");
        if (!container || !element || !list) return;
        const spaceRemaining = container.offsetLeft + container.offsetWidth - element.offsetLeft;
        setFlipListAlignment(spaceRemaining < list.offsetWidth);
    };

    useEffect(() => getTagsSuggestAlignment(), [newTag, bookmarkStore.tagsInput]);

    const handleTagKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
        const tagIndex = {
            exists: activeTagIndex > -1,
            notFirst: activeTagIndex > 0,
            notLast: activeTagIndex < bookmarkStore.tagsInput.length - 1,
            isLast: activeTagIndex === bookmarkStore.tagsInput.length - 1
        };

        switch (e.key) {
            case "ArrowLeft":
                if (tagIndex.notFirst) {
                    focusTag(activeTagIndex - 1);
                }
                break;
            case "ArrowRight":
                if (tagIndex.notLast) focusTag(activeTagIndex + 1);
                else if (tagIndex.isLast) focusInput();
                break;
            case "Backspace":
                if (tagIndex.exists) {
                    focusInput();
                    const updatedTags = [...bookmarkStore.tagsInput];
                    updatedTags.splice(activeTagIndex, 1);
                    bookmarkStore.setTagsInput(updatedTags);
                }
                break;
        }
    };

    const inputRef = useRef<HTMLInputElement>(null);

    const focusInput = () => {
        inputRef?.current?.focus();
    };

    const focusTag = (index: number) => {
        const tag = document.getElementById(`tags-input-${index}`);
        tag?.focus();
    };

    const getSuggestionList = (newTag: string) => {
        const allTags = bookmarkStore.tags;
        const tagsInput = bookmarkStore.tagsInput;
        const filteredTags = allTags.filter((tag) => {
            const notAlreadyInInput = !tagsInput.includes(tag);
            const matchesCurrentString = new RegExp("^" + newTag).test(tag);
            return notAlreadyInInput && matchesCurrentString;
        });
        setTagSuggestions(filteredTags);
    };

    const resetSuggestionList = () => {
        setActiveSuggestionIndex(-1);
        setTagSuggestions([]);
    };

    const handleRowSuggestClick = (tag: string, i: number) => {
        if (activeSuggestionIndex === i) {
            addTag();
        } else {
            setActiveSuggestionIndex(i);
            setNewTag(tag);
        }
    };

    return (
        <>
            <Container onClick={focusInput} id="tags-input-container">
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
                <SuggestionContainer id="suggestion-container">
                    <HiddenInput
                        style={{ width: newTag.length * 10 + "px" }}
                        value={newTag}
                        onChange={(e) => handleInputValueChange(e)}
                        onFocus={() => {
                            setActiveTagIndex(-1);
                        }}
                        onBlur={() => addTag()}
                        onKeyDown={(e) => handleInputKeyPress(e)}
                        placeholder={bookmarkStore.tagsInput.length > 0 ? "" : "tags"}
                        ref={inputRef}
                        inputValidationError={inputValidationError}
                    />
                    {tagSuggestions.length > 0 && (
                        <TagsSuggest id="suggestion-list" style={flipListAlignment ? { right: 0 } : { left: 0 }}>
                            {tagSuggestions.map((tag, i) => (
                                <TagSuggestRow
                                    onMouseDown={(e) => {
                                        e.preventDefault(); // prevent input blur event
                                    }}
                                    onClick={() => handleRowSuggestClick(tag, i)}
                                    key={`${i}-${tag}`}
                                    active={activeSuggestionIndex === i}
                                >
                                    {tag}
                                </TagSuggestRow>
                            ))}
                        </TagsSuggest>
                    )}
                </SuggestionContainer>
            </Container>
            {inputValidationError && <Error>Tag already exists</Error>}
        </>
    );
};

export default observer(TagsInput);
