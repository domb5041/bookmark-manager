import React, { useEffect, useState } from "react";
import { useStores } from "../store";
import DialogBox from "./DialogBox";
import { observer } from "mobx-react";
import { updateDoc, doc } from "@firebase/firestore";
import { db } from "../firebase-config";

const EditTags = () => {
    const { bookmarkStore } = useStores();
    const [tags, setTags] = useState("");

    useEffect(() => {
        const initialValue =
            bookmarkStore.activeBookmarkIndex >= 0
                ? bookmarkStore.bookmarks[bookmarkStore.activeBookmarkIndex].tags.join(", ")
                : "";
        setTags(initialValue);
    }, [bookmarkStore.activeBookmarkIndex, bookmarkStore.bookmarks]);

    const updateTags = async () => {
        const newTags = tags.split(", ");
        const id = bookmarkStore.bookmarks[bookmarkStore.activeBookmarkIndex].id;
        const bookmarkDoc = doc(db, "bookmarks", id);
        await updateDoc(bookmarkDoc, { tags: newTags });
    };

    return (
        <DialogBox
            title="Edit Tags"
            active={bookmarkStore.editTagsDialogVisible}
            close={bookmarkStore.hideEditTagsDialog}
            onConfirm={updateTags}
        >
            <input value={tags} onChange={(e) => setTags(e.target.value)} />
        </DialogBox>
    );
};

export default observer(EditTags);
