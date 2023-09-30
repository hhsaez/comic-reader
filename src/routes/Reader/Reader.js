import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import LongStripPageLayout from "./LongStripPageLayout";
import { ReaderContext } from "./ReaderContext";
import SinglePageLayout from "./SinglePageLayout";
import DoublePageLayout from "./DoublePageLayout";
import "material-symbols";
import { PageNavigationOverlay } from "../../components/PageNavigationOverlay";
import { useLoaderData } from "react-router";
import getAllComics from "../../utils/getAllComics";
import useGoToNextPage from "../../hooks/useGoToNextPage";
import useGoToPrevPage from "../../hooks/useGoToPrevPage";

const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 100vw;
    height: 100vh;
    flex-grow: 1;
    background-color: darkgray;
`;

const SContent = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`;

function Reader() {
  const {
    context: {
      info: {
        id,
        chapter,
        pageCount
      },
      layout
    }
  } = useContext(ReaderContext);

  let Layout = SinglePageLayout;
  if (layout === "double-page") {
    Layout = DoublePageLayout;
  } else if (layout === "long-strip") {
    Layout = LongStripPageLayout;
  }

  const nextPage = useGoToNextPage();
  const prevPage = useGoToPrevPage();

  const touchStartRef = useRef();
  useEffect(() => {
    const handleTouchStart = (event) => {
      touchStartRef.current = event.changedTouches[0];
    };

    const handleTouchEnd = (event) => {
      const touchEnd = event.changedTouches[0];
      const touchStart = touchStartRef.current;
      const xDiff = touchEnd.screenX - touchStart.screenX;
      const yDiff = touchEnd.screenY - touchStart.screenY;
      if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff < 0) {
          nextPage();
        } else if (xDiff > 0) {
          prevPage();
        }
      }
    };

    const handleKeyUp = (event) => {
      const callback = {
        "a": prevPage,
        "j": prevPage,
        "Left": prevPage,
        "ArrowLeft": prevPage,
        "d": nextPage,
        "l": nextPage,
        "ArrowRight": nextPage,
        "Right": nextPage,
      }[event.key];
      callback?.();
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("keyup", handleKeyUp);
    }
  })

  return (
    <Container>
      <SContent>
        <Layout id={id} chapter={chapter} pageCount={pageCount} style={{ flexGrow: 10 }} />
        <PageNavigationOverlay />
      </SContent>
    </Container>
  );
}

export default function ReaderWithContext(params) {
  const { id, chapter } = useLoaderData();
  const comics = getAllComics();
  const { title, subtitle, chapters, hasZeroChapter } = comics[id];

  const [context, setContext] = useState({
    info: {
      id,
      title,
      subtitle,
      chapter,
      pageCount: chapters[hasZeroChapter ? chapter : chapter - 1].pageCount,
    },
    currentPage: 0,
    layout: "single-page",
    imageSizing: "fit-page",
    showOverlay: true,
  });

  return (
    <ReaderContext.Provider value={{ context, setContext }}>
      <div style={{
        overflow: "hidden",
        position: "fixed",
        width: "100%",
        height: "100%",
      }}>

        <Reader />
      </div>
    </ReaderContext.Provider>
  );
}

