import { observer } from "mobx-react";
import React, { useState } from "react";
import { useStores } from "../store";
import DialogBox from "./DialogBox";
import { writeBatch, doc } from "@firebase/firestore";
import { db } from "../firebase-config";

const EditTag = () => {
    const { bookmarkStore } = useStores();
    const [newName, setNewName] = useState("");

    const batch = writeBatch(db);

    const renameTag = async () => {
        bookmarkStore.bookmarks.forEach((bookmark) => {
            const tags = [...bookmark.tags];
            if (tags.includes(bookmarkStore.activeFilter)) {
                const bookmarkDoc = doc(db, "bookmarks", bookmark.id);
                const index = tags.indexOf(bookmarkStore.activeFilter);
                tags.splice(index, 1, newName);
                batch.update(bookmarkDoc, { tags: tags });
            }
        });
        const id = bookmarkStore.tagSet.filter((tag2) => tag2.name === bookmarkStore.activeFilter)[0].id;
        const tagDoc = doc(db, "tags", id);
        batch.update(tagDoc, { name: newName });
        await batch.commit();
        bookmarkStore.setActiveFilter(newName);
    };

    return (
        <DialogBox
            title="Edit Tag"
            active={bookmarkStore.editTagDialogVisible}
            close={bookmarkStore.hideEditTagDialog}
            onEnter={() => setNewName(bookmarkStore.activeFilter)}
            confirmButton={{
                text: "update",
                id: "edit-tag-confirm",
                onClick: () => {
                    renameTag();
                    bookmarkStore.hideEditTagDialog();
                }
            }}
        >
            <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </DialogBox>
    );
};

export default observer(EditTag);
