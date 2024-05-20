import Symbol from "../../common/Symbol";
import css from "./MiniButton.module.css";
import classNames from "classnames";

interface IButtonProps {
    id: string;
    symbol: string;
    onClick: () => void;
    style?: any;
    disabled?: boolean;
    className?: string;
}

const MiniButton = ({ symbol, onClick, style, id, disabled = false, className }: IButtonProps) => {
    return (
        <button
            id={id}
            onClick={onClick}
            style={style}
            disabled={disabled}
            className={classNames(className, css.miniButton)}
        >
            <Symbol name={symbol} size="18px" />
        </button>
    );
};

export default MiniButton;
