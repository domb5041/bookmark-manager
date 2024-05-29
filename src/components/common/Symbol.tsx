import classNames from "classnames";

interface SymbolPropTypes {
    name?: string;
    size?: string;
    className?: string;
    style?: any;
}

const Symbol = ({ name = "close", size = "24px", style, className }: SymbolPropTypes) => {
    return (
        <span className={classNames("material-symbols-outlined", className)} style={{ ...style, fontSize: size }}>
            {name}
        </span>
    );
};

export default Symbol;
