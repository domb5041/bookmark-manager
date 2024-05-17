import { observer } from "mobx-react";
import Masonry from "react-masonry-css";
import { IBookmark } from "../../store/bookmark.store";
import Thumbnail from "./Thumbnail";
import ScrollContainer from "../common/ScrollContainer";
import css from "./Thumbnails.module.css";

interface IThumbnailsProps {
    bookmarks: IBookmark[];
}

const Thumbnails = ({ bookmarks }: IThumbnailsProps) => {
    const columns = {
        default: 5,
        2000: 4,
        1600: 3,
        1300: 2,
        1000: 1
    };

    return (
        <ScrollContainer id="bookmarks-container-thumbnails" style={{ padding: "5px 0 0 30px" }}>
            <Masonry breakpointCols={columns} className={css.masonry} columnClassName={css.masonryColumn}>
                {bookmarks?.map((bookmark, i) => (
                    <Thumbnail bookmark={bookmark} key={bookmark.id} index={i} />
                ))}
            </Masonry>
        </ScrollContainer>
    );
};

export default observer(Thumbnails);
