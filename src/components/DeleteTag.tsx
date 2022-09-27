import { observer } from "mobx-react";
import React from "react";
import { useStores } from "../store";
import DialogBox from "./DialogBox";
import { writeBatch, doc } from "@firebase/firestore";
import { db } from "../firebase-config";

const DeleteTag = () => {
    const { bookmarkStore } = useStores();

    const batch = writeBatch(db);

    const deleteTag = async () => {
        bookmarkStore.bookmarks.forEach((bookmark) => {
            const tags = [...bookmark.tags];
            if (tags.includes(bookmarkStore.activeFilter)) {
                const bookmarkDoc = doc(db, "bookmarks", bookmark.id);
                const index = tags.indexOf(bookmarkStore.activeFilter);
                tags.splice(index, 1);
                batch.update(bookmarkDoc, { tags: tags });
            }
        });
        await batch.commit();
        bookmarkStore.setActiveFilter("@all");
    };

    return (
        <DialogBox
            title="Delete Tag"
            active={bookmarkStore.deleteTagDialogVisible}
            close={bookmarkStore.hideDeleteTagDialog}
            confirmButton={{
                text: "delete",
                id: "delete-tag-confirm",
                onClick: () => {
                    deleteTag();
                    bookmarkStore.hideDeleteTagDialog();
                }
            }}
        >
            <p>Are you sure?</p>
        </DialogBox>
    );
};

export default observer(DeleteTag);
