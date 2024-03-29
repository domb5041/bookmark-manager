import React, { useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import EditBookmark from "./components/EditBookmark";
import Sidebar from "./components/sidebar/Sidebar";
import Toolbar from "./components/Toolbar";
import Bookmarks from "./components/Bookmarks";
import { useStores } from "./store";
import { db } from "./firebase-config";
import { collection, getDocs, onSnapshot } from "@firebase/firestore";
import AddBookmark from "./components/AddBookmark";
import DeleteBookmark from "./components/DeleteBookmark";
import { IBookmark } from "./store/bookmark.store";
import { ITag } from "./store/tag.store";
import PreviewPane from "./components/PreviewPane";
import { theme } from "./theme";
import { GlobalStyles } from "./index.styled";
import { observer } from "mobx-react";

export const bookmarksCollectionRef = collection(db, "bookmarks");
export const tagsCollectionRef = collection(db, "tags");

const Container = styled.div`
    display: flex;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    overflow: hidden;
`;

const MainArea = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
`;

function App() {
    const { bookmarkStore, tagStore, settingStore } = useStores();

    useEffect(() => {
        const getBookmarks = async () => {
            const data = await getDocs(bookmarksCollectionRef);
            const dataMap = data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as IBookmark[];
            bookmarkStore.setBookmarks(dataMap);
        };
        getBookmarks();

        const unsubscribeBookmarks = onSnapshot(bookmarksCollectionRef, (snapshot) => {
            const snapshotMap = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as IBookmark[];
            bookmarkStore.setBookmarks(snapshotMap);
        });

        return () => {
            unsubscribeBookmarks();
        };
    }, [bookmarkStore]);

    useEffect(() => {
        const getTags = async () => {
            const data = await getDocs(tagsCollectionRef);
            const dataMap = data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as ITag[];
            tagStore.updateTagSet(dataMap);
        };
        getTags();

        const unsubscribeTags = onSnapshot(tagsCollectionRef, (snapshot) => {
            const snapshotMap = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as ITag[];
            tagStore.updateTagSet(snapshotMap);
        });

        return () => {
            unsubscribeTags();
        };
    }, [tagStore]);

    useEffect(() => {
        const browserColorScheme = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)");
        const changeDarkmode = (e: MediaQueryListEvent | MediaQueryList) =>
            settingStore.setThemeAuto(e.matches ? "dark" : "light");
        changeDarkmode(browserColorScheme);
        browserColorScheme.addEventListener("change", changeDarkmode);
        return () => {
            browserColorScheme.removeEventListener("change", changeDarkmode);
        };
    }, [settingStore]);

    useEffect(() => {
        const { themeSetting, themeAuto, setThemeActual } = settingStore;
        if (themeSetting === "light" || themeSetting === "dark") setThemeActual(themeSetting);
        else if (themeSetting === "auto") setThemeActual(themeAuto);
    }, [settingStore, settingStore.themeAuto, settingStore.themeSetting]);

    return (
        <ThemeProvider theme={theme(settingStore.themeActual, settingStore.accentColor)}>
            <GlobalStyles />
            <Container id="app-container">
                <Sidebar />
                <MainArea id="container-right">
                    <Toolbar />
                    <EditBookmark />
                    <AddBookmark />
                    <DeleteBookmark />
                    <Bookmarks />
                </MainArea>
                <PreviewPane />
            </Container>
        </ThemeProvider>
    );
}

export default observer(App);
