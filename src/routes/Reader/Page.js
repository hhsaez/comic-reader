import React, { useCallback, useContext } from "react";
import styled from "styled-components";
import { ReaderContext } from "./ReaderContext";
import useTogglePageNavigationOverlay from "../../components/PageNavigationOverlay/useTogglePageNavigationOverlay";

const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-self: center;
`;

const SImage = styled.img`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  align-self: center;
  max-width: 100%;
  overflow: auto;
  object-fit: contain;
`;

function pad(num, places) {
  return String(num).padStart(places, '0');
}

export default function Page(props) {
  const { context: { imageSizing } } = useContext(ReaderContext);

  const toggleOverlay = useTogglePageNavigationOverlay();

  const { id, chapter, index, ...rest } = props;
  const src = process.env.PUBLIC_URL + `/${id}/${pad(chapter, 2)}/${pad(index, 4)}.png`;
  return (
    <SContainer key={index} {...rest}>
      <SImage
        onClick={toggleOverlay}
        src={src}
        alt={`${id}_${index}`}
        style={{
          width: imageSizing === "fit-width" ? "100%" : undefined,
          overflow: imageSizing === "fit-width" ? "visible" : "auto"
        }} />
    </SContainer>);
}

