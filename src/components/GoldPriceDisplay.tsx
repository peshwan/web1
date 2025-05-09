import { useEffect, useState } from 'react';
import { fetchGoldPrice } from '../api/goldPrice';

export default function GoldPriceDisplay() {
    const [price, setPrice] = useState<number | null>(null);
    const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
    const [error, setError] = useState<string | null>(null);

    const fetchPrice = async () => {
        try {
            const goldPrice = await fetchGoldPrice();
            if (goldPrice !== null) {
                setPrice(goldPrice);
                setLastUpdated(new Date());
                setError(null);
            } else {
                setError('Failed to fetch gold price');
            }
        } catch (err) {
            setError('Error connecting to price service');
            console.error('Price fetch error:', err);
        }
    };

    useEffect(() => {
        fetchPrice();
        const interval = setInterval(fetchPrice, 60 * 1000); // Refresh every 1 minute
        return () => clearInterval(interval);
    }, []);

    const formatPrice = (value: number | null) => {
        if (value === null) return 'N/A';
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(value);
    };

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('ar-EG', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        }).format(date);
    };

    return (
        <div className="bg-white rounded-2xl shadow-md p-3 md:p-6 text-center relative overflow-hidden w-full" 
             title="سعر الذهب اليوم - سعر الاونصه‌  الذهب  بالدولار الامريكي">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-yellow-500 to-red-500"></div>
            <div className="text-base text-gray-700 mb-4">سعر الاونصه‌  الذهب  بالدولار الامريكي</div>
            {error ? (
                <div className="text-red-500 mb-3">{error}</div>
            ) : (
                <div className="text-4xl font-bold text-blue-600 mb-3" style={{ fontFamily: 'Arial' }}>
                    {price ? formatPrice(price) : 'Loading...'}
                </div>
            )}
            <div className="text-xs text-gray-500 mt-2">
                آخر تحديث: {formatDate(lastUpdated)}
            </div>
        </div>
    );
}