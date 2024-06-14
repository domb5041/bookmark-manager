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

    if (!bookmarkStore.activeBookmark) return;

    const { image, name, description, url, tags, dateAdded, dateModified, dateOpened } = bookmarkStore.activeBookmark;

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
                            {image && <PreviewImg imgUrl={image} border style={{ marginBottom: 12 }} />}
                            {name && (
                                <>
                                    <b>{name}</b>
                                    <div className={css.divider} />
                                </>
                            )}
                            {description && (
                                <>
                                    <label className={css.heading}>Description</label>
                                    <p style={{ margin: 0, fontSize: 14 }}>{description}</p>
                                    <div className={css.divider} />
                                </>
                            )}
                            {url && (
                                <>
                                    <label className={css.heading}>Url</label>
                                    <Url url={url} />
                                    <div className={css.divider} />
                                </>
                            )}
                            {tags.length > 0 && (
                                <>
                                    <label className={css.heading}>Tags</label>
                                    {tags.length > 0 &&
                                        tags.map((tag, i) => (
                                            <Tag key={`${i}-${tag}`} name={tag} style={{ marginBottom: 5 }} />
                                        ))}
                                    <div className={css.divider} />
                                </>
                            )}
                            {dateAdded && (
                                <div className={css.date}>
                                    <label>Created</label> {formatDate(dateAdded)}
                                </div>
                            )}
                            {dateModified && (
                                <div className={css.date}>
                                    <label>Modified</label> {formatDate(dateModified)}
                                </div>
                            )}
                            {dateOpened && (
                                <div className={css.date}>
                                    <label>Opened</label> {formatDate(dateOpened)}
                                </div>
                            )}
                        </ScrollContainer>
                        <div className={css.openLink}>
                            <Button
                                symbol="arrow_forward"
                                text="Open Link"
                                onClick={bookmarkStore.openActiveBookmark}
                                disabled={!bookmarkStore.activeBookmark}
                                id="open-bookmark-button"
                                style={{ width: "100%" }}
                                styleType="secondary"
                            />
                        </div>
                    </div>
                )}
            </div>
        </CSSTransition>
    );
};

export default observer(PreviewPane);
