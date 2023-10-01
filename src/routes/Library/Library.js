import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import getAllComics from "../../utils/getAllComics";
import withPageViewTracking from "../../hooks/withPageViewTracking";

const CoverImage = styled.img`
  width: 100%;
  height: 100%;
  max-width: 300px;
  max-height: 400px;
  border: solid 2px black;
  box-shadow: 10px 10px darkgray;
`

function Cover(props) {
  const { id, title, chapter: chapterIndex, hasZeroChapter } = props;
  const chapter = chapterIndex + (hasZeroChapter ? 0 : 1);
  const src = process.env.PUBLIC_URL + `/${id}/${chapter}/cover.jpg`;
  return (<Link to={`/reader/${id}/${chapter}`}><CoverImage src={src} alt={title} /></Link>);
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const CoverContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 300px;
  height: 400px;
  margin: 20px;
  justify-content: center;
  align-items: center;
`;

function Library() {
  const comics = useMemo(() => {
    const allComics = getAllComics();
    return Object.keys(allComics).flatMap((comicId) => {
      const comic = allComics[comicId];
      return comic.chapters.map((chapter, index) => {
        const comicInfo = {
          id: comicId,
          subtitle: chapter.subtitle,
          chapter: index,
          title: chapter.title,
          hasZeroChapter: !!comic.hasZeroChapter,
        }
        return (
          <CoverContainer key={`${comicId}/${index}`}>
            <Cover {...comicInfo} />
          </CoverContainer>
        )
      });
    })
  }, []);

  return (
    <Container>
      {comics}
    </Container >);
}

export default React.memo(withPageViewTracking(Library));
