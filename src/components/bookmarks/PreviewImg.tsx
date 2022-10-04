import { transparentize } from "polished";
import React, { FC } from "react";
import styled from "styled-components";
import Symbol from "../Symbol";

const Container = styled.div`
    width: 100%;
    /* height: 150px; */
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    background-color: white;
    border-radius: 5px;
    position: relative;
    box-shadow: 0 5px 10px ${transparentize(0.9, "black")};
    & .preview-img {
        width: 100%;
    }
`;

interface IPreviewImgProps {
    imgUrl?: string;
    style?: any;
}

const PreviewImg: FC<IPreviewImgProps> = ({ imgUrl, style }) => {
    return (
        <Container style={style}>
            {imgUrl ? <img src={imgUrl} alt="preview-img" className="preview-img" /> : <Symbol name="link" />}
        </Container>
    );
};

export default PreviewImg;
