import { observer } from "mobx-react";
import { useStores } from "../../store";
import { IBookmark } from "../../store/bookmark.store";
import Button from "../common/buttons/Button";
import Favicon from "./Favicon";
import Tag from "./Tag";
import Url from "../common/Url";
import ScrollContainer from "../common/ScrollContainer";
import { formatDate } from "../../utilities";
import css from "./List.module.css";
import classNames from "classnames";

interface IListProps {
    bookmarks: IBookmark[] | null;
}

const List = ({ bookmarks }: IListProps) => {
    const { bookmarkStore } = useStores();
    return (
        <>
            <div className={css.header} id="bookmarks-container-list-headers">
                <label>title</label>
                <label>url</label>
                <label>tags</label>
                <label>created</label>
            </div>
            <ScrollContainer id="bookmarks-container-list" borderBottom={false} style={{ padding: "0 5px 5px 5px" }}>
                {bookmarks?.map((bookmark, i) => (
                    <div
                        id={`bookmark-${bookmark.id}`}
                        key={bookmark.id}
                        onClick={() => bookmarkStore.setActiveBookmark(bookmark)}
                        onDoubleClick={() => bookmarkStore.openBookmark(bookmark.url, bookmark.id)}
                        className={classNames(css.bookmark, {
                            [css.active]: bookmarkStore.activeBookmark?.id === bookmark.id,
                            [css.highlight]: i % 2 === 0
                        })}
                    >
                        <Favicon url={bookmark.favicon} />
                        <div className={css.bookmarkName}>{bookmark.name}</div>
                        <div className={css.bookmarkUrl}>
                            <Url url={bookmark.url} />
                        </div>
                        <div className={css.bookmarkTags}>
                            {bookmark.tags.map((tag, i) => (
                                <Tag
                                    key={`${i}-${tag}`}
                                    name={tag}
                                    active={bookmarkStore.activeBookmark?.id === bookmark.id}
                                />
                            ))}
                        </div>
                        <div className={css.bookmarkDateCreated}>{formatDate(bookmark.dateAdded)}</div>
                        <Button
                            symbol="arrow_forward"
                            onClick={() => bookmarkStore.openBookmark(bookmark.url, bookmark.id)}
                            className={css.openBookmarkButton}
                            id={`open-bookmark-button-${i}`}
                            styleType="minimal"
                        />
                    </div>
                ))}
            </ScrollContainer>
        </>
    );
};

export default observer(List);
