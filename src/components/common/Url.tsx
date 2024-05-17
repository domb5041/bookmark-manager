import css from "./Url.module.css";

interface UrlPropTypes {
    url: string;
    style?: any;
}

const Url = ({ url, style }: UrlPropTypes) => {
    const formatUrl = () => {
        const partsToRemove = /https?:\/\/|www./g;
        const trimmedStart = url.replace(partsToRemove, "");
        const urlParts = trimmedStart.split("/");
        return (
            <div className={css.url} style={style}>
                {urlParts[0]}
                {urlParts[1] && <span className={css.subdomain}>/{urlParts[1]}</span>}
            </div>
        );
    };

    return formatUrl();
};

export default Url;
