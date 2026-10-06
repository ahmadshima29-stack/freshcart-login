export const MAX_QUANTITY = 99;
export function normalizeQuantity(quantity) {
  if (typeof quantity !== "number" || !Number.isFinite(quantity) || !Number.isInteger(quantity) || quantity <= 0) return null;
  return Math.min(MAX_QUANTITY, quantity);
}
export function normalizeCartItems(value, catalogue) {
  if (!Array.isArray(value) || !Array.isArray(catalogue)) return [];
  const byId = new Map(catalogue.filter(product => product && typeof product.id === "string" && Number.isFinite(product.price) && product.price >= 0).map(product => [product.id, product]));
  const quantities = new Map();
  for (const entry of value) {
    if (!entry || typeof entry !== "object") continue;
    const id = typeof entry.id === "string" ? entry.id : entry.product?.id;
    const quantity = normalizeQuantity(entry.quantity);
    if (!byId.has(id) || quantity === null) continue;
    quantities.set(id, Math.min(MAX_QUANTITY, (quantities.get(id) ?? 0) + quantity));
  }
  return [...quantities].map(([id, quantity]) => ({ ...byId.get(id), quantity }));
}
export function addCartItem(items, product) {
  if (!product || typeof product.id !== "string") return items;
  const existing = items.find(item => item.id === product.id);
  return existing ? items.map(item => item.id === product.id ? { ...item, quantity: Math.min(MAX_QUANTITY, item.quantity + 1) } : item) : [...items, { ...product, quantity: 1 }];
}
export function removeCartItem(items, id) { return items.filter(item => item.id !== id); }
export function updateCartItemQuantity(items, id, quantity) {
  const normalized = normalizeQuantity(quantity);
  if (normalized === null) return items;
  return items.map(item => item.id === id ? { ...item, quantity: normalized } : item);
}
export function getItemCount(items) { return items.reduce((total, item) => total + (normalizeQuantity(item.quantity) ?? 0), 0); }
export function getCartTotal(items) {
  return items.reduce((total, item) => {
    const quantity = normalizeQuantity(item.quantity);
    return quantity !== null && Number.isFinite(item.price) && item.price >= 0 ? total + Math.round(item.price * 100) * quantity : total;
  }, 0) / 100;
}
export function toPersistedCart(items) { return items.map(({ id, quantity }) => ({ id, quantity })); }
