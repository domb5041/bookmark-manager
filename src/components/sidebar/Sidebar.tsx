import { useEffect, useRef } from "react";
import { useStores } from "../../store";
import { observer } from "mobx-react";
import EditTag from "../EditTag";
import DeleteTag from "../DeleteTag";
import { CSSTransition } from "react-transition-group";
import SidebarRow from "./SidebarRow";
import ToolbarButton from "../common/buttons/ToolButton";
import ScrollContainer from "../common/ScrollContainer";
import SettingsDialog from "../SettingsDialog";
import css from "./Sidebar.module.css";

const Sidebar = () => {
    const { bookmarkStore, tagStore, settingStore } = useStores();

    useEffect(() => {
        tagStore.updateTotalsCounts();
    }, [bookmarkStore.bookmarks, bookmarkStore]);

    const allItemsSelected = tagStore.activeFilter.name === tagStore.allItemsFilter.name;
    const taggedSelected = tagStore.activeFilter.name === tagStore.taggedItemsFilter.name;
    const untaggedSelected = tagStore.activeFilter.name === tagStore.untaggedItemsFilter.name;

    const nodeRef = useRef(null);

    return (
        <CSSTransition
            nodeRef={nodeRef}
            in={tagStore.sidebarVisible}
            unmountOnExit
            timeout={500}
            classNames={{
                enter: css.enter,
                enterActive: css.enterActive,
                exit: css.exit,
                exitActive: css.exitActive
            }}
        >
            <div className={css.sidebar} id="sidebar" ref={nodeRef}>
                <div className={css.sidebarToolbar}>
                    <ToolbarButton
                        text="profile"
                        symbol="account_circle"
                        onClick={() => {
                            console.log("profile button");
                        }}
                        id="profile-button"
                        style={{ marginRight: 20 }}
                    />
                    <ToolbarButton
                        text="settings"
                        symbol="settings"
                        onClick={settingStore.showSettingsDialog}
                        id="settings-button"
                    />
                </div>
                <EditTag />
                <DeleteTag />
                <SettingsDialog />
                <ScrollContainer style={{ padding: 5 }} borderBottom={false}>
                    <SidebarRow
                        active={allItemsSelected}
                        name="All Items"
                        icon="emergency"
                        count={tagStore.allItemsFilter.count}
                        onClick={() => tagStore.setActiveFilter(tagStore.allItemsFilter)}
                    />
                    {/* <SidebarRow
                    active={taggedSelected}
                    onClick={() => tagStore.setActiveFilter(tagStore.taggedItemsFilter)}
                    name="Tagged"
                    count={tagStore.taggedItemsFilter.count}
                /> */}
                    <SidebarRow
                        active={untaggedSelected}
                        onClick={() => tagStore.setActiveFilter(tagStore.untaggedItemsFilter)}
                        name="Untagged"
                        icon="question_mark"
                        count={tagStore.untaggedItemsFilter.count}
                        style={{ marginBottom: 10 }}
                    />
                    {tagStore.tagSet.map((tag, i) => (
                        <SidebarRow
                            color={tag.color}
                            icon={tag.icon}
                            active={tagStore.activeFilter.name === tag.name}
                            onClick={() => tagStore.setActiveFilter(tag)}
                            key={`${i}-${tag.name}`}
                            name={tag.name}
                            count={tag.count}
                            index={i}
                            allowEdit
                        />
                    ))}
                </ScrollContainer>
            </div>
        </CSSTransition>
    );
};

export default observer(Sidebar);
