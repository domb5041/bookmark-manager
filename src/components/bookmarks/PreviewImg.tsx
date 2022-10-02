import React, { FC } from "react";
import styled from "styled-components";
import Symbol from "../Symbol";

const Container = styled.div`
    width: 100%;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    background-color: white;
    border-radius: 5px;
    & > img {
        width: 90%;
    }
`;

interface IPreviewImgProps {
    url?: string;
}

const PreviewImg: FC<IPreviewImgProps> = ({ url }) => {
    return <Container>{url ? <img src={url} alt="preview-img" /> : <Symbol name="link" />}</Container>;
};

export default PreviewImg;
