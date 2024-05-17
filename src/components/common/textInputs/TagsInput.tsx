import { observer } from "mobx-react";
import React, { useEffect, useRef, useState } from "react";
import { useStores } from "../../../store";
import Tag from "../../bookmarks/Tag";
import css from "./TextInputs.module.css";
import classNames from "classnames";

interface TagsInputPropTypes {
    style?: any;
}

const TagsInput = ({ style }: TagsInputPropTypes) => {
    const { tagStore } = useStores();
    const [newTag, setNewTag] = useState("");
    const [activeTagIndex, setActiveTagIndex] = useState(-1);
    const [tagSuggestions, setTagSuggestions] = useState<string[]>([]);
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
    const [flipListAlignment, setFlipListAlignment] = useState(false);
    const [inputValidationError, setInputValidationError] = useState(false);
    const [focused, setFocused] = useState(false);

    const addTag = () => {
        const empty = newTag === "";
        const lowerCaseTags = tagStore.tagsInput.map((tag) => tag.toLowerCase());
        const duplicate = lowerCaseTags.includes(newTag.toLowerCase());
        const restricted = [
            tagStore.allItemsFilter.name,
            tagStore.taggedItemsFilter.name,
            tagStore.untaggedItemsFilter.name
        ].includes(newTag.toLowerCase());

        if (!empty && !duplicate && !restricted) {
            const updatedTags = [...tagStore.tagsInput];
            updatedTags.push(newTag);
            tagStore.setTagsInput(updatedTags);
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
                    focusTag(tagStore.tagsInput.length - 1);
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

    useEffect(() => getTagsSuggestAlignment(), [newTag, tagStore.tagsInput]);

    const handleTagKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
        const tagIndex = {
            exists: activeTagIndex > -1,
            notFirst: activeTagIndex > 0,
            notLast: activeTagIndex < tagStore.tagsInput.length - 1,
            isLast: activeTagIndex === tagStore.tagsInput.length - 1
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
                    const updatedTags = [...tagStore.tagsInput];
                    updatedTags.splice(activeTagIndex, 1);
                    tagStore.setTagsInput(updatedTags);
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
        const allTags = tagStore.tagSet;
        const tagsInput = tagStore.tagsInput;
        const filteredTags = allTags.filter((tag) => {
            const notAlreadyInInput = !tagsInput.includes(tag.name);
            const matchesCurrentString = new RegExp("^" + newTag).test(tag.name);
            return notAlreadyInInput && matchesCurrentString;
        });
        const suggestions = filteredTags.map((tag) => tag.name);
        setTagSuggestions(suggestions);
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
            <label>tags</label>
            <div
                onClick={focusInput}
                id="tags-input-container"
                style={style}
                className={classNames(css.inputContainer, css.tagsInput, {
                    [css.focused]: focused
                })}
            >
                <div>
                    {tagStore.tagsInput.map((tag, i) => (
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
                            style={{ marginBottom: 5 }}
                        />
                    ))}
                    <div className={css.suggestionContainer} id="suggestion-container">
                        <input
                            style={{ width: newTag.length * 10 + "px" }}
                            value={newTag}
                            onChange={(e) => handleInputValueChange(e)}
                            onFocus={() => {
                                setActiveTagIndex(-1);
                                setFocused(true);
                            }}
                            onBlur={() => {
                                addTag();
                                setFocused(false);
                            }}
                            onKeyDown={(e) => handleInputKeyPress(e)}
                            placeholder={tagStore.tagsInput.length > 0 ? "" : "tags"}
                            ref={inputRef}
                            className={classNames(css.hiddenInput, { [css.validationError]: inputValidationError })}
                        />
                        {tagSuggestions.length > 0 && (
                            <div
                                className={classNames(css.tagSuggest, { [css.alignRight]: flipListAlignment })}
                                id="suggestion-list"
                            >
                                {tagSuggestions.map((tag, i) => (
                                    <div
                                        onMouseDown={(e) => {
                                            e.preventDefault(); // prevent input blur event
                                        }}
                                        onClick={() => handleRowSuggestClick(tag, i)}
                                        key={`${i}-${tag}`}
                                        className={classNames(css.tagSuggestRow, {
                                            [css.rowActive]: activeSuggestionIndex === i
                                        })}
                                    >
                                        {tag}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {inputValidationError && <p className={css.error}>Tag already exists</p>}
        </>
    );
};

export default observer(TagsInput);
