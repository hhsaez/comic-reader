import React, { useContext } from "react";
import styled from "styled-components";
import Page from "./Page";
import { ReaderContext } from "./ReaderContext";

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
  const {
    context: {
      info: {
        id, chapter
      },
      currentPage,
    }
  } = useContext(ReaderContext);

  // Left page is always the even one.
  const firstPage = currentPage % 2 === 0 ? currentPage : currentPage - 1;

  return (
    <SContainer>
      <SPagesContainer>
        <Page key={firstPage - 1} id={id} chapter={chapter} index={firstPage} />
        <Page key={firstPage} id={id} chapter={chapter} index={firstPage + 1} />
      </SPagesContainer>
    </SContainer>
  );
}

