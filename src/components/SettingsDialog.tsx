import { observer } from "mobx-react";
import React, { FC } from "react";
import styled from "styled-components";
import { useStores } from "../store";
import { accents } from "../theme";
import DialogBox from "./common/DialogBox";
import { SwatchSelect } from "./EditTag";

const Colors = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Color = styled.div<{ color: keyof typeof accents }>`
    background-color: ${(props) => accents[props.color]};
    width: 30px;
    height: 30px;
    border-radius: 100%;
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
            confirmButton={{
                text: "update",
                id: "edit-tag-confirm",
                onClick: () => {
                    console.log("X");
                }
            }}
        >
            {/* <label>Appearance</label> */}
            <label>Accent Colour</label>
            <Colors>
                {Object.keys(accents).map((color) => (
                    <SwatchSelect active={color === settingStore.accentColor}>
                        <Color
                            color={color as keyof typeof accents}
                            onClick={() => settingStore.setAccentColor(color as keyof typeof accents)}
                        />
                    </SwatchSelect>
                ))}
            </Colors>
        </DialogBox>
    );
};

export default observer(SettingsDialog);
