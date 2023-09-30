import React, { useContext } from "react";
import styled from "styled-components";
import Page from "./Page";
import { ReaderContext } from "./ReaderContext";

const Pages = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const PagesContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overscroll-behavior: none;
  overflow-y: scroll;
`;

export default function LongStripPageLayout(props) {
  const { id, chapter, pageCount } = props;

  const { context: { imageSizing } } = useContext(ReaderContext);

  const pages = new Array(pageCount).fill().map((_, pageIndex) => {
    return <Page
      key={pageIndex}
      id={id}
      chapter={chapter}
      index={pageIndex + 1}
      style={{
        margin: 5,
        width: "100%",
        height: imageSizing === "fit-page" ? "100%" : undefined,
        // width: imageSizing === "fit-width" ? "100%" : undefined,
      }} />;
  });

  return (
    <PagesContainer>
      <Pages>
        {pages}
      </Pages>
    </PagesContainer>
  );
}

