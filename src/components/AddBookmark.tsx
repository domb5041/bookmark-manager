import { observer } from "mobx-react";
import React, { useState } from "react";
import { useStores } from "../store";
import DialogBox from "./common/DialogBox";
import { addDoc } from "@firebase/firestore";
import { bookmarksCollectionRef } from "../App";
import axios from "axios";
import { debounce, isValidHttpUrl } from "../utilities";
import PreviewImg from "./bookmarks/PreviewImg";
import TagsInput from "./common/textInputs/TagsInput";
import TextInput from "./common/textInputs/TextInput";
import moment from "moment";
import Textarea from "./common/textInputs/Textarea";

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
            favicon: preview.favicons[0] || "",
            dateAdded: Number(moment().format("X"))
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
                label="Url"
                style={{ marginBottom: 15 }}
                placeholder="url"
                id="bookmark-url-input"
                onChange={(e) => {
                    if (isValidHttpUrl(e.target.value)) {
                        debounce(() => getPreview(e.target.value), 500);
                    }
                    setUrl(e.target.value);
                }}
            />
            <div style={{ marginBottom: 15 }}>
                <label>Preview</label>
                <PreviewImg imgUrl={preview?.images[0]} border />
            </div>
            {preview && (
                <>
                    <TextInput
                        label="Title"
                        style={{ marginBottom: 15 }}
                        id="title-input"
                        value={preview.title}
                        disabled
                    />
                    <Textarea
                        label="Description"
                        style={{ marginBottom: 15 }}
                        id="description-input"
                        value={preview.description}
                        disabled
                    />
                </>
            )}
            <TagsInput />
        </DialogBox>
    );
};

export default observer(AddBookmark);
