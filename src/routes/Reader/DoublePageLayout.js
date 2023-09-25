import React, { useState } from "react";
import styled from "styled-components";
import Page from "./Page";
import { PageNavigationOverlay } from "../../components/PageNavigationOverlay";

const SPagesContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  overflow: auto;
`;

const SContainer = styled.div`
  display: flex;
  position: relative; // So the interaction area is relative to this container
  flex-direction: column;
  flex-grow: 1;
  overflow: auto;
`;

export default function DoublePageLayout(props) {
  const { id, chapter, pageCount } = props;

  const [currentPage, setCurrentPage] = useState(-1);

  return (
    <SContainer>
      <SPagesContainer>
        <Page key={currentPage} id={id} chapter={chapter} index={currentPage + 1} />
        <Page key={currentPage + 1} id={id} chapter={chapter} index={currentPage + 2} />
      </SPagesContainer>
      <PageNavigationOverlay setCurrentPage={setCurrentPage} pageCount={pageCount - 1} advance={2} />
    </SContainer>
  );
}

