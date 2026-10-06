import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useCart } from "../../hooks/CartContext.jsx";
import Icon from "../Icon/Icon.jsx";
import "./Navbar.css";
export default function Navbar() {
  const { itemCount } = useCart();
  return <header className="shop-header">
    <nav className="store-container shop-nav" aria-label="Main navigation">
      <Link to="/" className="shop-brand"><span><Icon name="leaf" size={24}/></span>FreshCart<span className="brand-period">.</span></Link>
      <div className="shop-nav-links">
        <NavLink to="/" end>Shop</NavLink>
        <NavLink to="/login">Sign in</NavLink>
        <NavLink className="cart-link" to="/cart" aria-label={"Cart, " + itemCount + " items"}>
          <Icon name="bag"/><span className="cart-word">Cart</span>
          <span className="cart-badge" data-testid="cart-count">{itemCount}</span>
        </NavLink>
      </div>
    </nav>
  </header>;
}
