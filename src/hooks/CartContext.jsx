import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { PRODUCTS } from "../services/dataService.js";
import { addCartItem, getCartTotal, getItemCount, normalizeCartItems, removeCartItem, toPersistedCart, updateCartItemQuantity } from "./cartState.js";
const STORAGE_KEY = "freshcart.cart.v1";
const CartContext = createContext(null);
function readStoredCart() {
  try { return normalizeCartItems(JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]"), PRODUCTS); }
  catch { return []; }
}
export function CartProvider({ children }) {
  const [items, setItems] = useState(readStoredCart);
  useEffect(() => {
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(toPersistedCart(items))); }
    catch { /* Shopping still works when browser storage is unavailable. */ }
  }, [items]);
  const addItem = useCallback(product => {
    const trusted = PRODUCTS.find(item => item.id === product?.id);
    if (trusted) setItems(current => addCartItem(current, trusted));
  }, []);
  const removeItem = useCallback(id => setItems(current => removeCartItem(current, id)), []);
  const updateQuantity = useCallback((id, quantity) => setItems(current => updateCartItemQuantity(current, id, quantity)), []);
  const clearCart = useCallback(() => setItems([]), []);
  const value = useMemo(() => ({ items, itemCount: getItemCount(items), total: getCartTotal(items), addItem, removeItem, updateQuantity, clearCart }), [items, addItem, removeItem, updateQuantity, clearCart]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error("useCart must be used inside CartProvider");
  return value;
}
