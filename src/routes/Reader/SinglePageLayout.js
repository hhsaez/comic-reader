import React, { useState } from "react";
import styled from "styled-components";
import Page from "./Page";

const SPageContainer = styled.div`
  // width: 100%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
`;

export default function SinglePageLayout(props) {
  const { id, chapter, pageCount } = props;

  const [currentPage, setCurrentPage] = useState(0);

  return (
    <SPageContainer>
      <Page key={currentPage} id={id} chapter={chapter} index={currentPage + 1} />
    </SPageContainer>
  );
}

