import { observer } from "mobx-react";
import React from "react";
import { useStores } from "../store";
import DialogBox from "./DialogBox";
import { deleteDoc, doc } from "@firebase/firestore";
import { db } from "../firebase-config";

const DeleteBookmark = () => {
    const { bookmarkStore } = useStores();

    const deleteBookmark = async () => {
        const id = bookmarkStore.bookmarks[bookmarkStore.activeBookmarkIndex].id;
        const bookmarkDoc = doc(db, "bookmarks", id);
        await deleteDoc(bookmarkDoc);
    };

    return (
        <DialogBox
            title="Delete Bookmark"
            active={bookmarkStore.deleteBookmarkDialogVisible}
            close={bookmarkStore.hideDeleteBookmarkDialog}
            confirmButton={{
                text: "delete",
                id: "delete-bookmark-confirm",
                onClick: () => {
                    deleteBookmark();
                    bookmarkStore.hideDeleteBookmarkDialog();
                }
            }}
        >
            <p>Are you sure?</p>
        </DialogBox>
    );
};

export default observer(DeleteBookmark);
