import { useStores } from "../../store";
import Button from "../common/buttons/Button";
import Symbol from "../common/Symbol";
import css from "./SidebarRow.module.css";
import classNames from "classnames";

interface ISidebarRowProps {
    icon?: string;
    color?: string;
    active: boolean;
    count: number;
    onClick: () => void;
    name: string;
    style?: any;
    index?: number;
    allowEdit?: boolean;
}

const SidebarRow = ({ icon, active, count, onClick, name, style, index, allowEdit }: ISidebarRowProps) => {
    const { tagStore } = useStores();
    return (
        <div className={classNames(css.sidebarRow, { [css.active]: active })} onClick={onClick} style={style}>
            <div className={css.tagIcon}>
                <Symbol name={icon || "tag"} size="19px" />
            </div>
            <div className={css.tagName}>{name}</div>
            <div className={css.tagCount}>{count}</div>
            {allowEdit && (
                <Button
                    symbol="more_horiz"
                    onClick={tagStore.showEditTagDialog}
                    className={css.editTagButton}
                    id={`edit-tag-button-${index}`}
                    styleType="minimal"
                />
            )}
        </div>
    );
};

export default SidebarRow;
