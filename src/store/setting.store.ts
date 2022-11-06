import { makeAutoObservable } from "mobx";
import { accents } from "../theme";

class settingStore {
    constructor() {
        makeAutoObservable(this);
    }

    accentColor: keyof typeof accents = "green";
    setAccentColor = (color: keyof typeof accents) => (this.accentColor = color);

    settingsDialogVisible = false;
    showSettingsDialog = () => (this.settingsDialogVisible = true);
    hideSettingsDialog = () => (this.settingsDialogVisible = false);
}

export default settingStore;
