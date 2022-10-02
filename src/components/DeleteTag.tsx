import { observer } from "mobx-react";
import React from "react";
import { useStores } from "../store";
import DialogBox from "./DialogBox";
import { writeBatch, doc } from "@firebase/firestore";
import { db } from "../firebase-config";

const DeleteTag = () => {
    const { bookmarkStore, tagStore } = useStores();

    const batch = writeBatch(db);

    const deleteTag = async () => {
        bookmarkStore.bookmarks.forEach((bookmark) => {
            const tags = [...bookmark.tags];
            if (tags.includes(tagStore.activeFilter)) {
                const bookmarkDoc = doc(db, "bookmarks", bookmark.id);
                const index = tags.indexOf(tagStore.activeFilter);
                tags.splice(index, 1);
                batch.update(bookmarkDoc, { tags: tags });
            }
        });
        const id = tagStore.tagSet.filter((tag2) => tag2.name === tagStore.activeFilter)[0].id;
        const tagDoc = doc(db, "tags", id);
        batch.delete(tagDoc);
        await batch.commit();
        tagStore.setActiveFilter(tagStore.allItemsFilter);
    };

    return (
        <DialogBox
            title="Delete Tag"
            active={tagStore.deleteTagDialogVisible}
            close={tagStore.hideDeleteTagDialog}
            confirmButton={{
                text: "delete",
                id: "delete-tag-confirm",
                onClick: () => {
                    deleteTag();
                    tagStore.hideDeleteTagDialog();
                }
            }}
        >
            <p>Are you sure?</p>
        </DialogBox>
    );
};

export default observer(DeleteTag);
