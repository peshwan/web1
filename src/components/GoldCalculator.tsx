import React, { useState } from 'react';
import { Helmet } from 'react-helmet'; // Import Helmet
import { Link } from 'react-router-dom'; // Import Link for navigation
import { useRates } from '../context/RatesContext';
import { CURRENCY_DATA } from '../constants/currencies';

// Constants for gold purity (adjust if needed)
const GOLD_PURITY: Record<string, number> = {
    '24': 0.999,
    '22': 0.9167,
    '21': 0.875,
    '18': 0.750,
};
const OUNCE_TO_GRAM = 31.1035;
const MITHQAL_TO_GRAM = 5;

// Define currency codes based on manualRates keys + USD
type ManualCurrency = keyof ReturnType<typeof useRates>['manualRates']; // SYP | IQD | EGP | LBP
type GoldType = 'mithqal' | '18' | '21' | '22' | '24';

// Generate Currency type and CURRENCY_NAMES object from CURRENCY_DATA
type CurrencyCode = typeof CURRENCY_DATA[keyof typeof CURRENCY_DATA]['code'];
type Currency = ManualCurrency | 'USD' | CurrencyCode;

const CURRENCY_NAMES: Record<Currency, string> = Object.fromEntries(
    Object.entries(CURRENCY_DATA).map(([name, data]) => [data.code, name])
) as Record<Currency, string>;

export function GoldCalculator() {
    const [goldType, setGoldType] = useState<GoldType>('21');
    const [amount, setAmount] = useState<number | null>(1);
    const [currency, setCurrency] = useState<Currency>('IQD');
    const [calculatedPriceSelected, setCalculatedPriceSelected] = useState<number | null>(null); // Price in selected currency
    const [calculatedPriceUSD, setCalculatedPriceUSD] = useState<number | null>(null); // Price always in USD

    // Access live gold price (USD per ounce) and currency rates from context
    const { manualRates, goldPriceUSD, loading } = useRates();

    const handleCalculate = () => {
        // Use goldPriceUSD from context, ensure manualRates exist
        if (loading || !amount || amount <= 0 || !goldPriceUSD || !manualRates) {
            setCalculatedPriceSelected(null);
            setCalculatedPriceUSD(null);
            return; // Need valid inputs, rates, and not be loading
        }

        let amountInGrams: number;
        let purityFactor: number;

        if (goldType === 'mithqal') {
            // Mithqal is 5 grams of 21K gold
            amountInGrams = amount * MITHQAL_TO_GRAM;
            purityFactor = GOLD_PURITY['21']; // Use 21K purity
        } else {
            // Calculate based on selected Karat purity
            purityFactor = GOLD_PURITY[goldType];
            // Assuming 'amount' for Karats is in grams directly
            amountInGrams = amount; // Amount is already in grams for Karat types
        }

        // Calculate the pure gold equivalent in grams
        const pureGoldGrams = amountInGrams * purityFactor;

        const pricePerGramUSD = goldPriceUSD / OUNCE_TO_GRAM;
        const totalValueUSD = pricePerGramUSD * pureGoldGrams; // Price based on pure gold content

        setCalculatedPriceUSD(totalValueUSD);

        // Calculate price in selected currency
        let calculatedSelected: number | null = null;
        if (currency === 'USD') {
            calculatedSelected = totalValueUSD;
        } else if (currency in manualRates) {
            const rate = manualRates[currency as ManualCurrency];
            calculatedSelected = totalValueUSD * rate;
        }
        setCalculatedPriceSelected(calculatedSelected);

    };

    // Get current date and format it
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('ar-IQ', { // Use Iraqi Arabic locale
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const formatPrice = (price: number | null, currencyCode: Currency) => {
        if (price === null) return '--';
        // Basic formatting, adjust as needed for specific currencies
        const options: Intl.NumberFormatOptions = {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        };
        const locale = currencyCode === 'USD' ? 'en-US' : 'ar-EG'; // Default Arabic locale
        const currencySymbol = currencyCode === 'USD' ? '$' : ` ${currencyCode}`; // Use code as symbol for others

        // Handle specific currency symbols if needed
        let displaySymbol = currencySymbol;
        if (currencyCode === 'IQD') displaySymbol = ' د.ع';
        if (currencyCode === 'SYP') displaySymbol = ' ل.س';
        if (currencyCode === 'EGP') displaySymbol = ' ج.م';
        if (currencyCode === 'LBP') displaySymbol = ' ل.ل';


        if (currencyCode === 'USD') {
             return `${displaySymbol}${price.toLocaleString(locale, options)}`;
        } else {
             return `${price.toLocaleString(locale, options)}${displaySymbol}`;
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <Helmet>
                <link rel="canonical" href="https://zahabprice.online/calculate" />
                <title>حاسبة  الذهب في العراق-تحويل الذهب</title>
                <meta name="description" content="استخدم حاسبة الذهب التفاعلية لحساب قيمة الذهب بالدينار العراقي أو الدولار لجميع الأعيرة (24، 22، 21، 18). تحديث مباشر لأسعار الذهب في العراق." />
                <meta name="keywords" content="حاسبة الذهب, سعر الذهب, العراق, دينار عراقي, دولار, مثقال, غرام, عيار 24, عيار 22, عيار 21, عيار 18" />
            </Helmet>
            <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">حاسبة سعر الذهب اليوم في العراق</h1> {/* Changed to H1 and updated text */}
            <p className="text-center text-gray-500 mb-6">{formattedDate}</p> {/* Added date display */}
            <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
                {/* Gold Type */}
                <div>
                    <label htmlFor="goldType" className="block text-sm font-medium text-gray-700 mb-1">نوع الذهب</label>
                    <select
                        id="goldType"
                        value={goldType}
                        onChange={(e) => setGoldType(e.target.value as GoldType)}
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="mithqal">مثقال</option> {/* Updated Label */}
                        <option value="24">عيار 24</option>
                        <option value="22">عيار 22</option>
                        <option value="21">عيار 21</option>
                        <option value="18">عيار 18</option>
                    </select>
                     <p className="text-xs text-gray-500 mt-1">المثقال = 5 غرام. العيارات الأخرى تحسب بالغرام.</p>
                </div>

                {/* Amount */}
                <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                        {goldType === 'mithqal' ? 'الكمية (عدد المثاقيل)' : 'الوزن (بالغرام)'} {/* Updated Label */}
                    </label>
                    <input
                        type="number"
                        id="amount"
                        value={amount === null ? "" : amount}
                        onChange={(e) => {
                            const value = e.target.value;
                            if (value.length > 9) {
                                return;
                            }
                            const parsedValue = value === "" ? null : parseFloat(value);
                            const truncatedValue = parsedValue === null ? null : parseFloat(parsedValue.toFixed(2));
                            setAmount(truncatedValue);
                        }}
                        min="0.01"
                        step="0.01"
                        maxLength={9}
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder={goldType === 'mithqal' ? 'أدخل عدد المثاقيل' : 'أدخل الوزن بالغرام'}
                    />
                </div>

                {/* Currency */}
                <div>
                    <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-1">العملة المطلوبة</label>
                    <select
                        id="currency"
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value as Currency)}
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    >
                        {/* Dynamically generate options from CURRENCY_NAMES */}
                        {Object.entries(CURRENCY_NAMES).map(([code, name]) => (
                            <option key={code} value={code}>{name}</option>
                        ))}
                    </select>
                </div>

                 {/* Calculate Button */}
                <button
                    onClick={handleCalculate}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-150 ease-in-out"
                >
                    احسب
                </button>
            </div>

            {/* Results */}
            {(calculatedPriceUSD !== null || calculatedPriceSelected !== null) && (
                 <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Selected Currency Card (Show if currency is not USD and price is calculated) */}
                    {currency !== 'USD' && calculatedPriceSelected !== null && (
                         <div className="bg-green-100 p-4 rounded-lg shadow order-1">
                            <h3 className="text-lg font-semibold text-green-800 mb-2">السعر بـ {CURRENCY_NAMES[currency]}</h3>
                            <p className="text-2xl font-bold text-green-900">{formatPrice(calculatedPriceSelected, currency)}</p>
                        </div>
                    )}
                     {/* Always show USD Card */}
                     {calculatedPriceUSD !== null && (
                        <div className={`bg-blue-100 p-4 rounded-lg shadow ${currency === 'USD' ? 'md:col-span-2 order-1' : 'order-2'}`}>
                            <h3 className="text-lg font-semibold text-blue-800 mb-2">السعر بالدولار الأمريكي</h3>
                            <p className="text-2xl font-bold text-blue-900">{formatPrice(calculatedPriceUSD, 'USD')}</p>
                        </div>
                     )}
                </div>
            )}

             {/* Back Link */}
             <div className="mt-6 text-center">
                <Link to="/" className="text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
                    &larr; العودة إلى الصفحة الرئيسية
                </Link>
            </div>
        </div>
    );
}
