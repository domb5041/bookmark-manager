import React, { FC } from "react";
import styled from "styled-components";

const Container = styled.div`
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    & .subdomain {
        opacity: 0.5;
    }
`;

interface IUrlProps {
    url: string;
}

const Url: FC<IUrlProps> = ({ url }) => {
    const formatUrl = () => {
        const partsToRemove = /https?:\/\/|www./g;
        const trimmedStart = url.replace(partsToRemove, "");
        const urlParts = trimmedStart.split("/");
        return (
            <Container>
                {urlParts[0]}
                {urlParts[1] && <span className="subdomain">/{urlParts[1]}</span>}
            </Container>
        );
    };

    return formatUrl();
};

export default Url;
