import React, { useEffect, useRef, useState } from "react";
import { useCart } from "../../hooks/CartContext.jsx";
import { MAX_QUANTITY } from "../../hooks/cartState.js";
import Icon from "../Icon/Icon.jsx";
import "./AddToCartButton.css";
export default function AddToCartButton({ product, large = false }) {
  const { addItem, items } = useCart();
  const [added, setAdded] = useState(false);
  const timer = useRef(null);
  const quantity = items.find(item => item.id === product.id)?.quantity ?? 0;
  useEffect(() => () => clearTimeout(timer.current), []);
  function add() {
    addItem(product);
    setAdded(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), 1500);
  }
  return <button type="button" className={"add-cart-button" + (large ? " add-cart-large" : "")} onClick={add} disabled={quantity >= MAX_QUANTITY} aria-label={"Add " + product.title + " to cart"}>
    <Icon name={added ? "check" : "plus"} size={18}/>
    <span aria-live="polite">{quantity >= MAX_QUANTITY ? "Limit reached" : added ? "Added" : "Add to cart"}</span>
  </button>;
}
