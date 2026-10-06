# FreshCart — React E-Commerce

A responsive grocery store using React, Bootstrap, React Router, and separate component CSS files.

## Run locally

Node.js 22 is recommended.

```bash
npm ci
npm run dev
```

Open the Local URL printed by Vite. To validate/build:

```bash
npm test
npm run build
npm run preview
```

## Assignment requirements

| Requirement | Implementation |
| --- | --- |
| Home route `/` | `src/pages/Home/Home.jsx` |
| Login route `/login` | Existing login preserved in `src/pages/Auth/Login.jsx` |
| Dynamic `/product/:id` | `useParams` in `src/pages/ProductDetail/ProductDetail.jsx` |
| Product/category service | Async local mock service in `src/services/dataService.js` |
| Reusable product cards | `src/components/ProductCard/` |
| Dynamic category chips | `src/components/CategoryButton/` |
| Shared cart and hooks | `src/hooks/CartContext.jsx` uses useState/useEffect and context |
| Navbar cart counter | Counts total quantity across all cart items |
| View/remove cart items | `/cart`, with quantity controls and subtotal |
| Separate styles | Each visual component/page imports its own CSS; no inline JSX styles |

## كيف يعمل المشروع؟

- `App.jsx` يحدد أي صفحة تظهر حسب الرابط.
- `Home` يجلب المنتجات والتصنيفات من service داخل useEffect، ويستخدم useState للبحث والتصفية.
- بطاقة المنتج تستخدم Link لفتح صفحة التفاصيل بدون إعادة تحميل الصفحة.
- `useParams` يقرأ id من الرابط ثم يجلب المنتج المطلوب؛ يوجد عرض خاص للمعرّف غير الموجود.
- `CartProvider` يحيط بالتطبيق، لذلك الصفحة الرئيسية والتفاصيل والنافبار والسلة تشترك بنفس البيانات.
- عند الإضافة، useState يحدّث السلة فتتحدث الواجهات والعدّاد تلقائياً.
- useEffect يحفظ معرّفات المنتجات وكمياتها في localStorage. عند إعادة التحميل تستعاد الأسعار من بيانات الخدمة.
- الحسابات المالية تتم بالسنتات لتجنب أخطاء الكسور العشرية.
- `tests/cartState.test.js` يفحص الإضافة المتكررة والحذف والكميات وحفظ السلة والخدمة.

## Structure

```text
src/
  assets/                  # Image fallback
  components/              # Navbar, ProductCard, CategoryButton, etc.
  pages/
    Auth/
    Home/
    ProductDetail/
    Cart/
  services/                # Mock product/category service and formatting
  hooks/                   # Shared cart context and pure state helpers
  styles/                  # Global tokens and shared layout
  App.jsx
  main.jsx
```

## Scope and integration

This is a frontend classroom project. Product data is mocked, prices are in USD,
and product photographs load from Unsplash. A local fallback is displayed if a product image cannot load.
There is no payment, order placement, or authentication backend.
The preserved login accepts an `onLogin` handler when an authentication service is available.
No passwords or authentication tokens are stored by this project.
Registration and password recovery routes explain that the service is not connected.

BrowserRouter uses clean paths. When hosting, configure the host to serve index.html
for application paths such as /product/banana. GitHub repository upload alone does not deploy a website.

References: [React Router useParams](https://reactrouter.com/6.30.1/hooks/use-params),
[BrowserRouter](https://reactrouter.com/6.30.1/router-components/browser-router).


## Validation completed

- Six automated tests passed for cart state and service behavior.
- Production build passed.
- Browser checks passed: category filtering, search/empty state, product navigation,
  adding from both views, badge updates, quantity controls, removal, persistence,
  corrupted localStorage recovery, invalid product routes, and login visibility toggle.
- Desktop (1440px) and mobile (390px) layouts reviewed; no horizontal overflow.
- Dependency audit reported zero vulnerabilities after upgrading dependencies.
