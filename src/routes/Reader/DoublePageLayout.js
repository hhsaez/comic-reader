import React, { useContext } from "react";
import styled from "styled-components";
import Page from "./Page";
import { ReaderContext } from "./ReaderContext";
import useWindowDimensions from "../../hooks/useWindowDimensions";

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

export default function DoublePageLayout() {
  const {
    context: {
      info: {
        id, chapter, pageCount
      },
      currentPage,
    }
  } = useContext(ReaderContext);

  const showFirstPageOnly = currentPage === 0;
  // Because we're adding up to 2 pages at once, we need to compar with pageCount instead of (pageCount - 1)
  const showLastPageOnly = currentPage === pageCount;
  const isFirstOrLastPage = showFirstPageOnly || showLastPageOnly;

  const { width, height } = useWindowDimensions();

  return (
    <SContainer>
      <SPagesContainer>
        {
          !showFirstPageOnly &&
          <Page
            key={currentPage}
            id={id}
            chapter={chapter}
            index={currentPage}
            style={{
              width: !isFirstOrLastPage ? 0.5 * width : width,
              height,
              objectPosition: !isFirstOrLastPage ? "right" : "center",
            }}
          />
        }
        {
          !showLastPageOnly &&
          <Page
            key={currentPage + 1}
            id={id}
            chapter={chapter}
            index={currentPage + 1}
            style={{
              width: !isFirstOrLastPage ? 0.5 * width : width,
              height,
              objectPosition: !isFirstOrLastPage ? "left" : "center",
            }}
          />
        }
      </SPagesContainer>
    </SContainer>
  );
}

