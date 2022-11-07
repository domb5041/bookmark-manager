import { makeAutoObservable } from "mobx";
import { accents } from "../theme";
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

    themeSetting = "auto";
    setThemeSetting = (setting: "light" | "dark" | "auto") => (this.themeSetting = setting);

    themeAuto: "light" | "dark" = "light";
    setThemeAuto = (setting: "light" | "dark") => (this.themeAuto = setting);

    themeActual: "light" | "dark" = this.themeAuto;
    setThemeActual = (setting: "light" | "dark") => (this.themeActual = setting);

    accentColor: keyof typeof accents = "green";
    setAccentColor = (color: keyof typeof accents) => (this.accentColor = color);

    settingsDialogVisible = false;
    showSettingsDialog = () => (this.settingsDialogVisible = true);
    hideSettingsDialog = () => (this.settingsDialogVisible = false);
}

export default settingStore;
