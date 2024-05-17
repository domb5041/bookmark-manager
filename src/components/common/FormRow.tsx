import css from "./FormRow.module.css";

interface IFormRowProps {
    children: any;
    label?: string;
    style?: any;
}

const FormRow = ({ children, label, style }: IFormRowProps) => {
    return (
        <div className={css.formRow} style={style}>
            <div className={css.label}>{label}</div>
            <div className={css.content}>{children}</div>
            <div className={css.info}></div>
        </div>
    );
};

export default FormRow;
