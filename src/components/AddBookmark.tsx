import { observer } from "mobx-react";
import React, { useState } from "react";
import { useStores } from "../store";
import DialogBox from "./DialogBox";
import { addDoc } from "@firebase/firestore";
import { bookmarksCollectionRef } from "../App";
import axios from "axios";
import { debounce } from "../utilities";
import PreviewImg from "./bookmarks/PreviewImg";
import Favicon from "./bookmarks/Favicon";
import TagsInput from "./TagsInput";

interface IPreview {
    contentType: string;
    description: string;
    favicons: string[];
    images: string[];
    mediaType: string;
    siteName: string;
    title: string;
    url: string;
    videos: string[];
}

const AddBookmark = () => {
    const { bookmarkStore } = useStores();
    const [url, setUrl] = useState("");
    const [preview, setPreview] = useState<IPreview | null>(null);

    const createBookmark = async () => {
        if (!preview) return;
        await addDoc(bookmarksCollectionRef, {
            name: preview.title || "",
            description: preview.description || "",
            url: url,
            tags: bookmarkStore.tagsInput,
            image: preview.images[0] || "",
            favicon: preview.favicons[0] || ""
        });
    };

    const getPreview = (url: string) => {
        axios({
            method: "get",
            url: `/link-preview?url=${url}`
        })
            .then((res) => {
                setPreview(res.data);
                // console.log(res.data);
            })
            .catch((err: Error) => {
                console.error(err);
                setPreview(null);
            });
    };

    const resetDialog = () => {
        bookmarkStore.hideAddBookmarkDialog();
        bookmarkStore.setTagsInput([]);
        setPreview(null);
        setUrl("");
    };

    return (
        <DialogBox
            title="Add Bookmark"
            active={bookmarkStore.addBookmarkDialogVisible}
            close={resetDialog}
            onEnter={() => bookmarkStore.setTagsInput([])}
            confirmButton={{
                text: "save",
                id: "save-bookmark-confirm",
                disabled: !preview,
                onClick: () => {
                    createBookmark();
                    resetDialog();
                }
            }}
        >
            <input
                value={url}
                type="url"
                placeholder="url"
                onChange={(e) => {
                    debounce(() => getPreview(e.target.value), 500);
                    setUrl(e.target.value);
                }}
            />
            <TagsInput />
            {preview && (
                <>
                    <PreviewImg url={preview.images[0]} />
                    <Favicon url={preview.favicons[0]} />
                    <b>{preview.title}</b>
                    <p>{preview.description}</p>
                </>
            )}
        </DialogBox>
    );
};

export default observer(AddBookmark);
