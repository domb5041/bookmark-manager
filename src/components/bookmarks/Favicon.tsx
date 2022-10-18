import React, { FC } from "react";
import Symbol from "../common/Symbol";

interface IFaviconProps {
    url?: string;
}

const Favicon: FC<IFaviconProps> = ({ url }) => {
    return url ? <img src={url} alt="favicon" style={{ width: 20 }} /> : <Symbol name="link" />;
};

export default Favicon;
