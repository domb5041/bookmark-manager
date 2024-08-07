import { observer } from "mobx-react";
import { useStores } from "../store";
import DialogBox from "./common/DialogBox";
import { deleteDoc, doc } from "@firebase/firestore";
import { db } from "../firebase-config";

const DeleteBookmark = () => {
    const { bookmarkStore, tagStore } = useStores();

    const deleteBookmark = async () => {
        if (!bookmarkStore.activeBookmark) return;
        const bookmarkDoc = doc(db, "bookmarks", bookmarkStore.activeBookmark.id);
        await deleteDoc(bookmarkDoc);

        const tagExists = () => tagStore.tagSet.some((tag) => tag.name === tagStore.activeFilter.name);

        if (!tagExists) {
            tagStore.setActiveFilter(tagStore.allItemsFilter);
        }
    };

    return (
        <DialogBox
            title="Delete Bookmark"
            active={bookmarkStore.deleteBookmarkDialogVisible}
            close={bookmarkStore.hideDeleteBookmarkDialog}
            width="300px"
            height="200px"
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
