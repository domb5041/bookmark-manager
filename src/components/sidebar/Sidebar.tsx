import { useRef } from "react";
import { useStores } from "../../store";
import { observer } from "mobx-react";
import { CSSTransition } from "react-transition-group";
import ToolbarButton from "../common/buttons/ToolButton";
import ScrollContainer from "../common/ScrollContainer";
import css from "./Sidebar.module.css";
import SidebarTags from "./SidebarTags";
import { useMediaQuery } from "react-responsive";

const Sidebar = () => {
    const { tagStore, settingStore } = useStores();

    const nodeRef = useRef(null);

    const enoughSpace = useMediaQuery({
        query: `(min-width: 800px)`
    });

    return (
        <CSSTransition
            nodeRef={nodeRef}
            in={tagStore.sidebarVisible && enoughSpace}
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
                        text="settings"
                        symbol="settings"
                        onClick={settingStore.showSettingsDialog}
                        id="settings-button"
                    />
                </div>
                <ScrollContainer style={{ padding: 5 }} borderBottom={false}>
                    <SidebarTags />
                </ScrollContainer>
            </div>
        </CSSTransition>
    );
};

export default observer(Sidebar);
