import { observer } from "mobx-react";
import React, { useState } from "react";
import { useStores } from "../store";
import DialogBox from "./common/DialogBox";
import { writeBatch, doc } from "@firebase/firestore";
import { db } from "../firebase-config";
import styled from "styled-components";
import Symbol from "./common/Symbol";
import { tagColors, getTagBackground } from "../theme";
import TextInput from "./common/TextInput";
import moment from "moment";

const Swatch = styled.div<{ color: string }>`
    background-color: ${(props) => () => getTagBackground(props.color)};
    transition: 0.3s;
    & > .material-symbols-outlined {
        transition: 0.3s;
    }
    width: 30px;
    height: 30px;
    border-radius: 100%;
    box-sizing: border-box;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const SwatchSelect = styled.div<{ active: boolean }>`
    padding: 2px;
    border-radius: 100%;
    box-sizing: border-box;
    border: 2px solid ${(props) => (props.active ? "grey" : "transparent")};
`;

const Swatches = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 10px;
`;

const Preview = styled(Swatch)`
    width: 55px;
    height: 55px;
    margin: 0 auto 10px auto;
`;

const EditTag = () => {
    const { bookmarkStore, tagStore } = useStores();
    const [newName, setNewName] = useState("");
    const [newColor, setNewColor] = useState(tagColors[0]);
    const [newIcon, setNewIcon] = useState("tag");

    const icons = [
        "tag",
        "photo_camera",
        "palette",
        "nature",
        "wb_sunny",
        "bolt",
        "luggage",
        "liquor",
        "nightlife",
        "pool",
        "festival",
        "fitness_center",
        "apartment",
        "spa",
        "golf_course",
        "lightbulb",
        "push_pin",
        "support",
        "schedule",
        "code_blocks",
        "piano",
        "roller_skating",
        "school",
        "science",
        "sports_basketball",
        "self_improvement",
        "sports_esports",
        "construction",
        "mail",
        "notifications",
        "inventory_2",
        "account_balance",
        "savings",
        "credit_card"
    ];

    const batch = writeBatch(db);

    const renameTag = async () => {
        bookmarkStore.bookmarks.forEach((bookmark) => {
            const tags = [...bookmark.tags];
            if (tags.includes(tagStore.activeFilter.name)) {
                const bookmarkDoc = doc(db, "bookmarks", bookmark.id);
                const index = tags.indexOf(tagStore.activeFilter.name);
                tags.splice(index, 1, newName);
                batch.update(bookmarkDoc, { tags: tags, dateModified: Number(moment().format("X")) });
            }
        });
        const tagDoc = doc(db, "tags", tagStore.activeFilter.id);
        batch.update(tagDoc, { name: newName, color: newColor, icon: newIcon });
        await batch.commit();
        tagStore.setActiveFilter({
            id: tagStore.activeFilter.id,
            name: newName,
            color: newColor,
            icon: newIcon,
            count: tagStore.activeFilter.count
        });
    };

    return (
        <DialogBox
            title="Edit Tag"
            active={tagStore.editTagDialogVisible}
            close={tagStore.hideEditTagDialog}
            onEnter={() => {
                setNewName(tagStore.activeFilter.name);
                setNewColor(tagStore.activeFilter.color);
                setNewIcon(tagStore.activeFilter.icon);
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
            <Preview color={newColor}>
                <Symbol name={newIcon} color={newColor} size="30px" />
            </Preview>
            <TextInput
                id="tag-name-input"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                style={{ marginBottom: 10 }}
            />
            <Swatches>
                {tagColors.map((color, i) => (
                    <SwatchSelect key={`${i}-${color}`} active={newColor === color}>
                        <Swatch color={color} onClick={() => setNewColor(color)}>
                            <Symbol name={newIcon} color={color} size="20px" />
                        </Swatch>
                    </SwatchSelect>
                ))}
            </Swatches>
            <Swatches>
                {icons.map((icon, i) => (
                    <SwatchSelect key={`${i}-${icon}`} active={newIcon === icon}>
                        <Swatch color={newColor} key={`${i}-${icon}`} onClick={() => setNewIcon(icon)}>
                            <Symbol name={icon} color={newColor} size="20px" />
                        </Swatch>
                    </SwatchSelect>
                ))}
            </Swatches>
        </DialogBox>
    );
};

export default observer(EditTag);
