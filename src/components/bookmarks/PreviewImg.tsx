import React, { FC } from "react";
import styled, { css } from "styled-components";
import Symbol from "../common/Symbol";

const borderStyle = css`
    border: 1px solid ${(props) => props.theme.color.background.border};
    border-radius: 5px;
    box-sizing: border-box;
`;

const Image = styled.img<{ clipImg?: boolean; border?: boolean }>`
    width: 100%;
    ${(props) =>
        props.clipImg &&
        css`
            min-height: 100px;
            max-height: 200px;
            object-fit: cover;
            margin-bottom: -3px;
        `}
    ${(props) => props.border && borderStyle}
`;

const Placeholder = styled.div<{ border?: boolean }>`
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    ${(props) => props.border && borderStyle}
`;

interface IPreviewImgProps {
    imgUrl?: string;
    style?: any;
    clipImg?: boolean;
    border?: boolean;
}

const PreviewImg: FC<IPreviewImgProps> = ({ imgUrl, style, clipImg, border }) => {
    return imgUrl ? (
        <Image src={imgUrl} style={style} clipImg={clipImg} border={border} />
    ) : (
        <Placeholder style={style} border={border}>
            <Symbol name="web_asset_off" size="100px" color="silver" />
        </Placeholder>
    );
};

export default PreviewImg;
