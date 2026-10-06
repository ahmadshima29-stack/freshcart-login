import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProduct } from "../../services/dataService.js";
import { formatMoney } from "../../services/format.js";
import ProductImage from "../../components/ProductImage/ProductImage.jsx";
import AddToCartButton from "../../components/AddToCartButton/AddToCartButton.jsx";
import Icon from "../../components/Icon/Icon.jsx";
import "./ProductDetail.css";
export default function ProductDetail() {
  const { id } = useParams();
  const [state, setState] = useState({ id: null, status: "loading", product: null });
  useEffect(() => {
    let active = true;
    setState({ id, status: "loading", product: null });
    getProduct(id).then(product => {
      if (active) setState({ id, status: product ? "ready" : "missing", product });
    }).catch(() => { if (active) setState({ id, status: "error", product: null }); });
    return () => { active = false; };
  }, [id]);
  if (state.id !== id || state.status === "loading") return <main id="main-content" className="store-container empty-page" role="status">Loading product…</main>;
  if (state.status !== "ready") return <main id="main-content" className="store-container empty-page"><h1>{state.status === "missing" ? "Product not found" : "Unable to load this product"}</h1><p>Choose another fresh favorite from the shop.</p><Link to="/" className="btn button-primary">Back to shop</Link></main>;
  const { product } = state;
  return <main id="main-content" className="store-container detail-page">
    <Link to="/" className="back-link"><Icon name="back" size={17}/> Back to shop</Link>
    <div className="row g-5 align-items-center">
      <div className="col-md-6"><div className="detail-photo"><ProductImage src={product.image} alt={product.title} loading="eager"/></div></div>
      <div className="col-md-6 detail-copy">
        <p className="eyebrow">{product.category.toUpperCase()}</p><h1>{product.title}</h1>
        <p className="detail-unit">{product.unit}</p><p className="detail-price">{formatMoney(product.price)}</p>
        <p className="detail-description">{product.description}</p>
        <AddToCartButton product={product} large/>
        <Link to="/cart" className="detail-cart-link">View your cart <Icon name="arrow" size={16}/></Link>
        <div className="detail-note"><Icon name="leaf"/><span>Good ingredients for your everyday.</span></div>
      </div>
    </div>
  </main>;
}
