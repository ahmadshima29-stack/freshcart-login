# FreshCart Login

واجهة React وBootstrap ببنفسجي هادئ، صورة فعلية، أيقونات SVG وحركة دخول قصيرة.

## التشغيل

يتطلب Node.js 20.19+ أو 22.12+.

```bash
npm install
npm run dev
```

افتح العنوان الذي يظهر في الطرفية.

## إضافتها إلى مشروع React موجود

انسخ src/Login.jsx وsrc/Login.css إلى نفس المجلد داخل مشروعك وثبت Bootstrap:

```bash
npm install bootstrap
```

استورد Login واعرضه. ملف page.css خاص بصفحة العرض المستقلة؛ لا يلزم نقله.

## ربط تسجيل الدخول

```jsx
<Login
  onLogin={async ({ email, password, rememberMe }) => {
    // Call your authentication service here.
    // Throw on failure; redirect using your router on success.
  }}
  signupUrl="/signup"
  forgotPasswordUrl="/forgot-password"
/>
```

المثال يوضح مكان الدمج فقط. لا تستخدم دالة فارغة في الإنتاج.
الصفحة لا تحتوي خادم مصادقة أو صفحات إنشاء الحساب واستعادة كلمة المرور.
عند غياب onLogin تظهر رسالة تعذر تسجيل الدخول؛ لا يجري تمثيل نجاح وهمي.
onLogin يجب أن يرجع Promise وأن يرمي خطأ عند فشل المصادقة.
التحقق من الصلاحيات وإدارة الجلسة وتذكر المستخدم مسؤولية الخادم.

يمكن تمرير onSocialLogin(provider) لعرض Google وFacebook وApple.
تُمرر أسماء المزودين google وfacebook وapple؛ ربط OAuth مسؤولية التطبيق.

## التصميم والصورة

ارتفاع الصفحة الأدنى 100dvh مع 100vh كبديل، وتتمدد عند الحاجة لتجنب قص الحقول.
تُخفى صورة القسم التسويقي على الشاشات الصغيرة لتقريب الفورم.
تُحترم إعدادات تقليل الحركة.
صورة الطعام تُحمّل من images.unsplash.com وتحتاج اتصالاً بالإنترنت.
يمكن استبدال FOOD image src في Login.jsx بصورة محلية.
الأيقونات SVG مضمّنة ولا تحتاج مكتبة خارجية.

لم تُشغّل الحزمة أو تختبر في المتصفح ضمن هذه الجلسة.

