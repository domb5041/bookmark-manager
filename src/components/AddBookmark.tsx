import { observer } from "mobx-react";
import React, { useState } from "react";
import { useStores } from "../store";
import DialogBox from "./DialogBox";
import { addDoc } from "@firebase/firestore";
import { bookmarksCollectionRef } from "../App";
import axios from "axios";
import { debounce, isValidHttpUrl } from "../utilities";
import PreviewImg from "./bookmarks/PreviewImg";
import Favicon from "./bookmarks/Favicon";
import TagsInput from "./TagsInput";
import TextInput from "./TextInput";

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
    const { bookmarkStore, tagStore } = useStores();
    const [url, setUrl] = useState("");
    const [preview, setPreview] = useState<IPreview | null>(null);

    const createBookmark = async () => {
        if (!preview) return;
        await addDoc(bookmarksCollectionRef, {
            name: preview.title || "",
            description: preview.description || "",
            url: url,
            tags: tagStore.tagsInput,
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
        tagStore.setTagsInput([]);
        setPreview(null);
        setUrl("");
    };

    return (
        <DialogBox
            title="Add Bookmark"
            active={bookmarkStore.addBookmarkDialogVisible}
            close={resetDialog}
            onEnter={() => tagStore.setTagsInput([])}
            confirmButton={{
                text: "save",
                id: "save-bookmark-confirm",
                onClick: () => {
                    createBookmark();
                    resetDialog();
                }
            }}
        >
            <TextInput
                value={url}
                placeholder="url"
                id="bookmark-url-input"
                style={{ marginBottom: 10 }}
                onChange={(e) => {
                    if (isValidHttpUrl(e.target.value)) {
                        debounce(() => getPreview(e.target.value), 500);
                    }
                    setUrl(e.target.value);
                }}
            />
            <TagsInput style={{ marginBottom: 10 }} />
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
