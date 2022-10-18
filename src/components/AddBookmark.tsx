import { observer } from "mobx-react";
import React, { useState } from "react";
import { useStores } from "../store";
import DialogBox from "./common/DialogBox";
import { addDoc } from "@firebase/firestore";
import { bookmarksCollectionRef } from "../App";
import axios from "axios";
import { debounce, isValidHttpUrl } from "../utilities";
import PreviewImg from "./bookmarks/PreviewImg";
import TagsInput from "./common/TagsInput";
import TextInput from "./common/TextInput";
import moment from "moment";
import FormRow from "./common/FormRow";
import Textarea from "./common/Textarea";

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
            width="550px"
            confirmButton={{
                text: "save",
                id: "save-bookmark-confirm",
                onClick: () => {
                    createBookmark();
                    resetDialog();
                }
            }}
        >
            <FormRow label="Url" style={{ marginBottom: 10 }}>
                <TextInput
                    value={url}
                    placeholder="url"
                    id="bookmark-url-input"
                    onChange={(e) => {
                        if (isValidHttpUrl(e.target.value)) {
                            debounce(() => getPreview(e.target.value), 500);
                        }
                        setUrl(e.target.value);
                    }}
                />
            </FormRow>
            <FormRow label="Preview" style={{ marginBottom: 10 }}>
                <PreviewImg imgUrl={preview?.images[0]} border />
            </FormRow>
            {preview && (
                <>
                    <FormRow label="Title" style={{ marginBottom: 10 }}>
                        <TextInput id="title-input" value={preview.title} disabled />
                    </FormRow>
                    <FormRow label="Description" style={{ marginBottom: 10 }}>
                        <Textarea id="description-input" value={preview.description} disabled />
                    </FormRow>
                </>
            )}
            <FormRow label="Tags">
                <TagsInput />
            </FormRow>
        </DialogBox>
    );
};

export default observer(AddBookmark);
