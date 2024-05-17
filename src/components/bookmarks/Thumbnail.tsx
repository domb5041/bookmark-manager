import { observer } from "mobx-react";
import { useStores } from "../../store";
import { IBookmark } from "../../store/bookmark.store";
import Url from "../common/Url";
import Tag from "./Tag";
import PreviewImg from "./PreviewImg";
import Button from "../common/buttons/Button";
import css from "./Thumbnails.module.css";
import classNames from "classnames";

interface IThumbnailProps {
    bookmark: IBookmark;
    index: number;
}

const Thumbnail = ({ bookmark, index }: IThumbnailProps) => {
    const { bookmarkStore } = useStores();
    return (
        <div
            onClick={() => bookmarkStore.setActiveBookmark(bookmark)}
            onDoubleClick={() => bookmarkStore.openBookmark(bookmark.url, bookmark.id)}
            className={classNames(css.thumbnailContainer, {
                [css.active]: bookmarkStore.activeBookmark?.id === bookmark.id
            })}
        >
            <PreviewImg imgUrl={bookmark.image} clipImg />
            <div className={css.thumbnailContainerInner}>
                <div className={css.thumbnailHeadline}>{bookmark.name}</div>
                <div className={css.thumbnailDescription}>{bookmark.description}</div>
                <Url url={bookmark.url} style={{ marginBottom: 7 }} />
                {bookmark.tags.length > 0 && (
                    <div className={css.thumbnailTags}>
                        {bookmark.tags.map((tag, i) => (
                            <Tag key={`${i}-${tag}`} name={tag} />
                        ))}
                    </div>
                )}
            </div>
            <Button
                symbol="arrow_forward"
                onClick={() => bookmarkStore.openBookmark(bookmark.url, bookmark.id)}
                className={css.openBookmarkButton}
                id={`open-bookmark-button-${index}`}
                styleType="primary"
            />
        </div>
    );
};

export default observer(Thumbnail);
