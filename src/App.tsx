import React from "react";
import styled from "styled-components";
import EditTags from "./components/EditTags";
import Sidebar from "./components/Sidebar";
import Toolbar from "./components/Toolbar";
import Bookmarks from "./components/Bookmarks";

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
`;

function App() {
    return (
        <Container id='app-container'>
            <Sidebar />
            <MainArea id='container-right'>
                <Toolbar />
                <EditTags />
                <Bookmarks />
            </MainArea>
        </Container>
    );
}

export default App;
