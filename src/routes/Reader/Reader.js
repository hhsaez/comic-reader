import React, { useContext, useState } from "react";
import styled from "styled-components";
import LongStripPageLayout from "./LongStripPageLayout";
import { ReaderContext } from "./ReaderContext";
import SinglePageLayout from "./SinglePageLayout";
import DoublePageLayout from "./DoublePageLayout";
import "material-symbols";
import { PageNavigationOverlay } from "../../components/PageNavigationOverlay";

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

function Reader() {
  const {
    context: {
      info: {
        id,
        chapter,
        pageCount
      },
      layout
    }
  } = useContext(ReaderContext);

  let Layout = SinglePageLayout;
  if (layout === "double-page") {
    Layout = DoublePageLayout;
  } else if (layout === "long-strip") {
    Layout = LongStripPageLayout;
  }

  return (
    <Container>
      <SContent>
        <Layout id={id} chapter={chapter} pageCount={pageCount} style={{ flexGrow: 10 }} />
        <PageNavigationOverlay />
      </SContent>
    </Container>
  );
}

export default function ReaderWithContext() {
  const [context, setContext] = useState({
    info: {
      id: "jagerlied",
      title: "Jägerlied",
      subtitle: "Obertura",
      chapter: 0,
      pageCount: 16,
    },
    currentPage: 0,
    layout: "single-page",
    // layout: "double-page",
    // layout: "long-strip",
    imageSizing: "fit-page",
    // imageSizing: "fit-width",
    // overlayVisible: true,
  });

  return (
    <ReaderContext.Provider value={{ context, setContext }}>
      <Reader />
    </ReaderContext.Provider>
  );
}

