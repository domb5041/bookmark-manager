import Symbol from "../common/Symbol";
import classNames from "classnames";
import css from "./PreviewImg.module.css";

interface IPreviewImgProps {
    imgUrl?: string;
    style?: any;
    clipImg?: boolean;
    border?: boolean;
}

const PreviewImg = ({ imgUrl, style, clipImg, border }: IPreviewImgProps) => {
    return imgUrl ? (
        <img
            className={classNames(css.image, { [css.clipped]: clipImg, [css.border]: border })}
            src={imgUrl}
            style={style}
        />
    ) : (
        <div className={classNames(css.placeholder, { [css.border]: border })} style={style}>
            <Symbol name="web_asset_off" size="100px" />
        </div>
    );
};

export default PreviewImg;
