import React, { useCallback } from "react";

function SelectionItem(props) {
  const { id, icon, name, selected, onClick } = props;
  const onClickHandle = useCallback(() => {
    onClick(id);
  }, [onClick, id]);

  return (
    <div style={{ width: "100%", height: 50, backgroundColor: selected ? "yellow" : "green", color: "white" }} onClick={onClickHandle}>
      <span className="material-symbols-outlined">{icon}</span>
      <p style={{ display: "inline" }}>{name}</p>
    </div>
  );
}

export function Selector(props) {
  const { title, children, value, onChange } = props;
  return (
    <div>
      <label>{title}</label>
      <ul>
        {children.map((item, index) => <li key={index}><SelectionItem {...item} selected={item.id === value} onClick={onChange} /></li>)}
      </ul>
    </div>
  );
}
