import React, { useState } from "react";
import { useStores } from "../store";
import DialogBox from "./DialogBox";
import { observer } from "mobx-react";
import { updateDoc, doc } from "@firebase/firestore";
import { db } from "../firebase-config";
import TagsInput from "./TagsInput";

const EditBookmark = () => {
    const { bookmarkStore } = useStores();

    const updateTags = async () => {
        const id = bookmarkStore.bookmarks[bookmarkStore.activeBookmarkIndex].id;
        const bookmarkDoc = doc(db, "bookmarks", id);
        await updateDoc(bookmarkDoc, { tags: bookmarkStore.tagsInput });

        if (!bookmarkStore.tags.includes(bookmarkStore.activeFilter)) {
            bookmarkStore.setActiveFilter(bookmarkStore.allItemsFilter);
        }
    };

    return (
        <DialogBox
            title="Edit Bookmark"
            active={bookmarkStore.editTagsDialogVisible}
            close={bookmarkStore.hideEditTagsDialog}
            confirmButton={{ onClick: () => updateTags(), text: "Update", id: "update-tags-confirm" }}
            onEnter={() => {
                const initialValue =
                    bookmarkStore.activeBookmarkIndex >= 0
                        ? bookmarkStore.bookmarks[bookmarkStore.activeBookmarkIndex].tags
                        : [];
                bookmarkStore.setTagsInput(initialValue);
            }}
        >
            <TagsInput />
        </DialogBox>
    );
};

export default observer(EditBookmark);
