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

const Footer = styled.footer`
  display: flex;
  justify-content: center;
  padding: 32px 20px 48px;
`;

const AuthorLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  color: black;
  font-size: 20px;
  text-underline-offset: 4px;
  border-radius: 4px;

  &:hover {
    color: #555;
  }

  &:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 6px;
  }
`;

const Avatar = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
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
    <>
      <Container>
        {comics}
      </Container>
      <Footer>
        <AuthorLink href="https://hhsaez.com">
          <Avatar src={process.env.PUBLIC_URL + "/avatar.png"} alt="" width="64" height="64" />
          <span>hhsaez.com</span>
        </AuthorLink>
      </Footer>
    </>);
}

export default React.memo(withPageViewTracking(Library));
