import { observer } from "mobx-react";
import React, { useState } from "react";
import { useStores } from "../store";
import DialogBox from "./DialogBox";
import { writeBatch, doc } from "@firebase/firestore";
import { db } from "../firebase-config";

const RenameTag = () => {
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
        await batch.commit();
        bookmarkStore.setActiveFilter(newName);
    };

    return (
        <DialogBox
            title="Rename Tag"
            active={bookmarkStore.renameTagDialogVisible}
            close={bookmarkStore.hideRenameTagDialog}
            onEnter={() => setNewName(bookmarkStore.activeFilter)}
            confirmButton={{
                text: "update",
                id: "rename-tag-confirm",
                onClick: () => {
                    renameTag();
                    bookmarkStore.hideRenameTagDialog();
                }
            }}
        >
            <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </DialogBox>
    );
};

export default observer(RenameTag);
