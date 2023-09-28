import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import getAllComics from "../../utils/getAllComics";

function Cover(props) {
  const { id, name, hasZeroChapter } = props;
  const firstChapter = hasZeroChapter ? 0 : 1;
  const src = process.env.PUBLIC_URL + `/${id}/${firstChapter}/0001.png`;
  return (<Link to={`/reader/${id}/${firstChapter}`}><img src={src} style={{ width: 300, height: 400 }} alt={name} /></Link>);
}

const Container = styled.div`
    padding: 20px;
    background-color: darkgray;
    width: 100vw;
    height: 100vh;
`;

const CoverContainer = styled.div`
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
      <h1>Library</h1>
      {comics.map((comic, key) =>
        <CoverContainer key={key}>
          <Cover {...comic} />
        </CoverContainer>)}
    </Container >);
} 