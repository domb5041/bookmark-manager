import { observer } from "mobx-react";
import React, { useState } from "react";
import { useStores } from "../store";
import DialogBox from "./DialogBox";
import { writeBatch, doc } from "@firebase/firestore";
import { db } from "../firebase-config";
import styled from "styled-components";
import Symbol from "./Symbol";

const Swatch = styled.div<{ color: string; active: boolean }>`
    background-color: ${(props) => props.color};
    width: 40px;
    height: 40px;
    border-radius: 100%;
    box-sizing: border-box;
    border: 5px solid ${(props) => (props.active ? "black" : "transparent")};
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Swatches = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const EditTag = () => {
    const { bookmarkStore, tagStore } = useStores();
    const [newName, setNewName] = useState("");
    const [newColor, setNewColor] = useState("");
    const [newIcon, setNewIcon] = useState("");

    const colors = ["grey", "red", "green", "blue", "orange", "purple"];
    const icons = ["tag", "add", "photo_camera", "palette", "nature", "flash_on", "wb_sunny"];

    const batch = writeBatch(db);

    const renameTag = async () => {
        bookmarkStore.bookmarks.forEach((bookmark) => {
            const tags = [...bookmark.tags];
            if (tags.includes(tagStore.activeFilter)) {
                const bookmarkDoc = doc(db, "bookmarks", bookmark.id);
                const index = tags.indexOf(tagStore.activeFilter);
                tags.splice(index, 1, newName);
                batch.update(bookmarkDoc, { tags: tags });
            }
        });
        const id = tagStore.tagSet.filter((tag2) => tag2.name === tagStore.activeFilter)[0].id;
        const tagDoc = doc(db, "tags", id);
        batch.update(tagDoc, { name: newName, color: newColor, icon: newIcon });
        await batch.commit();
        tagStore.setActiveFilter(newName);
    };

    return (
        <DialogBox
            title="Edit Tag"
            active={tagStore.editTagDialogVisible}
            close={tagStore.hideEditTagDialog}
            onEnter={() => {
                const { color, icon } = tagStore.tagSet.filter((tag2) => tag2.name === tagStore.activeFilter)[0];
                setNewName(tagStore.activeFilter);
                setNewColor(color);
                setNewIcon(icon);
            }}
            confirmButton={{
                text: "update",
                id: "edit-tag-confirm",
                onClick: () => {
                    renameTag();
                    tagStore.hideEditTagDialog();
                }
            }}
        >
            <input value={newName} onChange={(e) => setNewName(e.target.value)} />
            <hr />
            <Swatches>
                {colors.map((color, i) => (
                    <Swatch
                        color={color}
                        key={`${i}-${color}`}
                        onClick={() => setNewColor(color)}
                        active={newColor === color}
                    />
                ))}
            </Swatches>
            <hr />
            <Swatches>
                {icons.map((icon, i) => (
                    <Swatch
                        color={newColor}
                        key={`${i}-${icon}`}
                        onClick={() => setNewIcon(icon)}
                        active={newIcon === icon}
                    >
                        <Symbol name={icon} color="white" />
                    </Swatch>
                ))}
            </Swatches>
        </DialogBox>
    );
};

export default observer(EditTag);
