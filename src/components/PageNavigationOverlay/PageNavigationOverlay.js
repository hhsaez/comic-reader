import React, { useCallback, useContext, useMemo, useState } from "react";
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

  // background-color: red;

  &.hidden {
    opacity: 0;
    // background-color: blue;
  }

  &.shown {
    // background-color: green;
    opacity: 1;
    // transition: all 2s linear 2s;
  }
`;

const SInteractionContainer = styled.div`
  display: flex;
  flex-grow: 1;
`;

const SInteractionArea = styled.div`
  display: flex;
  min-width: 100px;
  height: 100%;
  flex-grow: 1;
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
`;

const STopBarLeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: lef;
  justify-content: center;
  padding-left: 20px;
  min-width: 30px;

  span {
    margin: 0 5px 0 5px;
  }
`;

const STopBarMiddleContainer = styled.div`
  display: flex;
  flex-grow: 3;
  align-items: center;
  justify-content: center;
  min-width: 0;
  
  label {
    font-size: 2em;
  }
`;

const STopBarRightContainer = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: right;
  padding-right: 20px;

  span {
    margin: 0 5px 0 5px;
  }
`;

function ChangePageLayoutButton(props) {
  const { id: newLayout, icon } = props;
  const { setContext } = useContext(ReaderContext);
  const setNewLayout = useCallback(() => {
    setContext((prev) => ({
      ...prev,
      layout: newLayout,
    }));
  }, [setContext, newLayout]);
  return <span className="material-symbols-outlined" onClick={setNewLayout}>{icon}</span>
}

function TopBar(props) {
  const { title } = props;
  return (
    <STopBarContainer>
      <STopBarLeftContainer>
        <Link to="/library">
          <span className="material-symbols-outlined">home</span>
        </Link>
      </STopBarLeftContainer>
      <STopBarMiddleContainer>
        <label>{title}</label>
      </STopBarMiddleContainer>
      <STopBarRightContainer>
        <ChangePageLayoutButton id="single-page" icon="note" />
        <ChangePageLayoutButton id="double-page" icon="import_contacts" />
        <ChangePageLayoutButton id="long-strip" icon="calendar_view_day" />
        {/* <span className="material-symbols-outlined" style={{ pointerEvents: "none" }}>note</span>
        <span className="material-symbols-outlined">import_contacts</span>
        <span className="material-symbols-outlined">calendar_view_day</span> */}
      </STopBarRightContainer>
    </STopBarContainer>
  );
}

export function PageNavigationOverlay() {
  const [visible, setVisible] = useState(true);

  const { context, setContext } = useContext(ReaderContext);
  const { info: { title, subtitle } = {} } = context;

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

  const toggleSidebar = useCallback(() => {
    setVisible((prev) => !prev);
  }, [setVisible]);

  const fullTitle = useMemo(() => {
    if (subtitle) {
      return `${title}: ${subtitle}`;
    }
    return title || "NO TITLE";
  }, [title, subtitle])

  return (
    <SContainer className={`${visible ? "shown" : "hidden"}`} onTransitionEnd={() => setVisible(false)}>
      <TopBar title={fullTitle} />
      <SInteractionContainer>
        <SInteractionArea style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }} onClick={prevPage}><NavigateBefore /></SInteractionArea>
        <SInteractionArea style={{ backgroundColor: "rgba(0, 0, 0, 0.15)", flexGrow: 4 }} onClick={toggleSidebar} />
        <SInteractionArea style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }} onClick={nextPage}><NavigateNext /></SInteractionArea>
      </SInteractionContainer>
    </SContainer>
  );
}
