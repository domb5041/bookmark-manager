import { observer } from "mobx-react";
import React, { useState } from "react";
import { useStores } from "../store";
import DialogBox from "./DialogBox";
import { addDoc } from "@firebase/firestore";
import { bookmarksCollectionRef } from "../App";
import axios from "axios";
import { debounce } from "../utilities";

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
    const [tags, setTags] = useState("");

    const createBookmark = async () => {
        if (!preview) return;
        await addDoc(bookmarksCollectionRef, {
            name: preview.title || "",
            description: preview.description || "",
            url: url,
            tags: tags === "" ? [] : tags.split(", "),
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
        setPreview(null);
        setTags("");
        setUrl("");
    };

    return (
        <DialogBox
            title="Add Bookmark"
            active={bookmarkStore.addBookmarkDialogVisible}
            close={resetDialog}
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
            <input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="tags" />
            {preview && (
                <>
                    <img src={preview.images[0]} style={{ width: " 100%" }} alt="preview-img" />
                    <img src={preview.favicons[0]} alt="preview-img" />
                    <b>{preview.title}</b>
                    <p>{preview.description}</p>
                </>
            )}
        </DialogBox>
    );
};

export default observer(AddBookmark);
