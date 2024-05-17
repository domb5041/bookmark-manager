import Symbol from "../../common/Symbol";
import css from "./TabButton.module.css";
import classNames from "classnames";

interface ITabButtonProps {
    label: string;
    style?: any;
    activeListener: string;
    buttons: {
        icon: string;
        onClick: () => void;
        id: string;
        activeId: string;
    }[];
}

const TabButton = ({ label, style, buttons, activeListener }: ITabButtonProps) => {
    return (
        <div className={css.tabButtonContainer} style={style}>
            <div className={css.tabs}>
                {buttons.map((b, i) => (
                    <button
                        key={i}
                        onClick={b.onClick}
                        id={b.id}
                        className={classNames(css.tabButton, { [css.activeTab]: activeListener === b.activeId })}
                    >
                        <Symbol name={b.icon} size="19px" />
                    </button>
                ))}
            </div>
            <div className={css.buttonText}>{label}</div>
        </div>
    );
};

export default TabButton;
