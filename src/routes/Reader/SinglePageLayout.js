import React, { useContext } from "react";
import styled from "styled-components";
import Page from "./Page";
import { ReaderContext } from "./ReaderContext";


const SPageContainer = styled.div`
  display: flex;
  position: relative; // So the interaction area is relative to this container
  flex-direction: column;
  flex-grow: 1;
  overflow: auto;
`;

export default function SinglePageLayout(props) {
  const {
    context: {
      info: {
        id, chapter
      },
      currentPage,
    }
  } = useContext(ReaderContext);

  return (
    <SPageContainer>
      <Page key={currentPage} id={id} chapter={chapter} index={currentPage + 1} />
    </SPageContainer>
  );
}

