import test from "node:test";
import assert from "node:assert/strict";
import { PRODUCTS, getProducts, getCategories, getProduct } from "../src/services/dataService.js";
import { addCartItem, getCartTotal, getItemCount, normalizeCartItems, removeCartItem, updateCartItemQuantity, toPersistedCart } from "../src/hooks/cartState.js";

test("repeated adds increment quantity without duplicating product rows", () => {
  const initial = addCartItem([], PRODUCTS[0]);
  const items = addCartItem(addCartItem(initial, PRODUCTS[0]), PRODUCTS[0]);
  assert.equal(initial[0].quantity, 1);
  assert.equal(items.length, 1);
  assert.equal(getItemCount(items), 3);
  assert.equal(getCartTotal(items), 7.47);
});
test("remove and quantity updates change count and total", () => {
  let items = addCartItem(addCartItem([], PRODUCTS[0]), PRODUCTS[1]);
  items = updateCartItemQuantity(items, PRODUCTS[1].id, 2);
  assert.equal(getItemCount(items), 3);
  assert.equal(getCartTotal(items), 12.47);
  items = removeCartItem(items, PRODUCTS[0].id);
  assert.equal(getCartTotal(items), 9.98);
  assert.deepEqual(removeCartItem(items, PRODUCTS[1].id), []);
});
test("invalid quantities are ignored and quantity is capped", () => {
  const items = [{ ...PRODUCTS[0], quantity: 2 }];
  for (const value of [0, -1, NaN, Infinity, 2.5, "3"]) assert.strictEqual(updateCartItemQuantity(items, PRODUCTS[0].id, value), items);
  const capped = updateCartItemQuantity(items, PRODUCTS[0].id, 100);
  assert.equal(capped[0].quantity, 99);
  assert.equal(addCartItem(capped, PRODUCTS[0])[0].quantity, 99);
});
test("hydration rejects invalid data and trusts catalogue prices", () => {
  for (const value of [null, {}, "bad"]) assert.deepEqual(normalizeCartItems(value, PRODUCTS), []);
  const items = normalizeCartItems([
    { id: PRODUCTS[0].id, quantity: 2, price: .01 },
    { id: PRODUCTS[0].id, quantity: 3 },
    { id: "unknown", quantity: 4 },
    { id: PRODUCTS[1].id, quantity: 0 },
    { id: PRODUCTS[2].id, quantity: "3" },
    null,
  ], PRODUCTS);
  assert.equal(items.length, 1);
  assert.equal(items[0].quantity, 5);
  assert.equal(items[0].price, PRODUCTS[0].price);
});
test("storage round trip keeps only IDs and quantities", () => {
  const items = [{ ...PRODUCTS[0], quantity: 60 }, { ...PRODUCTS[0], quantity: 60 }];
  const stored = JSON.parse(JSON.stringify(toPersistedCart(items)));
  assert.deepEqual(Object.keys(stored[0]).sort(), ["id", "quantity"]);
  assert.equal(normalizeCartItems(stored, PRODUCTS)[0].quantity, 99);
});
test("service supports dynamic IDs and categories", async () => {
  assert.equal((await getProducts()).length, 8);
  assert.equal(await getProduct("missing"), null);
  assert.equal((await getProduct(PRODUCTS[0].id)).title, PRODUCTS[0].title);
  const categories = await getCategories();
  assert.equal(categories[0].id, "all");
  for (const product of PRODUCTS) assert.ok(categories.some(category => category.id === product.category));
});
