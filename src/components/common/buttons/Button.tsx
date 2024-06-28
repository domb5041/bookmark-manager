import Symbol from "../../common/Symbol";
import css from "./Button.module.css";
import LoadingWheel from "../LoadingWheel";
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
    loading?: boolean;
}

const Button = ({
    id,
    text,
    symbol,
    disabled,
    onClick,
    style,
    className,
    styleType = "default",
    loading = false
}: IButtonProps) => {
    return (
        <button
            id={id}
            disabled={disabled || loading}
            onClick={onClick}
            style={style}
            className={classNames(className, css.button, css[styleType])}
        >
            {text && <span className={css.buttonText}>{text}</span>}
            {(symbol || loading) && (
                <div className={css.buttonIcon}>
                    {!loading && <Symbol name={symbol} size="22px" />}
                    <LoadingWheel isVisible={loading} size={20} background="none" color={styleType} />
                </div>
            )}
        </button>
    );
};

export default Button;
