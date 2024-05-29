import css from "./ContextMenu.module.css";
import { useStores } from "../../store";
import { observer } from "mobx-react";
import Symbol from "./Symbol";
import { CSSTransition } from "react-transition-group";
import { useRef, useCallback, useEffect } from "react";

const ContextMenu = () => {
    const { bookmarkStore } = useStores();

    const detectLeftClick = useCallback((e: MouseEvent) => {
        if (bookmarkStore.contextMenuVisible && e.button === 0) {
            let targetEl = e.target as HTMLElement; // clicked element
            do {
                if (targetEl === document.getElementById("context-menu")) {
                    // This is a click inside, does nothing, just return.
                    return;
                }
                // Go up the DOM
                targetEl = targetEl.parentNode as HTMLElement;
            } while (targetEl);
            // This is a click outside.
            bookmarkStore.hideContextMenu();
        }
        e.stopPropagation();
    }, []);

    useEffect(() => {
        document.addEventListener("mousedown", detectLeftClick);
        document.addEventListener("mouseleave", bookmarkStore.hideContextMenu);
        return () => {
            document.removeEventListener("mousedown", detectLeftClick);
            document.removeEventListener("mouseleave", bookmarkStore.hideContextMenu);
        };
    }, [detectLeftClick]);

    const [left, top] = bookmarkStore.contextMenuPos;
    const nodeRef = useRef(null);
    return (
        <CSSTransition
            nodeRef={nodeRef}
            in={bookmarkStore.contextMenuVisible}
            unmountOnExit
            timeout={100}
            classNames={{
                enter: css.enter,
                enterActive: css.enterActive,
                exit: css.exit,
                exitActive: css.exitActive
            }}
        >
            <div id="context-menu" className={css.contextMenu} style={{ left, top }} ref={nodeRef}>
                <button
                    className={css.contextMenuRow}
                    onClick={() => {
                        bookmarkStore.openActiveBookmark();
                        bookmarkStore.hideContextMenu();
                    }}
                    disabled={!bookmarkStore.activeBookmark}
                    id="open-bookmark-button"
                >
                    Open
                    <Symbol name="arrow_forward" />
                </button>
                <button
                    className={css.contextMenuRow}
                    onClick={() => {
                        bookmarkStore.showEditBookmarkDialog();
                        bookmarkStore.hideContextMenu();
                    }}
                    disabled={!bookmarkStore.activeBookmark}
                    id="edit-bookmark-button"
                >
                    Edit
                    <Symbol name="edit" />
                </button>
                <button
                    className={css.contextMenuRow}
                    onClick={() => {
                        bookmarkStore.showDeleteBookmarkDialog();
                        bookmarkStore.hideContextMenu();
                    }}
                    disabled={!bookmarkStore.activeBookmark}
                    id="add-bookmark-button"
                >
                    Delete
                    <Symbol name="delete" />
                </button>
            </div>
        </CSSTransition>
    );
};

export default observer(ContextMenu);
