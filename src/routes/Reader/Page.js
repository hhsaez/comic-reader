import React from "react";
import styled from "styled-components";

const SContainer = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
`;

const SImage = styled.img`
  display: flex;
  flex-grow: 1;
  height: 100%;
  width: 100%;
`;

function pad(num, places) {
  return String(num).padStart(places, '0');
}

export default function Page(props) {
  const { id, chapter, index } = props;
  const src = process.env.PUBLIC_URL + `/${id}/${pad(chapter, 2)}/${pad(index, 4)}.png`;
  return (
    <SContainer key={index}>
      <SImage src={src} alt={`${id}_${index}`} />
    </SContainer>);
}

