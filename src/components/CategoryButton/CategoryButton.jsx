import React from "react";
import "./CategoryButton.css";
export default function CategoryButton({ category, active, onSelect }) {
  return <button type="button" className={"category-chip" + (active ? " is-selected" : "")} aria-pressed={active} onClick={() => onSelect(category.id)}>{category.name}</button>;
}
