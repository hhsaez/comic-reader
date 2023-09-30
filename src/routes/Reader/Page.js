import React from "react";
import styled from "styled-components";
import useTogglePageNavigationOverlay from "../../components/PageNavigationOverlay/useTogglePageNavigationOverlay";

const SImage = styled.img`
  object-fit: contain;
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

