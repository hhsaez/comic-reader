import React from "react";

function pad(num, places) {
  return String(num).padStart(places, '0');
}

export default function Page(props) {
  const { id, chapter, index } = props;
  const src = process.env.PUBLIC_URL + `/${id}/${pad(chapter, 2)}/${pad(index, 4)}.png`;
  return (<div key={index}><img src={src} style={{ width: "auto", height: "80vh" }} alt={`${id}_${index}`} /></div>);
}

