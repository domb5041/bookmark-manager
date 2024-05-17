import { observer } from "mobx-react";
import { useStores } from "../store";
import DialogBox from "./common/DialogBox";
import ThemeThumbnail from "./ThemeThumbnail";
import css from "./SettingsDialog.module.css";
import classNames from "classnames";

const SettingsDialog = () => {
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
            <div className={css.themes}>
                <ThemeThumbnail themeSetting="light" />
                <ThemeThumbnail themeSetting="dark" />
                <ThemeThumbnail themeSetting="auto" />
            </div>
            <label>Accent Colour</label>
            <div className={css.colors}>
                {settingStore.accents.map((color, i) => (
                    <div
                        data-accent={color}
                        onClick={() => settingStore.setAccentColor(color)}
                        key={i}
                        className={classNames(css.color, { [css.active]: color === settingStore.accentColor })}
                    />
                ))}
            </div>
        </DialogBox>
    );
};

export default observer(SettingsDialog);
