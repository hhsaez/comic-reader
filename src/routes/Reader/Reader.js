import React, { useCallback, useContext, useState } from "react";
import styled from "styled-components";
import LongStripPageLayout from "./LongStripPageLayout";
import { ReaderContext } from "./ReaderContext";
import SinglePageLayout from "./SinglePageLayout";
import DoublePageLayout from "./DoublePageLayout";
import "material-symbols";
import { Selector } from "../../components/Selector";
import { PageNavigationOverlay, TopBar } from "../../components/PageNavigationOverlay";

const HeaderContainer = styled.div`
  display: flex;
  flex-grow: 1;
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
      <h1><span className="material-symbols-outlined" onClick={openSidebar}>menu</span>{title}</h1>
    </HeaderContainer>
  );
}


const SidebarContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    width: 20%;
    min-width: 300px;
    height: 100%;
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

  const setPageLayout = useCallback((layout) => {
    setContext((prev) => ({
      ...prev,
      layout,
    }));
  }, [setContext]);

  if (!context.sidebar.open) {
    return null;
  }

  return (
    <SidebarContainer style={{ width: !context.sidebar.open ? 0 : undefined }}>
      <span className="material-symbols-outlined" onClick={closeSidebar}>close</span>

      <ul>
        <li><h1><span className="material-symbols-outlined">home</span>Home</h1></li>
        <li>
          <h1><span className="material-symbols-outlined">settings</span>Settings</h1>
          <ul>
            <li>
              <Selector title={"Page Layout"} value={context.layout} onChange={setPageLayout}>
                {[
                  { id: "single-page", icon: "note", name: "Single Page" },
                  { id: "double-page", icon: "import_contacts", name: "Double Page" },
                  { id: "long-strip", icon: "calendar_view_day", name: "Long Strip" },
                ]}
              </Selector>
            </li>
            <li>
              <Selector title={"Image Sizing"}>
                {[
                  { icon: "fit_width", name: "Fit Width" },
                  { icon: "fit_page", name: "Fit Page" },
                ]}
              </Selector>
            </li>
          </ul>
        </li>
      </ul>

      {/* <span className="material-symbols-outlined">expand</span>
      <span className="material-symbols-outlined">note</span>
      <span className="material-symbols-outlined">import_contacts</span>
      <span className="material-symbols-outlined">calendar_view_day</span>
      <span className="material-symbols-outlined">view_array</span>
      <span className="material-symbols-outlined">view_column_2</span>
      <span className="material-symbols-outlined">web_stories</span>
      <span className="material-symbols-outlined">grid_view</span>
      <span className="material-symbols-outlined">list</span>
      <span className="material-symbols-outlined">phone_iphone</span>
      <span className="material-symbols-outlined">computer</span>
      <span className="material-symbols-outlined">space_bar</span> */}
      {/* <button onClick={closeSidebar}>Close Sidebar</button>
      <button style={{ borderStyle: "inset" }} onClick={setSinglePageLayout}>Single Page</button>
      <button style={{ borderStyle: "outset" }} onClick={setDoublePageLayout}>Double Page</button>
      <button onClick={setLongStripPageLayout}>Long Strip</button>
      <Link to="/library"><div>Back To Library</div></Link> */}
    </SidebarContainer>
  );
}

const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 100vw;
    height: 100vh;
    flex-grow: 1;
    background-color: darkgray;
`;

const SContent = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`;

export default function Reader() {
  const [context, setContext] = useState({
    info: {
      id: "jagerlied",
      title: "Jägerlied",
      subtitle: "Obertura",
      chapter: 0,
      pageCount: 16,
    },
    sidebar: {
      open: true,
    },
    currentPage: 0,
    // layout: "single-page",
    // layout: "double-page",
    layout: "long-strip",
  });

  const { info: { id, chapter, pageCount } } = context;

  let Layout = SinglePageLayout;
  if (context.layout === "double-page") {
    Layout = DoublePageLayout;
  } else if (context.layout === "long-strip") {
    Layout = LongStripPageLayout;
  }

  return (
    <ReaderContext.Provider value={{ context, setContext }}>
      <Container>
        <SContent>
          <Layout id={id} chapter={chapter} pageCount={pageCount} style={{ flexGrow: 10 }} />
          <PageNavigationOverlay />
        </SContent>
      </Container>
    </ReaderContext.Provider>
  );
}

