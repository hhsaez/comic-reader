import React, { useContext } from "react";
import styled from "styled-components";
import { ReaderContext } from "./ReaderContext";
import useTogglePageNavigationOverlay from "../../components/PageNavigationOverlay/useTogglePageNavigationOverlay";

const SContainer = styled.div`
`;

const SImage = styled.img`
  // display: flex;
  // flex-grow: 1;
  // flex-direction: row;
  // align-self: center;
  // max-width: 100%;
  // overflow: auto;
  object-fit: contain;
  // background-size: contain;
  // background-position: center;
  // background-repeat: no-repeat;  
`;

function pad(num, places) {
  return String(num).padStart(places, '0');
}

export default function Page(props) {
  const { context: { imageSizing } } = useContext(ReaderContext);

  const toggleOverlay = useTogglePageNavigationOverlay();

  const { id, chapter, index, style, ...rest } = props;

  const src = process.env.PUBLIC_URL + `/${id}/${pad(chapter, 2)}/${pad(index, 4)}.png`;
  return (
    // <SContainer key={index} {...rest}>
    <SImage key={index} {...rest}
      onClick={toggleOverlay}
      src={src}
      alt={`${id}_${index}`}
      style={{
        ...style,
        // width: imageSizing === "fit-width" ? "100vw" : "auto",
        // height: imageSizing === "fit-page" ? "100vh" : "auto",
        // overflow: imageSizing === "fit-width" ? "visible" : "auto",
        // backgroundImage: `url(${src})`,
      }} />
    // </SContainer>
  );
}

