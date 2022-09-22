import React, { useEffect } from "react";
import styled from "styled-components";
import EditTags from "./components/EditTags";
import Sidebar from "./components/Sidebar";
import Toolbar from "./components/Toolbar";
import Bookmarks from "./components/Bookmarks";
import { useStores } from "./store";
import { db } from "./firebase-config";
import { collection, getDocs, onSnapshot } from "@firebase/firestore";
import AddBookmark from "./components/AddBookmark";
import DeleteBookmark from "./components/DeleteBookmark";
import { IBookmark } from "./store/bookmark.store";

export const bookmarksCollectionRef = collection(db, "bookmarks");

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
    const { bookmarkStore } = useStores();

    // useEffect(() => {
    //     bookmarkStore.getBookmarkPreviews();
    // }, []);

    useEffect(() => {
        const getBookmarks = async () => {
            const data = await getDocs(bookmarksCollectionRef);
            const dataMap = data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as IBookmark[];
            bookmarkStore.setBookmarks(dataMap);
        };
        getBookmarks();

        const unsubscribe = onSnapshot(bookmarksCollectionRef, (snapshot) => {
            const snapshotMap = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as IBookmark[];
            bookmarkStore.setBookmarks(snapshotMap);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <Container id="app-container">
            <Sidebar />
            <MainArea id="container-right">
                <Toolbar />
                <EditTags />
                <AddBookmark />
                <DeleteBookmark />
                <Bookmarks />
            </MainArea>
        </Container>
    );
}

export default App;
