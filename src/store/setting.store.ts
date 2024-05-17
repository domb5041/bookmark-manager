import { makeAutoObservable } from "mobx";
import { makePersistable } from "mobx-persist-store";

class settingStore {
    constructor() {
        makeAutoObservable(this);
        makePersistable(this, {
            name: "settingStore",
            properties: ["themeSetting", "accentColor"],
            storage: window.localStorage,
            debugMode: false
        });
    }
    accents = ["blue", "purple", "pink", "red", "orange", "yellow", "green"] as const;

    themeSetting = "auto";
    setThemeSetting = (setting: "light" | "dark" | "auto") => (this.themeSetting = setting);

    themeAuto: "light" | "dark" = "light";
    setThemeAuto = (setting: "light" | "dark") => (this.themeAuto = setting);

    accentColor: (typeof this.accents)[number] = this.accents[0];
    setAccentColor = (color: (typeof this.accents)[number]) => (this.accentColor = color);
    settingsDialogVisible = false;
    showSettingsDialog = () => (this.settingsDialogVisible = true);
    hideSettingsDialog = () => (this.settingsDialogVisible = false);
}

export default settingStore;
