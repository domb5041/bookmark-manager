import { observer } from "mobx-react";
import { useState } from "react";
import { useStores } from "../store";
import DialogBox from "./common/DialogBox";
import { writeBatch, doc } from "@firebase/firestore";
import { db } from "../firebase-config";
import Symbol from "./common/Symbol";
import TextInput from "./common/textInputs/TextInput";
import moment from "moment";
import Button from "./common/buttons/Button";
import css from "./EditTag.module.css";
import classNames from "classnames";

const EditTag = () => {
    const { bookmarkStore, tagStore } = useStores();
    const [newName, setNewName] = useState("");
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
        batch.update(tagDoc, { name: newName, icon: newIcon });
        await batch.commit();
        tagStore.setActiveFilter({
            id: tagStore.activeFilter.id,
            name: newName,
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
            <div className={classNames(css.swatch, css.preview)}>
                <Symbol name={newIcon} size="30px" />
            </div>
            <TextInput
                label="Title"
                style={{ marginBottom: 15 }}
                id="tag-name-input"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
            />
            <div style={{ marginBottom: 10 }}>
                <label>Icon</label>
                <div className={css.swatches}>
                    {icons.map((icon, i) => (
                        <div
                            className={classNames(css.swatchSelect, { [css.active]: newIcon === icon })}
                            key={`${i}-${icon}`}
                        >
                            <div className={css.swatch} key={`${i}-${icon}`} onClick={() => setNewIcon(icon)}>
                                <Symbol name={icon} size="20px" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Button symbol="delete" onClick={tagStore.showDeleteTagDialog} id="delete-tag-button" />
        </DialogBox>
    );
};

export default observer(EditTag);
