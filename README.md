# Auth Project (Node.js + Express + MongoDB + Simple Frontend)

### محتوى المشروع
- `server.js` - الخادم (Express) يقوم بالتسجيل وتسجيل الدخول ومسار محمي /profile.
- `frontend/` - صفحات HTML بسيطة للواجهه (index.html, signup.html, profile.html).
- `package.json` - تعريف المشروع والحزم.
- `.env.example` - مثال على متغيرات البيئة.
- `config.example.js` - مثال لوضع إعدادات يدوية (مستخدم إذا رغبت).

---

## إعداد وتشغيل محلياً

1. انسخ المشروع:
   ```
   git clone <repo> أو فك ضغط ZIP
   cd auth_project
   ```

2. أنشئ ملف `.env` بناءً على `.env.example` وضع بياناتك:
   ```
   MONGO_URL="mongodb+srv://<user>:<password>@cluster0.mongodb.net/mydb?retryWrites=true&w=majority"
   JWT_SECRET="supersecretjwtkey"
   PORT=3000
   ```

3. ثبّت الحزم:
   ```
   npm install
   ```

4. شغّل السيرفر:
   ```
   npm start
   ```

5. افتح المتصفح إلى:
   ```
   http://localhost:3000
   ```

---

## نشر على Render.com

1. ارفع المستودع إلى GitHub.
2. سجل على https://render.com.
3. اختر **New → Web Service** ثم اربط المستودع.
4. Build Command: `npm install`
5. Start Command: `npm start`
6. أضف متغيرات البيئة في صفحة الخدمة على Render:
   - `MONGO_URL` = رابط MongoDB Atlas
   - `JWT_SECRET` = قيمة سرية
7. اضغط Deploy.

بعد النشر ستصل الواجهة والـ API على نفس الدومين (مثال: https://yourapp.onrender.com).

---

## ملاحظات أمان
- لا تضع مفاتيح أو كلمات مرور مباشرة في الملفات. استخدم متغيرات البيئة.
- استخدم كلمة سر قوية في `JWT_SECRET`.
- لبيئة إنتاجية فكر في إضافة حماية ضد هجمات القوة الغاشمة، التحقق من الصحة بشكل أقوى، استخدام HTTPS، وتقييد CORS إلىโดمينات موثوقة.

---

## تطوير إضافي يمكنني أضيفه لك فوراً
- صفحة لوحة تحكم Dashboard
- إعادة تعيين كلمة المرور عبر الإيميل
- تأكيد البريد (email verification)
- تسجيل باستخدام Google / Facebook (OAuth)
- تحسين الواجهه بتصميم CSS أفضل
