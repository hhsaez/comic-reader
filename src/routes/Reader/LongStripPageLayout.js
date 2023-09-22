import React from "react";
import styled from "styled-components";
import Page from "./Page";

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

export default function LongStripPageLayout(props) {
  const { id, chapter, pageCount } = props;

  const pages = new Array(pageCount).fill().map((_, pageIndex) => {
    return <Page key={pageIndex} id={id} chapter={chapter} index={pageIndex + 1} />;
  });

  return (
    <PagesContainer>
      <Pages>
        {pages}
      </Pages>
    </PagesContainer>
  );
}

