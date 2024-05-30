import Symbol from "../common/Symbol";

interface IFaviconProps {
    url?: string;
}

const Favicon = ({ url }: IFaviconProps) => {
    return url ? <img src={url} alt="favicon" style={{ width: 20 }} /> : <Symbol name="image" size="20px" />;
};

export default Favicon;
