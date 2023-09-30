import React, { useCallback, useContext, useEffect, useMemo } from "react";
import styled from "styled-components";
import { ReaderContext } from "../../routes/Reader/ReaderContext";
import { Link } from "react-router-dom";

const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;

  opacity: 0;
  transition: all .5s ease-in-out;
`;

const SInteractionContainer = styled.div`
  display: flex;
  flex-grow: 1;
  pointer-events: none;
`;

const SInteractionArea = styled.div`
  display: flex;
  width: 20%;
  min-width: 75px;
  height: 100%;
  flex-grow: 0;
  pointer-events: all;
`;

const NavigateNext = styled.i.attrs(() => ({ className: "material-symbols-outlined" }))`
  display: flex;
  flex-grow: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
  font-size: 10em;
  color: white;
  pointer-events: none;

  &:after {
    content: "navigate_next";
  }
`;

const NavigateBefore = styled.i.attrs(() => ({ className: "material-symbols-outlined" }))`
  display: flex;
  flex-grow: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
  font-size: 10em;
  color: white;
  pointer-events: none;

  &:after {
    content: "navigate_before";
  }
`;

const STopBarContainer = styled.div`
  display: flex;
  flex-direction: row;
  background-color: white;
  width: 100%;
  height: 50px;
  min-height: 50px;
  color: black;
  pointer-events: all;

  a { 
    color: black;
  }
`;

const STopBarLeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 0;
  align-items: left;
  justify-content: center;
  padding-left: 20px;
  width: 20%;
  min-width: 30px;

  span {
    margin: 0 5px 0 5px;
  }
`;

const STopBarMiddleContainer = styled.div`
  display: flex;
  flex-grow: 2;
  align-items: center;
  justify-content: center;
  min-width: 0;
  
  label {
    font-family: Tahoma, sans-serif;
    font-size: 1.2em;
  }

  @media screen and (max-width: 400px) {
    label {
      display: none;
    }
  }
`;

const STopBarRightContainer = styled.div`
  display: flex;
  flex-grow: 0;
  align-items: center;
  justify-content: right;
  padding-right: 20px;
  width: 20%;
  min-width: 30px;
`;

const SButtonGroupContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 0;
  align-items: center;
  justify-content: right;
  padding-left: 20px;
`;

function ChangePageLayoutButton(props) {
  const { id: newLayout, icon } = props;
  const { setContext } = useContext(ReaderContext);
  const setNewLayout = useCallback(() => {
    setContext((prev) => ({
      ...prev,
      layout: newLayout,
      // Ensures double page is shown correctly
      currentPage: newLayout === "double-page" && prev.currentPage % 2 !== 0 ? prev.currentPage + 1 : prev.currentPage,
      imageSizing: newLayout === "double-page" ? "fit-page" : prev.imageSizing,
    }));
  }, [setContext, newLayout]);
  return <span className="material-symbols-outlined" onClick={setNewLayout}>{icon}</span>
}

function ChangeImageSizingButton(props) {
  const { id: newFit, icon } = props;
  const { setContext } = useContext(ReaderContext);
  const setNewFit = useCallback(() => {
    setContext((prev) => ({
      ...prev,
      imageSizing: newFit,
    }));
  }, [setContext, newFit]);
  return <span className="material-symbols-outlined" onClick={setNewFit}>{icon}</span>
}

export function TopBar(props) {
  const { context } = useContext(ReaderContext);
  const { info: { title, subtitle }, layout } = context;

  const fullTitle = useMemo(() => {
    if (subtitle) {
      return `${title}: ${subtitle}`;
    }
    return title || "NO TITLE";
  }, [title, subtitle])

  return (
    <STopBarContainer {...props}>
      <STopBarLeftContainer>
        <Link to="/library">
          <span className="material-symbols-outlined">home</span>
        </Link>
      </STopBarLeftContainer>
      <STopBarMiddleContainer>
        <label>{fullTitle}</label>
      </STopBarMiddleContainer>
      <STopBarRightContainer>
        {
          layout !== "double-page" &&
          <SButtonGroupContainer>
            <ChangeImageSizingButton id="fit-page" icon="fit_page" />
            <ChangeImageSizingButton id="fit-width" icon="fit_width" />
          </SButtonGroupContainer>
        }
        <SButtonGroupContainer>
          <ChangePageLayoutButton id="single-page" icon="note" />
          <ChangePageLayoutButton id="double-page" icon="import_contacts" />
          <ChangePageLayoutButton id="long-strip" icon="calendar_view_day" />
        </SButtonGroupContainer>
      </STopBarRightContainer>
    </STopBarContainer>
  );
}

export function PageNavigationOverlay() {
  const { context: { showOverlay, layout }, setContext } = useContext(ReaderContext);

  const nextPage = useCallback(() => setContext((ctx) => {
    const { info: { pageCount }, currentPage, layout } = ctx;
    const advance = layout === "double-page" ? 2 : 1;
    return {
      ...ctx,
      currentPage: (currentPage < (pageCount - 1) ? currentPage + advance : currentPage),
    };
  }), [setContext]);

  const prevPage = useCallback(() => setContext((ctx) => {
    const { currentPage, layout } = ctx;
    const advance = layout === "double-page" ? 2 : 1;
    return {
      ...ctx,
      currentPage: (currentPage > 0 ? currentPage - advance : currentPage),
    };
  }), [setContext]);

  const hideOverlay = useCallback((prev) => setContext((prev) => ({ ...prev, showOverlay: false })), [setContext]);

  useEffect(() => {
    if (!showOverlay) {
      return;
    }
    const timer = setTimeout(hideOverlay, 5000);
    return () => {
      clearTimeout(timer);
    }
  }, [showOverlay, hideOverlay]);

  return (
    <SContainer style={{ opacity: showOverlay ? 1 : 0 }}>
      <TopBar />
      {
        layout !== "long-strip" &&
        <SInteractionContainer>
          <SInteractionArea style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }} onClick={prevPage}><NavigateBefore /></SInteractionArea>
          <SInteractionArea style={{ backgroundColor: "rgba(0, 0, 0, 0.15)", flexGrow: 8, pointerEvents: "none" }} />
          <SInteractionArea style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }} onClick={nextPage}><NavigateNext /></SInteractionArea>
        </SInteractionContainer>
      }
    </SContainer>
  );
}
