import { Facebook, Mail, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
    return (
        <footer className="bg-gray-100 py-8 mt-auto">
            <div className="container mx-auto px-4">
                {/* Centered content container */}
                <div className="flex flex-col items-center gap-6 mb-6">
                    {/* Links Group: Centered */}
                    <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3"> {/* Use flex-wrap for smaller screens */}

                            {/* Add Calculator Link */}
                            <Link to="/calculate" className="flex items-center gap-2 hover:text-blue-600 font-semibold">
                            <span>حاسبة الذهب</span>
                        </Link>
                      
                        <Link to="/gold-info" className="flex items-center gap-2 hover:text-blue-600 font-semibold">
                            <span>أنواع الذهب</span>
                        </Link>
                        <Link to="/privacy" className="flex items-center gap-2 hover:text-blue-600 font-semibold">
                            <span>سياسة الخصوصية</span>
                        </Link>
                        <a href="mailto:oliverr1988@gmail.com" className="flex items-center gap-2 hover:text-blue-600 font-semibold">
                            <Mail size={22} /> {/* Slightly larger */}
                            <span>تواصل معنا</span>
                        </a>
                    </div>
                    {/* Social Icons Group: Centered */}
                    <div className="flex justify-center gap-10"> {/* Increased gap */}
                        <a href="https://t.me/Revinult" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-700 transition-colors duration-200">
                            <MessageCircle size={32} strokeWidth={1.5} /> {/* Larger, thinner stroke */}
                        </a>
                        <a href="https://www.facebook.com/share/1DnBqMLbZH/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-700 transition-colors duration-200">
                            <Facebook size={32} strokeWidth={1.5} /> {/* Larger, thinner stroke */}
                        </a>
                    </div>
                </div>
                <div className="mt-8 text-center border-t border-gray-200 pt-6"> {/* Added border-top and padding */}
                    <p className="text-sm text-blue-600 mb-2">يتم تحديث الأسعار كل دقيقة</p>
                    <p className="text-sm text-gray-500">جميع الحقوق محفوظة لموقع zahabprice.online © 2025</p>
                </div>
            </div>
        </footer>
    );
}
