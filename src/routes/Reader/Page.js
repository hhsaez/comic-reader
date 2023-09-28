import React from "react";
import styled from "styled-components";
import useTogglePageNavigationOverlay from "../../components/PageNavigationOverlay/useTogglePageNavigationOverlay";

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
  const toggleOverlay = useTogglePageNavigationOverlay();

  const { id, chapter, index, style, ...rest } = props;

  const src = process.env.PUBLIC_URL + `/${id}/${chapter}/${pad(index, 4)}.png`;
  return (
    <SImage key={index} {...rest}
      onClick={toggleOverlay}
      src={src}
      alt={`${id}_${index}`}
      style={style} />
  );
}

