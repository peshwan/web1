import React from 'react';
import { Link } from 'react-router-dom';

function PrivacyPolicy() {
  return (
    <div dir="rtl" className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">سياسة الخصوصية</h1>
      <p className="text-gray-700 leading-relaxed mb-4">
        نحن في [zahabprice.online] نحترم خصوصية زوارنا ونلتزم بحماية معلوماتهم الشخصية. توضح هذه السياسة كيفية جمعنا واستخدامنا وحماية معلوماتك.
      </p>
      <h2 className="text-2xl font-semibold mb-3">المعلومات التي نجمعها</h2>
      <p className="text-gray-700 leading-relaxed mb-4">
        قد نقوم بجمع معلومات غير شخصية مثل نوع المتصفح ونظام التشغيل وعنوان IP. هذه المعلومات تساعدنا على تحسين تجربة المستخدم.
      </p>
      <h2 className="text-2xl font-semibold mb-3">كيف نستخدم معلوماتك</h2>
      <p className="text-gray-700 leading-relaxed mb-4">
        نستخدم المعلومات التي نجمعها لتحسين موقعنا وتقديم تجربة أفضل للمستخدمين. نحن لا نشارك معلوماتك الشخصية مع أطراف ثالثة.
      </p>
      <h2 className="text-2xl font-semibold mb-3">حماية معلوماتك</h2>
      <p className="text-gray-700 leading-relaxed mb-4">
        نحن نتخذ تدابير أمنية لحماية معلوماتك من الوصول غير المصرح به أو الاستخدام أو التغيير أو الإفشاء.
      </p>
      <h2 className="text-2xl font-semibold mb-3">تغييرات في سياسة الخصوصية</h2>
      <p className="text-gray-700 leading-relaxed mb-4">
        قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر. سيتم نشر أي تغييرات على هذه الصفحة.
            </p>
               <div className="mt-6 text-center">
                            <Link to="/" className="text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
                                &larr; العودة إلى الصفحة الرئيسية
                            </Link>
                        </div>
        </div>
    );
}

export default PrivacyPolicy;
