import Symbol from "../../common/Symbol";
import css from "./MiniButton.module.css";
import classNames from "classnames";
import LoadingWheel from "../LoadingWheel";

interface IButtonProps {
    id: string;
    symbol: string;
    onClick: () => void;
    style?: any;
    disabled?: boolean;
    className?: string;
    loading?: boolean;
}

const MiniButton = ({ symbol, onClick, style, id, disabled = false, className, loading = false }: IButtonProps) => {
    return (
        <button
            id={id}
            onClick={onClick}
            style={style}
            disabled={disabled || loading}
            className={classNames(className, css.miniButton)}
        >
            {!loading && <Symbol name={symbol} size="18px" className={css.buttonSymbol} />}
            <LoadingWheel isVisible={loading} size={18} background="none" color="minimal" />
        </button>
    );
};

export default MiniButton;
