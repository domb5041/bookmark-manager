import classNames from "classnames";

interface SymbolPropTypes {
    name: string;
    size?: string;
    color?: string;
    className?: string;
    style?: any;
}

const Symbol = ({ name, size = "24px", color = "inherit", style, className }: SymbolPropTypes) => {
    return (
        <span
            className={classNames("material-symbols-outlined", className)}
            style={{ ...style, color: color, fontSize: size }}
        >
            {name}
        </span>
    );
};

export default Symbol;
