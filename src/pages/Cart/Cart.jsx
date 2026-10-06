import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../hooks/CartContext.jsx";
import { MAX_QUANTITY } from "../../hooks/cartState.js";
import { formatMoney } from "../../services/format.js";
import ProductImage from "../../components/ProductImage/ProductImage.jsx";
import Icon from "../../components/Icon/Icon.jsx";
import "./Cart.css";
export default function Cart() {
  const { items, itemCount, total, removeItem, updateQuantity } = useCart();
  return <main id="main-content" className="store-container cart-page">
    <Link className="back-link" to="/"><Icon name="back" size={17}/> Continue shopping</Link>
    <p className="eyebrow">A LITTLE GOODNESS TO GO</p>
    <div className="cart-heading"><h1>Your basket.</h1><span>{itemCount} {itemCount === 1 ? "item" : "items"}</span></div>
    {!items.length ? <div className="empty-cart"><span className="empty-cart-icon"><Icon name="bag" size={40}/></span><h2>A fresh start awaits.</h2><p>Your cart is empty. Add a few favorites from the shop.</p><Link className="btn button-primary" to="/">Explore products <Icon name="arrow" size={18}/></Link></div> :
      <div className="row g-4">
        <div className="col-lg-8"><ul className="cart-items list-unstyled">
          {items.map(item => <li className="cart-item" key={item.id}>
            <Link to={"/product/" + item.id} className="cart-item-image" aria-label={"View " + item.title}><ProductImage src={item.image} alt={item.title}/></Link>
            <div className="cart-item-info"><Link to={"/product/" + item.id}>{item.title}</Link><p>{item.unit} · {formatMoney(item.price)} each</p>
              <div className="quantity-control" role="group" aria-label={"Quantity for " + item.title}>
                <button type="button" aria-label={"Decrease " + item.title} disabled={item.quantity <= 1} onClick={() => updateQuantity(item.id, item.quantity - 1)}><Icon name="minus" size={15}/></button>
                <span aria-live="polite">{item.quantity}</span>
                <button type="button" aria-label={"Increase " + item.title} disabled={item.quantity >= MAX_QUANTITY} onClick={() => updateQuantity(item.id, item.quantity + 1)}><Icon name="plus" size={15}/></button>
              </div>
            </div>
            <div className="cart-item-end"><strong>{formatMoney(Math.round(item.price * 100) * item.quantity / 100)}</strong><button type="button" className="remove-item" aria-label={"Remove " + item.title} onClick={() => removeItem(item.id)}><Icon name="trash" size={16}/><span>Remove</span></button></div>
          </li>)}
        </ul></div>
        <aside className="col-lg-4"><div className="cart-summary"><h2>Basket summary</h2><div><span>Items ({itemCount})</span><strong>{formatMoney(total)}</strong></div><div className="cart-total"><span>Subtotal</span><strong data-testid="cart-total">{formatMoney(total)}</strong></div><p>Prices in USD. This classroom project does not process payments or place orders.</p><Link className="btn button-primary w-100" to="/">Keep exploring <Icon name="arrow" size={17}/></Link></div></aside>
      </div>}
  </main>;
}
