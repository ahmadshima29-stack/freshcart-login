import React, { useEffect, useState } from "react";
import { getProducts, getCategories } from "../../services/dataService.js";
import CategoryButton from "../../components/CategoryButton/CategoryButton.jsx";
import ProductCard from "../../components/ProductCard/ProductCard.jsx";
import ProductImage from "../../components/ProductImage/ProductImage.jsx";
import Icon from "../../components/Icon/Icon.jsx";
import "./Home.css";
export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("loading");
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    let active = true;
    setStatus("loading");
    Promise.all([getProducts(), getCategories()]).then(([items, groups]) => {
      if (active) { setProducts(items); setCategories(groups); setStatus("ready"); }
    }).catch(() => { if (active) setStatus("error"); });
    return () => { active = false; };
  }, [attempt]);
  const filtered = products.filter(product => (category === "all" || product.category === category) && product.title.toLowerCase().includes(query.trim().toLowerCase()));
  return <main id="main-content" className="store-container home-page">
    <section className="home-hero row g-0">
      <div className="col-md-7 hero-copy">
        <p className="eyebrow"><span className="fresh-dot"/> YOUR EVERYDAY, A LITTLE FRESHER</p>
        <h1>Good food.<br/>Better <em>days.</em></h1>
        <p>Fill your basket with the little things<br className="d-none d-lg-block"/> that make everyday feel good.</p>
        <a href="#products" className="btn button-primary">Explore the shop <Icon name="arrow" size={18}/></a>
        <div className="hero-footnote"><Icon name="leaf" size={17}/> Fresh favorites. Thoughtfully chosen.</div>
      </div>
      <div className="col-md-5 hero-visual">
        <ProductImage loading="eager" src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1000&q=85" alt="A bowl of colorful fresh salad"/>
        <div className="hero-image-label"><Icon name="leaf"/><span>Make room for<br/><strong>something fresh.</strong></span></div>
      </div>
    </section>

    <section id="products" className="catalogue-section" aria-labelledby="products-heading">
      <div className="catalogue-heading">
        <div><p className="eyebrow mb-2">THE EVERYDAY EDIT</p><h2 id="products-heading">Your next fresh find.</h2></div>
        <div className="catalogue-search"><Icon name="search" size={18}/><label className="visually-hidden" htmlFor="product-search">Search products</label><input id="product-search" type="search" placeholder="Find your favorites…" value={query} onChange={event => setQuery(event.target.value)}/></div>
      </div>
      <div className="category-list" aria-label="Filter by category">{categories.map(item => <CategoryButton key={item.id} category={item} active={category === item.id} onSelect={setCategory}/>)}</div>
      {status === "loading" && <p className="catalogue-state" role="status">Gathering fresh favorites…</p>}
      {status === "error" && <div className="catalogue-state" role="alert"><p>We could not load the shop.</p><button className="btn button-primary" onClick={() => setAttempt(value => value + 1)}>Try again</button></div>}
      {status === "ready" && <>
        <p className="results-count" role="status">{filtered.length} {filtered.length === 1 ? "fresh find" : "fresh finds"} for your basket</p>
        {filtered.length ? <div className="row g-4">{filtered.map(product => <div className="col-sm-6 col-lg-4 col-xl-3" key={product.id}><ProductCard product={product}/></div>)}</div> : <div className="catalogue-state"><h3>No products found</h3><p>Try another search or category.</p><button className="btn button-secondary" onClick={() => {setQuery("");setCategory("all");}}>Clear filters</button></div>}
      </>}
    </section>
    <section className="shop-note"><Icon name="leaf" size={27}/><div><h2>Small choices. Everyday goodness.</h2><p>A few fresh favorites are all it takes to get started.</p></div></section>
  </main>;
}
