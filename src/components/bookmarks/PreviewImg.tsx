import React, { FC } from "react";
import styled from "styled-components";
import Symbol from "../Symbol";

const Image = styled.img`
    width: 100%;
    min-height: 100px;
    max-height: 200px;
    object-fit: cover;
    margin-bottom: -3px;
`;

const Placeholder = styled.div`
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

interface IPreviewImgProps {
    imgUrl?: string;
    style?: any;
}

const PreviewImg: FC<IPreviewImgProps> = ({ imgUrl, style }) => {
    return imgUrl ? (
        <Image src={imgUrl} style={style} />
    ) : (
        <Placeholder style={style}>
            <Symbol name="web_asset_off" size="100px" color="silver" />
        </Placeholder>
    );
};

export default PreviewImg;
