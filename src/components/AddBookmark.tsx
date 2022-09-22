import { observer } from "mobx-react";
import React, { useState } from "react";
import { useStores } from "../store";
import DialogBox from "./DialogBox";
import { addDoc } from "@firebase/firestore";
import { bookmarksCollectionRef } from "../App";

const AddBookmark = () => {
    const { bookmarkStore } = useStores();
    const [url, setUrl] = useState("url");

    const createBookmark = async () => {
        await addDoc(bookmarksCollectionRef, { name: "unamed", url: url, tags: [] });
    };

    return (
        <DialogBox
            title="Add Bookmark"
            active={bookmarkStore.addBookmarkDialogVisible}
            close={bookmarkStore.hideAddBookmarkDialog}
            onConfirm={() => {
                createBookmark();
                bookmarkStore.hideAddBookmarkDialog();
            }}
        >
            <input value={url} onChange={(e) => setUrl(e.target.value)} />
        </DialogBox>
    );
};

export default observer(AddBookmark);
