import css from "./ToolButton.module.css";
import Symbol from "../../common/Symbol";

interface IButtonProps {
    text: string;
    id: string;
    symbol: string;
    disabled?: boolean;
    onClick?: () => void;
    style?: any;
}

const Button = ({ id, text, symbol = "build", disabled, onClick, style }: IButtonProps) => {
    return (
        <div className={css.toolButtonContainer} style={style}>
            <button disabled={disabled} onClick={onClick} className={css.button} id={id}>
                <Symbol name={symbol} size="20px" />
            </button>
            <div className={css.buttonText}>{text}</div>
        </div>
    );
};

export default Button;
