import { observer } from "mobx-react";
import React, { FC } from "react";
import styled, { ThemeProvider } from "styled-components";
import { useStores } from "../store";
import { theme } from "../theme";

const Container = styled.div`
    flex: 1;
    text-align: center;
    font-size: 12px;
    text-transform: capitalize;
`;

const Thumbnail = styled.div<{ active: boolean }>`
    border: 2px solid ${(props) => (props.active ? props.theme.color.accent.primary : props.theme.color.border.light)};
    height: 70px;
    border-radius: 7px;
    cursor: pointer;
    display: flex;
    overflow: hidden;
`;

const Sidebar = styled.div`
    border-right: 1px solid ${(props) => props.theme.color.border.light};
    background-color: ${(props) => props.theme.color.background.surface};
    width: 25px;
    padding: 6px 3px;
`;

const Row = styled.div<{ accent?: boolean }>`
    height: 6px;
    margin-bottom: 6px;
    background-color: ${(props) =>
        props.accent ? props.theme.color.accent.primary : props.theme.color.background.surface};
    border-radius: 2px;
`;

const MainArea = styled.div`
    background-color: ${(props) => props.theme.color.background.void};
    padding: 10px 3px;
    flex: 1;
`;

const ThemeThumbnail: FC<IThemeThumbnailProps> = ({ themeSetting }) => {
    const { settingStore } = useStores();
    const themeToApply = themeSetting === "auto" ? settingStore.themeAuto : themeSetting;
    return (
        <Container onClick={() => settingStore.setThemeSetting(themeSetting)}>
            <ThemeProvider theme={theme(themeToApply, settingStore.accentColor)}>
                <Thumbnail active={settingStore.themeSetting === themeSetting}>
                    <Sidebar>
                        <Row accent />
                    </Sidebar>
                    <MainArea>
                        <Row />
                        <Row />
                        <Row accent />
                        <Row />
                    </MainArea>
                </Thumbnail>
            </ThemeProvider>
            {themeSetting}
        </Container>
    );
};

interface IThemeThumbnailProps {
    themeSetting: "light" | "dark" | "auto";
}

export default observer(ThemeThumbnail);
