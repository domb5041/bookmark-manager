import React, { useEffect, useState } from "react";
import { useStores } from "../store";
import DialogBox from "./DialogBox";
import { observer } from "mobx-react";

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

    return (
        <DialogBox
            title='Edit Tags'
            active={bookmarkStore.editTagsDialogVisible}
            close={bookmarkStore.hideEditTagsDialog}
            onConfirm={() => bookmarkStore.setTags(tags)}
        >
            <input value={tags} onChange={e => setTags(e.target.value)} />
        </DialogBox>
    );
};

export default observer(EditTags);
