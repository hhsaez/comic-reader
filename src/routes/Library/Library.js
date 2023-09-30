import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import getAllComics from "../../utils/getAllComics";

const CoverImage = styled.img`
  width: 100%;
  height: 100%;
  max-width: 300px;
  max-height: 400px;
  border: solid 2px black;
`

function Cover(props) {
  const { id, name, hasZeroChapter } = props;
  const firstChapter = hasZeroChapter ? 0 : 1;
  const src = process.env.PUBLIC_URL + `/${id}/${firstChapter}/0001.png`;
  return (<Link to={`/reader/${id}/${firstChapter}`}><CoverImage src={src} alt={name} /></Link>);
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  overscroll-behavior: none;
  overflow: visible;
  position: auto;
  overflow-y: scroll;
`;

const CoverContainer = styled.div`
display: flex;
flex-direction: row;
  padding: 10px;
    display: inline; 
`;

export default function Library() {
  const allComics = getAllComics();
  const comics = Object.keys(allComics).map((id) => {
    return allComics[id].chapters.map((chapter) => {
      return {
        id,
        name: allComics[id].name,
        hasZeroChapter: !!allComics[id].hasZeroChapter,
      };
    });
  }).flat();

  return (
    <Container>
      {comics.map((comic, key) =>
        <CoverContainer key={key}>
          <Cover {...comic} />
        </CoverContainer>)}
    </Container >);
} 