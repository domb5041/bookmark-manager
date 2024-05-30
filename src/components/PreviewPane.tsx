import { observer } from "mobx-react";
import { useRef } from "react";
import { useStores } from "../store";
import PreviewImg from "./bookmarks/PreviewImg";
import Tag from "./bookmarks/Tag";
import ToolbarButton from "./common/buttons/ToolButton";
import Button from "./common/buttons/Button";
import Url from "./common/Url";
import { CSSTransition } from "react-transition-group";
import ScrollContainer from "./common/ScrollContainer";
import { formatDate } from "../utilities";
import css from "./PreviewPane.module.css";
import { useMediaQuery } from "react-responsive";

const PreviewPane = () => {
    const { bookmarkStore } = useStores();
    const nodeRef = useRef(null);

    const enoughSpace = useMediaQuery({
        query: `(min-width: 1000px)`
    });

    return (
        <CSSTransition
            nodeRef={nodeRef}
            in={bookmarkStore.bookmarkPreviewVisible && enoughSpace}
            unmountOnExit
            timeout={500}
            classNames={{
                enter: css.enter,
                enterActive: css.enterActive,
                exit: css.exit,
                exitActive: css.exitActive
            }}
        >
            <div className={css.previewPane} ref={nodeRef}>
                {bookmarkStore.activeBookmark && (
                    <div className={css.previewPaneInner}>
                        <div className={css.editDelete}>
                            <ToolbarButton
                                symbol="edit"
                                text="Edit"
                                onClick={bookmarkStore.showEditBookmarkDialog}
                                disabled={!bookmarkStore.activeBookmark}
                                id="edit-bookmark-button"
                                style={{ marginRight: 20 }}
                            />
                            <ToolbarButton
                                symbol="delete"
                                text="delete"
                                onClick={bookmarkStore.showDeleteBookmarkDialog}
                                disabled={!bookmarkStore.activeBookmark}
                                id="add-bookmark-button"
                            />
                        </div>
                        <ScrollContainer style={{ padding: "5px 10px" }}>
                            <PreviewImg
                                imgUrl={bookmarkStore.activeBookmark.image}
                                border
                                style={{ marginBottom: 7 }}
                            />
                            <b>{bookmarkStore.activeBookmark.name}</b>
                            <div className={css.divider} />
                            <label className={css.heading}>Description</label>
                            <p style={{ margin: 0, fontSize: 14 }}>{bookmarkStore.activeBookmark.description}</p>
                            <div className={css.divider} />
                            <label className={css.heading}>Url</label>
                            <Url url={bookmarkStore.activeBookmark.url} />
                            <div className={css.divider} />
                            <label className={css.heading}>Tags</label>
                            {bookmarkStore.activeBookmark.tags.length > 0 &&
                                bookmarkStore.activeBookmark.tags.map((tag, i) => (
                                    <Tag key={`${i}-${tag}`} name={tag} style={{ marginBottom: 5 }} />
                                ))}
                            <div className={css.divider} />
                            <label className={css.heading}>Timestamps</label>
                            <div className={css.date}>
                                Created: {formatDate(bookmarkStore.activeBookmark.dateAdded)}
                            </div>
                            <div className={css.date}>
                                Modified: {formatDate(bookmarkStore.activeBookmark.dateModified)}
                            </div>
                            <div className={css.date}>
                                Last Opened: {formatDate(bookmarkStore.activeBookmark.dateOpened)}
                            </div>
                        </ScrollContainer>
                        <div className={css.openLink}>
                            <Button
                                symbol="arrow_forward"
                                text="Open Link"
                                onClick={bookmarkStore.openActiveBookmark}
                                disabled={!bookmarkStore.activeBookmark}
                                id="open-bookmark-button"
                                style={{ width: "100%" }}
                                styleType="primary"
                            />
                        </div>
                    </div>
                )}
            </div>
        </CSSTransition>
    );
};

export default observer(PreviewPane);
