import css from "./Url.module.css";
import { formatUrl } from "../../utilities";

interface UrlPropTypes {
    url: string;
    style?: any;
}

const Url = ({ url, style }: UrlPropTypes) => {
    const formattedUrl = formatUrl(url);

    return (
        <div className={css.url} style={style}>
            {formattedUrl[0]}
            {formattedUrl[1] && <span className={css.subdomain}>/{formattedUrl[1]}</span>}
        </div>
    );
};

export default Url;
