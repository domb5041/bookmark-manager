import { observer } from "mobx-react";
import { useStores } from "../store";
import css from "./ThemeThumbnail.module.css";
import classNames from "classnames";

const ThemeThumbnail = ({ themeSetting }: IThemeThumbnailProps) => {
    const { settingStore } = useStores();
    const themeToApply = themeSetting === "auto" ? settingStore.themeAuto : themeSetting;
    return (
        <div
            className={css.themeContainer}
            onClick={() => settingStore.setThemeSetting(themeSetting)}
            data-theme={themeToApply}
        >
            <div className={classNames(css.thumbnail, { [css.active]: settingStore.themeSetting === themeSetting })}>
                <div className={css.sidebar}>
                    <div className={classNames(css.row, css.accent)} />
                </div>
                <div className={css.mainArea}>
                    <div className={css.row} />
                    <div className={css.row} />
                    <div className={classNames(css.row, css.accent)} />
                    <div className={css.row} />
                </div>
            </div>
            {themeSetting}
        </div>
    );
};

interface IThemeThumbnailProps {
    themeSetting: "light" | "dark" | "auto";
}

export default observer(ThemeThumbnail);
