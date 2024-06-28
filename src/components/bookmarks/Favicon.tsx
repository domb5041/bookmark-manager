import { useState } from "react";
import Symbol from "../common/Symbol";

interface IFaviconProps {
    url?: string;
}

const Favicon = ({ url }: IFaviconProps) => {
    const [error, setError] = useState(false);
    return url && !error ? (
        <img onError={() => setError(true)} src={url} alt="favicon" style={{ width: 20 }} />
    ) : (
        <Symbol name="image" size="20px" />
    );
};

export default Favicon;
