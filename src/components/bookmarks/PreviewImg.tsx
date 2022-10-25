import React, { FC } from "react";
import styled, { css } from "styled-components";
import Symbol from "../common/Symbol";

const borderStyle = css`
    border: 1px solid ${(props) => props.theme.color.border.light};
    border-radius: 5px;
    box-sizing: border-box;
    box-shadow: 0 1px 0 ${(props) => props.theme.color.border.heavy};
`;

const Image = styled.img<{ clipImg?: boolean; border?: boolean }>`
    width: 100%;
    background-color: white;
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
    background-color: white;
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
