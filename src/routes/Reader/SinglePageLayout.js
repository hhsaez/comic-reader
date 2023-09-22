import React, { useState } from "react";
import styled from "styled-components";
import Page from "./Page";

const PageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function SinglePageLayout(props) {
  const { id, chapter, pageCount } = props;

  const [currentPage, setCurrentPage] = useState(0);

  return (
    <PageContainer>
      <Page key={currentPage} id={id} chapter={chapter} index={currentPage + 1} />
    </PageContainer>
  );
}

