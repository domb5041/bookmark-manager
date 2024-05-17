import Symbol from "../common/Symbol";

interface IFaviconProps {
    url?: string;
}

const Favicon = ({ url }: IFaviconProps) => {
    return url ? <img src={url} alt="favicon" style={{ width: 20, marginRight: 10 }} /> : <Symbol name="link" />;
};

export default Favicon;
