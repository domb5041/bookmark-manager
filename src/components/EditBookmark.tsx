import React, { useEffect, useState } from "react";
import { useStores } from "../store";
import DialogBox from "./common/DialogBox";
import { observer } from "mobx-react";
import { updateDoc, doc } from "@firebase/firestore";
import { db } from "../firebase-config";
import TagsInput from "./common/TagsInput";
import PreviewImg from "./bookmarks/PreviewImg";
import axios from "axios";
import TextInput from "./common/TextInput";
import Button from "./common/Button";
import Textarea from "./common/Textarea";
import { isValidHttpUrl } from "../utilities";
import moment from "moment";
import { IBookmark } from "../store/bookmark.store";

const EditBookmark = () => {
    const { bookmarkStore, tagStore } = useStores();
    const [newName, setNewName] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [newImg, setNewImg] = useState("");
    const [newUrl, setNewUrl] = useState("");
    const [newFavicon, setNewFavicon] = useState("");
    const [validUrl, setValidUrl] = useState(false);

    const onDialogOpening = () => {
        if (bookmarkStore.activeBookmark) {
            const { tags, name, description, image, url, favicon } = bookmarkStore.activeBookmark;
            tagStore.setTagsInput(tags);
            setNewName(name);
            setNewDescription(description || "");
            setNewImg(image || "");
            setNewUrl(url);
            setNewFavicon(favicon || "");
        }
    };

    const updateBookmark = async () => {
        if (!bookmarkStore.activeBookmark) return;
        const bookmarkDoc = doc(db, "bookmarks", bookmarkStore.activeBookmark.id);
        const newFields = {
            name: newName,
            description: newDescription,
            tags: tagStore.tagsInput,
            image: newImg,
            url: newUrl,
            favicon: newFavicon,
            dateModified: Number(moment().format("X"))
        };
        await updateDoc(bookmarkDoc, newFields);

        const activeBookmark: IBookmark = { ...bookmarkStore.activeBookmark, ...newFields };
        bookmarkStore.setActiveBookmark(activeBookmark);

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

    useEffect(() => {
        setValidUrl(isValidHttpUrl(newUrl));
    }, [newUrl]);

    return (
        <DialogBox
            title="Edit Bookmark"
            active={bookmarkStore.editBookmarkDialogVisible}
            close={bookmarkStore.hideEditBookmarkDialog}
            confirmButton={{ onClick: () => updateBookmark(), text: "Update", id: "update-tags-confirm" }}
            onEnter={onDialogOpening}
        >
            <TextInput
                id="url-input"
                label="Url"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                style={{ marginBottom: 15 }}
            />
            <div style={{ marginBottom: 15 }}>
                <label>Preview</label>
                <PreviewImg imgUrl={newImg} border />
            </div>
            <TextInput
                label="Title"
                id="title-input"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                style={{ marginBottom: 15 }}
            />
            <Textarea
                id="description-input"
                label="Description"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                style={{ marginBottom: 15 }}
            />
            <TagsInput style={{ marginBottom: 15 }} />
            <Button onClick={refreshPreview} id="refresh-data-button" symbol="refresh" disabled={!validUrl} />
        </DialogBox>
    );
};

export default observer(EditBookmark);
