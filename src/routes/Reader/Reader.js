import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Pages = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
`;

const PagesContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function pad(num, places) {
  return String(num).padStart(places, '0');
}

function Page(props) {
  const { id, chapter, index } = props;
  const src = process.env.PUBLIC_URL + `/${id}/${pad(chapter, 2)}/${pad(index, 4)}.png`;
  return (<div><img src={src} style={{ width: "auto", height: "80vh" }} alt={`${id}_${index}`} /></div>);
}

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
  const { title, onSidebarOpenChanged } = props;
  const openSidebar = useCallback(() => {
    onSidebarOpenChanged && onSidebarOpenChanged(true);
  }, [onSidebarOpenChanged]);

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
  const { isOpen, onOpenChanged } = props;

  const closeSidebar = useCallback(() => {
    onOpenChanged && onOpenChanged(false);
  }, [onOpenChanged]);

  if (!isOpen) {
    return null;
  }

  return (
    <SidebarContainer style={{ width: !isOpen ? 0 : undefined }}>
      <button onClick={closeSidebar}>Close Sidebar</button>
      <Link to="/library"><div>Back To Library</div></Link>
    </SidebarContainer>
  );
}

const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 100vw;
    height: 100vh;
    background-color: darkgray;
`;

const Content = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

export default function Reader() {

  const data = { id: "jagerlied", name: "Jägerlied", chapter: 0, pageCount: 16 };
  const { id, name, chapter, pageCount } = data;

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const pages = new Array(pageCount).fill().map((_, pageIndex) => {
    return <Page id={id} chapter={chapter} index={pageIndex + 1} />;
  });

  return (
    <Container>
      <Sidebar isOpen={sidebarOpen} onOpenChanged={setSidebarOpen} />
      <Content>
        <Header title={name} onSidebarOpenChanged={setSidebarOpen} />
        <PagesContainer>
          <Pages>
            {pages}
          </Pages>
        </PagesContainer>
      </Content>
    </Container>);
}

