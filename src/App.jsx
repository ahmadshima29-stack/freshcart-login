import React, { useEffect } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";
import Home from "./pages/Home/Home.jsx";
import ProductDetail from "./pages/ProductDetail/ProductDetail.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import Login from "./pages/Auth/Login.jsx";

function RouteEffects() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = pathname === "/" ? "FreshCart — Your everyday, fresher" : "FreshCart — " + (pathname.startsWith("/product/") ? "Product details" : pathname.slice(1));
  }, [pathname]);
  return null;
}

function Unavailable({ title, children }) {
  return <main id="main-content" className="store-container empty-page">
    <p className="eyebrow">FRESHCART</p><h1>{title}</h1><p>{children}</p>
    <Link className="btn button-primary" to="/">Back to the shop</Link>
  </main>;
}

export default function App() {
  return <>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <RouteEffects />
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/signup" element={<Unavailable title="Account registration">Account services have not been connected in this classroom project. You can browse products and use the cart without signing in.</Unavailable>} />
      <Route path="/forgot-password" element={<Unavailable title="Password recovery">Password recovery will be available when the authentication service is connected.</Unavailable>} />
      <Route path="*" element={<Unavailable title="This page wandered off.">The page you requested could not be found.</Unavailable>} />
    </Routes>
    <footer className="store-footer store-container"><span>FreshCart.</span><span>Good food. Better days.</span></footer>
  </>;
}
