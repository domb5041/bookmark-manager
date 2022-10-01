import React, { useEffect } from "react";
import styled from "styled-components";
import EditBookmark from "./components/EditBookmark";
import Sidebar from "./components/Sidebar";
import Toolbar from "./components/Toolbar";
import Bookmarks from "./components/Bookmarks";
import { useStores } from "./store";
import { db } from "./firebase-config";
import { collection, getDocs, onSnapshot } from "@firebase/firestore";
import AddBookmark from "./components/AddBookmark";
import DeleteBookmark from "./components/DeleteBookmark";
import { IBookmark, ITag } from "./store/bookmark.store";

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
    const { bookmarkStore } = useStores();

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
            bookmarkStore.updateTagSet(dataMap);
        };
        getTags();

        const unsubscribeTags = onSnapshot(tagsCollectionRef, (snapshot) => {
            const snapshotMap = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as ITag[];
            bookmarkStore.updateTagSet(snapshotMap);
        });

        return () => {
            unsubscribeTags();
        };
    }, [bookmarkStore]);

    return (
        <Container id="app-container">
            <Sidebar />
            <MainArea id="container-right">
                <Toolbar />
                <EditBookmark />
                <AddBookmark />
                <DeleteBookmark />
                <Bookmarks />
            </MainArea>
        </Container>
    );
}

export default App;
