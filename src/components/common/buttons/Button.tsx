import Symbol from "../../common/Symbol";
import css from "./Button.module.css";
import classNames from "classnames";

interface IButtonProps {
    text?: string;
    id: string;
    symbol?: string;
    disabled?: boolean;
    onClick?: () => void;
    style?: any;
    className?: string;
    styleType?: "default" | "primary" | "secondary" | "minimal";
}

const Button = ({ id, text, symbol, disabled, onClick, style, className, styleType = "default" }: IButtonProps) => {
    return (
        <button
            id={id}
            disabled={disabled}
            onClick={onClick}
            style={style}
            className={classNames(className, css.button, css[styleType], {
                [css.withText]: text,
                [css.withIcon]: symbol
            })}
        >
            {text && <span className={css.buttonText}>{text}</span>}
            {symbol && <Symbol className={css.buttonIcon} name={symbol} size="22px" />}
        </button>
    );
};

export default Button;
