// Local mock service. Replace these functions with API calls when a backend is available.
export const PRODUCTS = Object.freeze([
  {
    "id": "banana",
    "title": "Organic Bananas",
    "price": 2.49,
    "category": "fruit",
    "description": "Sweet organic bananas, ideal for breakfast, snacks, and smoothies.",
    "image": "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=900&q=80",
    "unit": "1 bunch"
  },
  {
    "id": "strawberries",
    "title": "Fresh Strawberries",
    "price": 4.99,
    "category": "fruit",
    "description": "Ripe, fragrant strawberries selected for their bright flavor. Enjoy fresh or add a handful to your morning oats.",
    "image": "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=900&q=80",
    "unit": "1 lb"
  },
  {
    "id": "avocado",
    "title": "Hass Avocados",
    "price": 5.49,
    "category": "vegetables",
    "description": "Creamy Hass avocados ready for toast, salads, and guacamole. Store at room temperature until ripe.",
    "image": "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=900&q=80",
    "unit": "4 pack"
  },
  {
    "id": "tomatoes",
    "title": "Vine Tomatoes",
    "price": 3.29,
    "category": "vegetables",
    "description": "Juicy vine-ripened tomatoes with a balanced, fresh taste. Perfect for salads, sandwiches, and homemade sauces.",
    "image": "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=900&q=80",
    "unit": "1 lb"
  },
  {
    "id": "milk",
    "title": "Whole Milk",
    "price": 3.79,
    "category": "dairy",
    "description": "Fresh whole milk with a rich, smooth texture. Keep refrigerated and enjoy with breakfast or in your favorite recipes.",
    "image": "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=900&q=80",
    "unit": "1 gallon"
  },
  {
    "id": "eggs",
    "title": "Free-Range Eggs",
    "price": 4.59,
    "category": "dairy",
    "description": "Large free-range eggs for everyday breakfasts and baking. Keep refrigerated.",
    "image": "https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=900&q=80",
    "unit": "12 count"
  },
  {
    "id": "bread",
    "title": "Sourdough Bread",
    "price": 5.25,
    "category": "bakery",
    "description": "Slow-fermented sourdough with a crisp crust and tender crumb. Slice, toast, and serve with your favorite toppings.",
    "image": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80",
    "unit": "1 loaf"
  },
  {
    "id": "rice",
    "title": "Basmati Rice",
    "price": 8.99,
    "category": "pantry",
    "description": "Aromatic long-grain basmati rice for everyday meals. Rinse before cooking and store in a cool, dry place.",
    "image": "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=900&q=80",
    "unit": "5 lb bag"
  }
].map(Object.freeze));
const CATEGORY_NAMES = { fruit: "Fruit", vegetables: "Vegetables", dairy: "Dairy & Eggs", bakery: "Bakery", pantry: "Pantry" };
export async function getProducts() { return PRODUCTS; }
export async function getCategories() {
  return [{ id: "all", name: "All products" }, ...[...new Set(PRODUCTS.map(product => product.category))].map(id => ({ id, name: CATEGORY_NAMES[id] ?? id }))];
}
export async function getProduct(id) { return PRODUCTS.find(product => product.id === String(id)) ?? null; }
