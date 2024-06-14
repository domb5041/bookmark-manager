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
import MiniButton from "./common/buttons/MiniButton";
import LoadingWheel from "./common/LoadingWheel";

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
    const [gettingPreview, setGettingPreview] = useState(false);
    const [preview, setPreview] = useState<IPreview | null>(null);

    const createBookmark = async () => {
        if (!preview) return;
        console.log(preview);
        await addDoc(bookmarksCollectionRef, {
            name: preview.title || "",
            description: preview.description || "",
            url: url,
            tags: tagStore.tagsInput,
            image: preview.images?.[0] || "",
            favicon: preview.favicons?.[0] || "",
            dateAdded: Number(moment().format("X"))
        });
    };

    const getPreview = (url: string) => {
        setGettingPreview(true);
        axios({
            method: "get",
            url: `/api/linkPreview?url=${url}`
        })
            .then((res) => {
                setGettingPreview(false);
                setPreview(res.data);
                console.log(res.data);
            })
            .catch((err: Error) => {
                console.error(err);
                setGettingPreview(false);
                setPreview({
                    title: "",
                    description: "",
                    url: url,
                    images: [],
                    favicons: []
                });
            });
    };

    const resetDialog = () => {
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
            title="Add Bookmark"
            active={bookmarkStore.addBookmarkDialogVisible}
            close={bookmarkStore.hideAddBookmarkDialog}
            onExited={resetDialog}
            height={preview ? "850px" : gettingPreview ? "400px" : "200px"}
            width="400px"
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
            <TextInput
                value={url}
                label="Url"
                style={{ marginBottom: 15 }}
                placeholder="url"
                id="bookmark-url-input"
                onChange={(e) => {
                    if (isValidHttpUrl(e.target.value)) {
                        debounce(() => getPreview(e.target.value), 500);
                    } else {
                        tagStore.setTagsInput([]);
                        setPreview(null);
                    }
                    setUrl(e.target.value);
                }}
                rightWidget={
                    preview !== null && <MiniButton id="reset-add-bookmark" onClick={resetDialog} symbol="close" />
                }
                disabled={preview !== null}
            />
            <LoadingWheel isVisible={gettingPreview} />
            {preview && (
                <>
                    <div style={{ marginBottom: 15 }}>
                        <label>Preview</label>
                        <PreviewImg imgUrl={preview?.images?.[0]} border />
                    </div>
                    <TextInput
                        label="Title"
                        style={{ marginBottom: 15 }}
                        id="title-input"
                        value={preview.title}
                        onChange={(e) => updateField("title", e)}
                    />
                    <Textarea
                        label="Description"
                        style={{ marginBottom: 15 }}
                        id="description-input"
                        value={preview.description}
                        onChange={(e) => updateField("description", e)}
                    />
                    <TagsInput />
                </>
            )}
        </DialogBox>
    );
};

export default observer(AddBookmark);
