import React, { useContext } from "react";
import styled from "styled-components";
import Page from "./Page";
import { ReaderContext } from "./ReaderContext";
import useWindowDimensions from "../../hooks/useWindowDimensions";

const SPageContainer = styled.div`
  display: flex;
  position: relative; // So the interaction area is relative to this container
  flex-direction: column;
  flex-grow: 1;
  overflow: auto;
`;

export default function SinglePageLayout() {
  const {
    context: {
      info: {
        id, chapter
      },
      currentPage,
      imageSizing,
    }
  } = useContext(ReaderContext);

  const { width, height } = useWindowDimensions();

  return (
    <SPageContainer>
      <Page
        key={currentPage}
        id={id} chapter={chapter}
        index={currentPage + 1}
        style={{
          width,
          height: imageSizing === "fit-page" ? height : undefined
        }}
      />
    </SPageContainer>
  );
}

