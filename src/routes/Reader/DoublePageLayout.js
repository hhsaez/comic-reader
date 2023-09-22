import React, { useState } from "react";
import styled from "styled-components";
import Page from "./Page";

const Pages = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const PagesContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function DoublePageLayout(props) {
  const { id, chapter, pageCount } = props;

  const [currentPage, setCurrentPage] = useState(0);

  return (
    <PagesContainer>
      <Pages>
        <Page key={currentPage} id={id} chapter={chapter} index={currentPage + 1} />
        <Page key={currentPage + 1} id={id} chapter={chapter} index={currentPage + 2} />
      </Pages>
    </PagesContainer>
  );
}

