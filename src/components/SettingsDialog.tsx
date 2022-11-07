import { observer } from "mobx-react";
import React, { FC } from "react";
import styled from "styled-components";
import { useStores } from "../store";
import { accents } from "../theme";
import DialogBox from "./common/DialogBox";
import ThemeThumbnail from "./ThemeThumbnail";

const Colors = styled.div`
    margin-top: 5px;
    display: flex;
    justify-content: space-between;
`;

const Thumbnails = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 5px;
    margin-bottom: 20px;
`;

const Color = styled.div<{ color: keyof typeof accents; active: boolean }>`
    cursor: pointer;
    border: 3px solid ${(props) => props.theme.color.background.void};
    outline: 2px solid ${(props) => (props.active ? props.theme.color.accent.primary : "none")};
    background-color: ${(props) => accents[props.color]};
    width: 33px;
    height: 33px;
    border-radius: 100%;
    box-sizing: border-box;
`;

interface ISettingsDialogProps {
    prop?: unknown;
}

const SettingsDialog: FC<ISettingsDialogProps> = ({ prop }) => {
    const { settingStore } = useStores();
    return (
        <DialogBox
            title="Settings"
            active={settingStore.settingsDialogVisible}
            close={settingStore.hideSettingsDialog}
            height="auto"
            confirmButton={{
                text: "Close",
                id: "setting-confirm",
                onClick: settingStore.hideSettingsDialog
            }}
        >
            <label>Appearance</label>
            <Thumbnails>
                <ThemeThumbnail themeSetting="light" />
                <ThemeThumbnail themeSetting="dark" />
                <ThemeThumbnail themeSetting="auto" />
            </Thumbnails>
            <label>Accent Colour</label>
            <Colors>
                {/* <SwatchSelect active={color === settingStore.accentColor}> */}
                {Object.keys(accents).map((color) => (
                    <Color
                        color={color as keyof typeof accents}
                        onClick={() => settingStore.setAccentColor(color as keyof typeof accents)}
                        active={color === settingStore.accentColor}
                    />
                ))}
            </Colors>
        </DialogBox>
    );
};

export default observer(SettingsDialog);
