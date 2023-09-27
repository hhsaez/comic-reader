import React from "react";
import styled from "styled-components";

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
  const { id, chapter, index, ...rest } = props;
  const src = process.env.PUBLIC_URL + `/${id}/${pad(chapter, 2)}/${pad(index, 4)}.png`;
  return (
    <SContainer key={index} {...rest}>
      <SImage src={src} alt={`${id}_${index}`} />
    </SContainer>);
}

