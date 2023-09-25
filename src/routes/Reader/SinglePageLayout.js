import React, { useState } from "react";
import styled from "styled-components";
import Page from "./Page";
import { PageNavigationOverlay } from "../../components/PageNavigationOverlay";


const SPageContainer = styled.div`
  display: flex;
  position: relative; // So the interaction area is relative to this container
  flex-direction: column;
  flex-grow: 1;
  overflow: auto;
`;

export default function SinglePageLayout(props) {
  const { id, chapter, pageCount } = props;

  const [currentPage, setCurrentPage] = useState(0);

  return (
    <SPageContainer>
      <Page key={currentPage} id={id} chapter={chapter} index={currentPage + 1} />
      <PageNavigationOverlay setCurrentPage={setCurrentPage} pageCount={pageCount - 1} advance={1} />
    </SPageContainer>
  );
}

