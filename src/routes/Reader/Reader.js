import React, { createContext, useCallback, useContext, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import LongStripPageLayout from "./LongStripPageLayout";
import { ReaderContext } from "./ReaderContext";
import SinglePageLayout from "./SinglePageLayout";
import DoublePageLayout from "./DoublePageLayout";

const HeaderContainer = styled.div`
    width: 100%;
    height: 80px;
    background-color: lightgray;
    color: white;

    h1 {
      display: inline;
    }

    button { 
      display: inline;
    }
`;

function Header(props) {
  const { title } = props;

  const { setContext } = useContext(ReaderContext);

  const openSidebar = useCallback(() => {
    setContext((prev) => ({
      ...prev,
      sidebar: {
        ...prev.sidebar,
        open: true,
      }
    }));
  }, [setContext]);

  return (
    <HeaderContainer>
      <button onClick={openSidebar}>M</button>
      <h1>{title}</h1>
    </HeaderContainer>
  );
}

const SidebarContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 20%;
    height: 100vh;
    background-color: gray;
`;

function Sidebar(props) {
  const { context, setContext } = useContext(ReaderContext);

  const closeSidebar = useCallback(() => {
    setContext((prev) => ({
      ...prev,
      sidebar: {
        ...prev.sidebar,
        open: false,
      }
    }));
  }, [setContext]);

  const setSinglePageLayout = useCallback(() => {
    setContext((prev) => ({
      ...prev,
      layout: "single-page",
    }));
  }, [setContext]);

  const setDoublePageLayout = useCallback(() => {
    setContext((prev) => ({
      ...prev,
      layout: "double-page",
    }));
  }, [setContext]);

  const setLongStripPageLayout = useCallback(() => {
    setContext((prev) => ({
      ...prev,
      layout: "long-strip",
    }));
  }, [setContext]);

  if (!context.sidebar.open) {
    return null;
  }

  return (
    <SidebarContainer style={{ width: !context.sidebar.open ? 0 : undefined }}>
      <button onClick={closeSidebar}>Close Sidebar</button>
      <button onClick={setSinglePageLayout}>Single Page</button>
      <button onClick={setDoublePageLayout}>Double Page</button>
      <button onClick={setLongStripPageLayout}>Long Strip</button>
      <Link to="/library"><div>Back To Library</div></Link>
    </SidebarContainer>
  );
}

const Container = styled.div`
    display: flex;
    flex-direction: row;
    // width: 100vw;
    // height: 100vh;
    flex-grow: 1;
    background-color: darkgray;
`;

const Content = styled.div`
    // width: 100%;
    // height: 100%;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`;

export default function Reader() {
  const [context, setContext] = useState({
    sidebar: {
      open: true,
    },
    layout: "double-page",// "single-page",
  });

  const data = { id: "jagerlied", name: "Jägerlied", chapter: 0, pageCount: 16 };
  const { id, name, chapter, pageCount } = data;

  let Layout = SinglePageLayout;
  if (context.layout === "double-page") {
    Layout = DoublePageLayout;
  } else if (context.layout === "long-strip") {
    Layout = LongStripPageLayout;
  }

  return (
    <ReaderContext.Provider value={{ context, setContext }}>
      <Container>
        <Sidebar />
        <Content>
          <Header title={name} />
          <Layout id={id} chapter={chapter} pageCount={pageCount} />
        </Content>
      </Container>
    </ReaderContext.Provider>
  );
}

