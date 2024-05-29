import MiniDialog from "./common/MiniDialog";
import css from "./common/ContextMenu.module.css";
import { useStores } from "../store";
import { observer } from "mobx-react";
import Symbol from "./common/Symbol";
import classNames from "classnames";

const SortBookmarks = () => {
    const { bookmarkStore } = useStores();

    return (
        <MiniDialog id="sort-bookmarks-dialog" attachTo="sort-bookmarks-button" title="sort by">
            {bookmarkStore.sortOptions.map((option, i) => (
                <button
                    key={i}
                    onClick={() =>
                        bookmarkStore.setSortBy(
                            option.id,
                            bookmarkStore.sortBy === option.id ? !bookmarkStore.sortByReverse : false
                        )
                    }
                    className={classNames(css.contextMenuRow, { [css.active]: bookmarkStore.sortBy === option.id })}
                >
                    {option.displayName}
                    <Symbol
                        name={
                            bookmarkStore.sortBy === option.id
                                ? bookmarkStore.sortByReverse
                                    ? "expand_less"
                                    : "expand_more"
                                : "unfold_more"
                        }
                        className={css.fadedSymbol}
                    />
                </button>
            ))}
        </MiniDialog>
    );
};

export default observer(SortBookmarks);
