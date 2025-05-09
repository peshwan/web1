import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useRates } from '../context/RatesContext';

type ManualRatesString = {
    [K in 'SYP' | 'IQD' | 'EGP' | 'LBP']: string;
};

export function AdminPanel() {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const { manualRates, updateRates } = useRates();
    const [tempRates, setTempRates] = useState<ManualRatesString>({
        SYP: manualRates.SYP.toString(),
        IQD: manualRates.IQD.toString(),
        EGP: manualRates.EGP.toString(),
        LBP: manualRates.LBP.toString()
    });
    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        setTempRates({
            SYP: manualRates.SYP.toString(),
            IQD: manualRates.IQD.toString(),
            EGP: manualRates.EGP.toString(),
            LBP: manualRates.LBP.toString()
        });
    }, [manualRates]);

    const handleRateChange = (currency: keyof ManualRatesString, value: string) => {
        const numericValue = value.replace(/[^0-9.]/g, '');
        if (numericValue === '' || /^\d*\.?\d*$/.test(numericValue)) {
            setTempRates(prev => ({
                ...prev,
                [currency]: numericValue
            }));
        }
    };

    const handleSave = () => {
        const updatedRates = {
            SYP: parseFloat(tempRates.SYP) || 0,
            IQD: parseFloat(tempRates.IQD) || 0,
            EGP: parseFloat(tempRates.EGP) || 0,
            LBP: parseFloat(tempRates.LBP) || 0
        };
        
        updateRates(updatedRates);
        setMessage('تم حفظ الأسعار بنجاح! جاري تحديث الصفحة...');
        
        setTimeout(() => {
            window.location.reload();
        }, 1500);
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-50 py-6 flex flex-col justify-center sm:py-12" dir="rtl">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
                    <div className="max-w-md mx-auto">
                        <div className="divide-y divide-gray-200">
                            <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                <div className="flex justify-between items-center mb-8">
                                    <h2 className="text-2xl font-bold text-gray-900">لوحة التحكم</h2>
                                    <button
                                        onClick={handleLogout}
                                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                    >
                                        تسجيل خروج
                                    </button>
                                </div>

                                {message && (
                                    <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">
                                        {message}
                                    </div>
                                )}

                                <div className="space-y-4">
                                    {Object.entries(tempRates).map(([currency, rate]) => (
                                        <div key={currency} className="flex items-center justify-between">
                                            <label className="block text-sm font-medium text-gray-700">
                                                {currency}
                                            </label>
                                            <input
                                                type="text"
                                                value={rate}
                                                onChange={(e) => handleRateChange(currency as keyof ManualRatesString, e.target.value)}
                                                className="mt-1 block w-32 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                disabled={!isEditing}
                                            />
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-4 flex justify-end space-x-4">
                                    {!isEditing ? (
                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                        >
                                            تعديل
                                        </button>
                                    ) : (
                                        <>
                                            <button
                                                onClick={() => {
                                                    setIsEditing(false);
                                                    setTempRates({
                                                        SYP: manualRates.SYP.toString(),
                                                        IQD: manualRates.IQD.toString(),
                                                        EGP: manualRates.EGP.toString(),
                                                        LBP: manualRates.LBP.toString()
                                                    });
                                                }}
                                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                                            >
                                                إلغاء
                                            </button>
                                            <button
                                                onClick={handleSave}
                                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                            >
                                                حفظ
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
