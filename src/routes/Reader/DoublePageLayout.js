import React, { useCallback, useState } from "react";
import styled from "styled-components";
import Page from "./Page";

const Pages = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const PagesContainer = styled.div`
  display: flex;
  position: relative; // So the interaction area is relative to this container
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  // width: 100%;
`;

const SInteractionContainer = styled.div`
  display: flex;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
`;

const SInteractionArea = styled.div`
  display: flex;
  min-width: 100px;
  height: 100%;
  flex-grow: 1;
`;

function InteractionArea(props) {
  const { setCurrentPage, pageCount } = props;
  const nextPage = useCallback(() => {
    setCurrentPage((prev) => prev < (pageCount - 1) ? prev + 2 : prev);
  }, [setCurrentPage, pageCount]);
  const prevPage = useCallback(() => {
    setCurrentPage((prev) => prev > 0 ? prev - 2 : prev);
  }, [setCurrentPage]);
  return (
    <SInteractionContainer>
      <SInteractionArea style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }} onClick={prevPage} />
      <SInteractionArea style={{ backgroundColor: "rgba(0, 0, 0, 0.15)", flexGrow: 4 }} />
      <SInteractionArea style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }} onClick={nextPage} />
    </SInteractionContainer>);
}

export default function DoublePageLayout(props) {
  const { id, chapter, pageCount } = props;

  const [currentPage, setCurrentPage] = useState(-1);

  return (
    <PagesContainer>
      <Pages>
        <Page key={currentPage} id={id} chapter={chapter} index={currentPage + 1} />
        <Page key={currentPage + 1} id={id} chapter={chapter} index={currentPage + 2} />
      </Pages>
      <InteractionArea setCurrentPage={setCurrentPage} pageCount={pageCount - 1} />
    </PagesContainer>
  );
}

