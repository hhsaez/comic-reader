import React, { useContext, useState } from "react";
import styled from "styled-components";
import LongStripPageLayout from "./LongStripPageLayout";
import { ReaderContext } from "./ReaderContext";
import SinglePageLayout from "./SinglePageLayout";
import DoublePageLayout from "./DoublePageLayout";
import "material-symbols";
import { PageNavigationOverlay } from "../../components/PageNavigationOverlay";
import { useLoaderData } from "react-router";
import getAllComics from "../../utils/getAllComics";

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

export default function ReaderWithContext(params) {
  const { id, chapter } = useLoaderData();
  const comics = getAllComics();
  const { title, subtitle, chapters, hasZeroChapter } = comics[id];

  const [context, setContext] = useState({
    info: {
      id,
      title,
      subtitle,
      chapter,
      pageCount: chapters[hasZeroChapter ? chapter : chapter - 1].pageCount,
    },
    currentPage: 0,
    layout: "single-page",
    imageSizing: "fit-page",
    showOverlay: true,
  });

  return (
    <ReaderContext.Provider value={{ context, setContext }}>
      <Reader />
    </ReaderContext.Provider>
  );
}

