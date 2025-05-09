import React from 'react';
import { Link } from 'react-router-dom';
import { Footer } from '../components/Footer'; // Assuming Footer can be reused

const NotFound: React.FC = () => {
  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mb-3">الصفحة غير موجودة</h2>
        <p className="text-gray-600 mb-6">
          عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
        </p>
        <p className="text-gray-700 mb-4">يمكنك العودة إلى:</p>
        <ul className="space-y-2">
          <li>
            <Link to="/" className="text-blue-600 hover:text-blue-800 hover:underline">
              الصفحة الرئيسية
            </Link>
          </li>
          {/* Add other relevant links if needed, ensure paths match your routes */}
          {/* Example:
          <li>
            <Link to="/calculate" className="text-blue-600 hover:text-blue-800 hover:underline">
              حاسبة الذهب
            </Link>
          </li>
          */}
        </ul>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
