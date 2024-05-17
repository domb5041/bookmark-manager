import { useEffect } from "react";
import EditBookmark from "./components/EditBookmark";
import Sidebar from "./components/sidebar/Sidebar";
import Toolbar from "./components/Toolbar";
import Bookmarks from "./components/Bookmarks";
import { useStores } from "./store";
import { db } from "./firebase-config";
import { collection, getDocs, onSnapshot, addDoc, writeBatch, doc } from "@firebase/firestore";
import AddBookmark from "./components/AddBookmark";
import DeleteBookmark from "./components/DeleteBookmark";
import { IBookmark } from "./store/bookmark.store";
import { ITag } from "./store/tag.store";
import PreviewPane from "./components/PreviewPane";
import { observer } from "mobx-react";
import css from "./App.module.css";

export const bookmarksCollectionRef = collection(db, "bookmarks");
export const tagsCollectionRef = collection(db, "tags");

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

    const batch = writeBatch(db);

    useEffect(() => {
        if (bookmarkStore.bookmarks.length === 0) return;
        const getTags = async () => {
            // inital fetch of tags data
            const data = await getDocs(tagsCollectionRef);
            const dataMap = data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as ITag[];

            // search bookmarks for all tag and add any missing ones
            const flattenedTags = bookmarkStore.bookmarks.map((b) => b.tags).flat();
            const bookmarkTagSet = [...new Set(flattenedTags)];
            bookmarkTagSet.forEach(async (bookmarkTag) => {
                const tagExists = dataMap.findIndex((tag) => tag.name === bookmarkTag) > -1;
                if (tagExists) return;
                const newTag = {
                    name: bookmarkTag,
                    icon: "tag",
                    count: 1
                };
                await addDoc(tagsCollectionRef, newTag);
            });

            tagStore.updateTagSet(dataMap);

            // update counts and remove 0 counts
            tagStore.tagSet.forEach((tag) => {
                const tagDoc = doc(db, "tags", tag.id);
                const count = tagStore.getCount(tag.name);
                if (count > 0) {
                    batch.update(tagDoc, { count: count });
                } else {
                    batch.delete(tagDoc);
                }
            });
            await batch.commit();
        };
        getTags();

        const unsubscribeTags = onSnapshot(tagsCollectionRef, (snapshot) => {
            const snapshotMap = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as ITag[];
            tagStore.updateTagSet(snapshotMap);
        });

        return () => {
            unsubscribeTags();
        };
    }, [tagStore, bookmarkStore.bookmarks]);

    // detect whether system is in dark/light mode
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

    // apply app dark/light theme
    useEffect(() => {
        const { themeSetting, themeAuto } = settingStore;
        if (themeSetting === "light" || themeSetting === "dark") {
            document.documentElement.setAttribute("data-theme", themeSetting);
        } else if (themeSetting === "auto") {
            document.documentElement.setAttribute("data-theme", themeAuto);
        }
    }, [settingStore, settingStore.themeAuto, settingStore.themeSetting]);

    useEffect(() => {
        document.documentElement.setAttribute("data-accent", settingStore.accentColor);
    }, [settingStore.accentColor]);

    return (
        <div className={css.appContainer} id="app-container">
            <Sidebar />
            <div className={css.mainArea} id="container-right">
                <Toolbar />
                <EditBookmark />
                <AddBookmark />
                <DeleteBookmark />
                <Bookmarks />
            </div>
            <PreviewPane />
        </div>
    );
}

export default observer(App);
