import React, { useState } from "react";
import { useStores } from "../store";
import DialogBox from "./DialogBox";
import { observer } from "mobx-react";
import { updateDoc, doc } from "@firebase/firestore";
import { db } from "../firebase-config";
import TagsInput from "./TagsInput";
import PreviewImg from "./bookmarks/PreviewImg";
import axios from "axios";
import Favicon from "./bookmarks/Favicon";
import TextInput from "./TextInput";
import Button from "./Button";
import Textarea from "./Textarea";

const EditBookmark = () => {
    const { bookmarkStore, tagStore } = useStores();
    const [newName, setNewName] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [newImg, setNewImg] = useState("");
    const [newUrl, setNewUrl] = useState("");
    const [newFavicon, setNewFavicon] = useState("");

    const onDialogOpening = () => {
        if (bookmarkStore.activeBookmarkIndex > -1) {
            const activeBookmark = bookmarkStore.bookmarks[bookmarkStore.activeBookmarkIndex];
            tagStore.setTagsInput(activeBookmark.tags);
            setNewName(activeBookmark.name);
            setNewDescription(activeBookmark.description || "");
            setNewImg(activeBookmark.image || "");
            setNewUrl(activeBookmark.url);
            setNewFavicon(activeBookmark.favicon || "");
        }
    };

    const updateBookmark = async () => {
        const id = bookmarkStore.bookmarks[bookmarkStore.activeBookmarkIndex].id;
        const bookmarkDoc = doc(db, "bookmarks", id);
        await updateDoc(bookmarkDoc, {
            name: newName,
            description: newDescription,
            tags: tagStore.tagsInput,
            image: newImg,
            url: newUrl,
            favicon: newFavicon
        });

        const tagExists = () => tagStore.tagSet.some((tag) => tag.name === tagStore.activeFilter.name);

        if (!tagExists) {
            tagStore.setActiveFilter(tagStore.allItemsFilter);
        }
    };

    const refreshPreview = () => {
        axios({
            method: "get",
            url: `/link-preview?url=${newUrl}`
        })
            .then((res) => {
                setNewName(res.data.title || "");
                setNewDescription(res.data.description || "");
                setNewImg(res.data.images[0] || "");
                setNewFavicon(res.data.favicons[0] || "");
            })
            .catch((err: Error) => {
                console.error(err);
            });
    };

    return (
        <DialogBox
            title="Edit Bookmark"
            active={bookmarkStore.editBookmarkDialogVisible}
            close={bookmarkStore.hideEditBookmarkDialog}
            confirmButton={{ onClick: () => updateBookmark(), text: "Update", id: "update-tags-confirm" }}
            onEnter={onDialogOpening}
        >
            <Button onClick={refreshPreview} id="refresh-data-button" symbol="refresh" />
            <PreviewImg url={newImg} />
            <Favicon url={newFavicon} />
            <TextInput
                label="Url"
                id="url-input"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                style={{ marginBottom: 10 }}
            />
            <TextInput
                label="Title"
                id="title-input"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                style={{ marginBottom: 10 }}
            />
            <TagsInput style={{ marginBottom: 10 }} />
            <Textarea
                id="description-input"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
            />
        </DialogBox>
    );
};

export default observer(EditBookmark);
