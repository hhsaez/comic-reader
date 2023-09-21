import React from "react";
import styled from "styled-components";

function Cover(props) {
    const { id, name, hasZeroChapter } = props;
    const firstChapter = hasZeroChapter ? "00" : "01";
    const src = process.env.PUBLIC_URL + `/${id}/${firstChapter}/0001.png`;
    return (<img src={src} style={{ width: 300, height: 400 }} alt={name} />);
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
    const comics = [
        {
            id: "jagerlied",
            name: "Jägerlied",
            hasZeroChapter: true,
        },
        {
            id: "setenta_y_siete",
            name: "Setenta y Siete",
        },
    ];

    return (
        <Container>
            <h1>Library</h1>
            {comics.map((comic, key) =>
                <CoverContainer key={key}>
                    <Cover {...comic} />
                </CoverContainer>)}
        </Container >);
} 