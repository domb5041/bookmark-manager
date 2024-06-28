import { observer } from "mobx-react";
import React, { useState, useRef } from "react";
import { useStores } from "../store";
import DialogBox from "./common/DialogBox";
import { addDoc, updateDoc, doc } from "@firebase/firestore";
import { db } from "../firebase-config";
import { bookmarksCollectionRef } from "../App";
import axios, { AxiosError } from "axios";
import { debounce, formatUrl, isValidHttpUrl } from "../utilities";
import PreviewImg from "./bookmarks/PreviewImg";
import TagsInput from "./common/textInputs/TagsInput";
import TextInput from "./common/textInputs/TextInput";
import moment from "moment";
import Textarea from "./common/textInputs/Textarea";
import MiniButton from "./common/buttons/MiniButton";
import { IBookmark } from "../store/bookmark.store";

interface IPreview {
    description: string;
    favicon: string;
    image: string;
    title: string;
}

const AddBookmark = () => {
    const { bookmarkStore, tagStore } = useStores();
    const [url, setUrl] = useState("");
    const [gettingPreview, setGettingPreview] = useState(false);
    const [preview, setPreview] = useState<IPreview | null>(null);
    const controller = useRef<AbortController | null>(null); // preview request cancellation

    const createBookmark = async () => {
        if (!preview) return;
        await addDoc(bookmarksCollectionRef, {
            name: preview.title || "",
            description: preview.description || "",
            url: url,
            tags: tagStore.tagsInput,
            image: preview.image || "",
            favicon: preview.favicon || "",
            dateAdded: Number(moment().format("X"))
        });
        bookmarkStore.hideAddBookmarkDialog();
    };

    const updateBookmark = async () => {
        if (!bookmarkStore.activeBookmark || !preview) return;
        const bookmarkDoc = doc(db, "bookmarks", bookmarkStore.activeBookmark.id);
        const newFields = {
            name: preview.title,
            description: preview.description,
            tags: tagStore.tagsInput,
            image: preview.image,
            url: url,
            favicon: preview.favicon,
            dateModified: Number(moment().format("X"))
        };
        await updateDoc(bookmarkDoc, newFields);

        const activeBookmark: IBookmark = { ...bookmarkStore.activeBookmark, ...newFields };
        bookmarkStore.setActiveBookmark(activeBookmark);

        const tagExists = () => tagStore.tagSet.some((tag) => tag.name === tagStore.activeFilter.name);

        if (!tagExists) {
            tagStore.setActiveFilter(tagStore.allItemsFilter);
        }
        bookmarkStore.hideEditBookmarkDialog();
    };

    const onEditBookmark = () => {
        if (bookmarkStore.activeBookmark && bookmarkStore.editBookmarkDialogVisible) {
            const { tags, name, description, image, url, favicon } = bookmarkStore.activeBookmark;
            tagStore.setTagsInput(tags);
            setPreview({
                title: name,
                description: description || "",
                image: image,
                favicon: favicon
            });
            setUrl(url);
        }
    };

    const blankPreview = {
        title: formatUrl(url)[0],
        url: url,
        description: "",
        favicon: "",
        image: ""
    };

    const getPreview = (url: string) => {
        if (!isValidHttpUrl(url)) {
            setPreview(blankPreview);
            return;
        }
        setGettingPreview(true);
        controller.current = new AbortController(); // preview request cancellation
        axios({
            method: "get",
            url: `/api/linkPreview?url=${url}`,
            signal: controller.current.signal
        })
            .then((res) => {
                setGettingPreview(false);
                setPreview({
                    title: res.data.title || formatUrl(url)[0],
                    description: res.data.description || "",
                    image: res.data.images[0],
                    favicon: res.data.favicons[0]
                });
            })
            .catch((err: AxiosError) => {
                console.error(err);
                if (err.code === "ERR_CANCELED") {
                    setPreview(null);
                } else {
                    setPreview(blankPreview);
                }
                setGettingPreview(false);
            });
    };

    const resetDialog = () => {
        if (controller.current) controller.current.abort();
        tagStore.setTagsInput([]);
        setPreview(null);
        setUrl("");
        setGettingPreview(false);
    };

    const updateField = (field: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newPreview = { ...preview, [field]: e.target.value } as IPreview;
        setPreview(newPreview);
    };

    return (
        <DialogBox
            title={bookmarkStore.addBookmarkDialogVisible ? "New Bookmark" : "Edit Bookmark"}
            active={bookmarkStore.addBookmarkDialogVisible || bookmarkStore.editBookmarkDialogVisible}
            close={() => {
                bookmarkStore.hideAddBookmarkDialog();
                bookmarkStore.hideEditBookmarkDialog();
            }}
            onExited={resetDialog}
            height={preview ? "850px" : "200px"}
            width="400px"
            onEnter={() => {
                onEditBookmark();
                document.getElementById("bookmark-url-input")?.focus();
            }}
            confirmButton={{
                text: preview ? "save" : "Next",
                id: "save-bookmark-confirm",
                disabled: preview ? !preview?.title || !url : !url || gettingPreview,
                onClick: () => {
                    if (preview) {
                        if (bookmarkStore.addBookmarkDialogVisible) createBookmark();
                        else if (bookmarkStore.editBookmarkDialogVisible) updateBookmark();
                    } else {
                        getPreview(url);
                    }
                }
            }}
        >
            <TextInput
                value={url}
                label="Url"
                style={{ marginBottom: 15 }}
                id="bookmark-url-input"
                onKeyDown={(e) => {
                    if (e.key === "Enter") getPreview(url);
                }}
                onChange={(e) => {
                    setUrl(e.target.value);
                    if (!preview && isValidHttpUrl(e.target.value)) {
                        debounce(() => getPreview(e.target.value), 500);
                    }
                }}
                disabled={gettingPreview}
                rightWidget={
                    <MiniButton
                        id="reset-add-bookmark"
                        onClick={() => getPreview(url)}
                        symbol={preview ? "refresh" : "keyboard_return"}
                        loading={gettingPreview}
                        disabled={!url}
                    />
                }
            />
            {preview && (
                <>
                    <div style={{ marginBottom: 15 }}>
                        <label>Preview</label>
                        <PreviewImg imgUrl={preview.image} border />
                    </div>
                    <TextInput
                        label="Title"
                        style={{ marginBottom: 15 }}
                        id="title-input"
                        value={preview.title}
                        onChange={(e) => updateField("title", e)}
                        disabled={gettingPreview}
                    />
                    <Textarea
                        label="Description"
                        style={{ marginBottom: 15 }}
                        id="description-input"
                        value={preview.description}
                        onChange={(e) => updateField("description", e)}
                        disabled={gettingPreview}
                    />
                    <TagsInput />
                </>
            )}
        </DialogBox>
    );
};

export default observer(AddBookmark);
