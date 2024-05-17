import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useStores } from "../../store";
import Symbol from "../common/Symbol";
import css from "./Tag.module.css";
import classNames from "classnames";

interface ITagProps {
    name: string;
    active?: boolean;
    onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
    id?: string;
    onClick?: (e: React.MouseEvent) => void;
    onFocus?: () => void;
    style?: any;
}

const Tag = ({ name, active, onKeyDown, id, onClick, onFocus, style }: ITagProps) => {
    const { tagStore } = useStores();
    const [icon, setIcon] = useState("tag");

    useEffect(() => {
        const tagIndex = tagStore.tagSet.findIndex((tag) => tag.name === name);
        if (tagIndex > -1) {
            setIcon(tagStore.tagSet[tagIndex].icon);
        }
    }, [tagStore.tagSet, name]);

    return (
        <div
            id={id}
            onKeyDown={onKeyDown}
            tabIndex={0}
            onClick={onClick}
            onFocus={onFocus}
            style={style}
            className={classNames(css.tag, { [css.active]: active })}
        >
            <Symbol name={icon} size="17px" />
            <div className={css.tagName}>{name}</div>
        </div>
    );
};

export default observer(Tag);
