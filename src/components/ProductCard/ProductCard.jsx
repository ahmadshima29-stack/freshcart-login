import React from "react";
import { Link } from "react-router-dom";
import ProductImage from "../ProductImage/ProductImage.jsx";
import AddToCartButton from "../AddToCartButton/AddToCartButton.jsx";
import { formatMoney } from "../../services/format.js";
import "./ProductCard.css";
export default function ProductCard({ product }) {
  return <article className="product-card">
    <Link className="product-card-link" to={"/product/" + product.id}>
      <div className="product-card-photo"><ProductImage src={product.image} alt={product.title}/><span className="product-category">{product.category}</span></div>
      <div className="product-card-heading"><h3>{product.title}</h3><p>{product.unit}</p></div>
    </Link>
    <div className="product-card-bottom"><strong>{formatMoney(product.price)}</strong><AddToCartButton product={product}/></div>
  </article>;
}
