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
import useWindowDimensions from "../../hooks/useWindowDimensions";
import withPageViewTracking from "../../hooks/withPageViewTracking";

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
        "Up": prevPage,
        "ArrowUp": prevPage,
        "d": nextPage,
        "l": nextPage,
        "ArrowRight": nextPage,
        "Right": nextPage,
        "Down": nextPage,
        "ArrowDown": nextPage,
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

function ReaderWithContext(params) {
  const { id, chapter: chapterIndex } = useLoaderData();
  const comics = getAllComics();
  const { title, chapters, hasZeroChapter } = comics[id];

  const { width, height } = useWindowDimensions();
  const layout = width > height ? "double-page" : "long-strip";

  const chapter = chapters[hasZeroChapter ? chapterIndex : chapterIndex - 1];
  const [context, setContext] = useState({
    info: {
      id,
      title,
      subtitle: chapter.subtitle,
      chapter: chapterIndex,
      pageCount: chapter.pageCount,
    },
    currentPage: 0,
    layout,
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

export default React.memo(withPageViewTracking(ReaderWithContext));
