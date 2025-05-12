import React, { useState, useEffect } from 'react';
import { useRates } from '../context/RatesContext';

interface CurrencyBannerProps {
  currencyRates: Record<string, number> | null;
}

const CurrencyBanner: React.FC<CurrencyBannerProps> = ({ currencyRates }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { manualRates } = useRates();
  const iqdRate = manualRates.IQD;
  
  const calculateRate = (usdRate: number | undefined) => {
    if (!usdRate || !iqdRate) return 0;
    const usdToIqd = iqdRate;
    return Math.round((1 / usdRate) * usdToIqd * 100);
  };

  const currencies = [
    { name: 'USD', arabicText: 'دولار امريكي', amount: 100, rate: iqdRate * 100 },
    { name: 'GBP', arabicText: 'جنيه استرليني', amount: 100, rate: calculateRate(currencyRates?.['gbp']) },
    { name: 'EUR', arabicText: 'يورو', amount: 100, rate: calculateRate(currencyRates?.['eur']) },
    { name: 'AED', arabicText: 'درهم اماراتي', amount: 100, rate: calculateRate(currencyRates?.['aed']) },
    { name: 'TRY', arabicText: 'ليرة تركية', amount: 100, rate: calculateRate(currencyRates?.['try']) },
    { name: 'SAR', arabicText: 'ريال سعودي', amount: 100, rate: calculateRate(currencyRates?.['sar']) },
  ];

  // Create three copies of the currencies for smooth infinite scrolling
  const repeatedCurrencies = [...currencies, ...currencies, ...currencies];

  // Debug log
  console.log('IQD Rate:', iqdRate);
  console.log('Currency Rates:', currencyRates);
  console.log('Calculated Currencies:', currencies);

  return (
    <div className="currency-banner-container">
      <div className="currency-banner">
        <div className="currency-banner-content" data-nosnippet>
          {isClient && repeatedCurrencies.map((currency, index) => (
            <span key={index} className="currency-banner-item" dir="rtl">
              {currency.amount} {currency.arabicText} = {currency.rate.toLocaleString('ar-EG')} دينار عراقي
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CurrencyBanner;
