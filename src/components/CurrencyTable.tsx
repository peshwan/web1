import { CURRENCY_DATA } from '../constants/currencies';
import { KARAT_MULTIPLIERS } from '../constants/gold';
import { calculateGoldPrice } from '../utils/priceCalculations';
import { useRates } from '../context/RatesContext';

// Currencies that should show no decimal places
const NO_DECIMAL_CURRENCIES = ['IQD', 'LBP', 'SYP', 'EGP', 'TRY', 'DZD'];

interface CurrencyTableProps {
    goldPrice: number | null;
    currencyRates: Record<string, number> | null;
}

export function CurrencyTable({ goldPrice, currencyRates }: CurrencyTableProps) {
    const { manualRates } = useRates();
    
    const getDecimalPlaces = (currencyCode: string) => {
        return NO_DECIMAL_CURRENCIES.includes(currencyCode) ? 0 : 2;
    };

    const getRate = (code: string) => {
        const upperCode = code.toUpperCase();
        if (upperCode in manualRates) {
            return manualRates[upperCode as keyof typeof manualRates];
        }
        return currencyRates?.[code.toLowerCase()] || 1;
    };

    return (
        <div className="table-container overflow-x-auto"> {/* Added overflow-x-auto */}
            <table id="currencyTable">
                <thead>
                    <tr>
                        <th className="whitespace-nowrap">العملة</th> {/* Added whitespace-nowrap */}
                        <th className="whitespace-nowrap">عيار 24</th> {/* Added whitespace-nowrap */}
                        <th className="whitespace-nowrap">عيار 22</th> {/* Added whitespace-nowrap */}
                        <th className="whitespace-nowrap">عيار 21</th> {/* Added whitespace-nowrap */}
                        <th className="whitespace-nowrap">عيار 18</th> {/* Added whitespace-nowrap */}
                        <th className="whitespace-nowrap">الاونصة</th> {/* Added whitespace-nowrap */}
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(CURRENCY_DATA).map(([currency, data], index) => {
                        const decimalPlaces = getDecimalPlaces(data.code);
                        const rate = getRate(data.code);
                        
                        return (
                            <tr key={data.code} className={index % 2 === 0 ? 'alternate-row' : ''}>
                                <td className="whitespace-nowrap"> {/* Added whitespace-nowrap */}
                                    <div className="currency-name">
                                        <img 
                                            src={`https://flagcdn.com/w40/${data.flag}.png`}
                                            className="flag"
                                            alt={`${currency} flag`}
                                        />
                                        {currency}
                                    </div>
                                </td>
                                {goldPrice ? (
                                    <>
                                        {Object.values(KARAT_MULTIPLIERS).map((multiplier, idx) => (
                                            <td key={idx} className="whitespace-nowrap"> {/* Added whitespace-nowrap */}
                                                {calculateGoldPrice(
                                                    goldPrice,
                                                    multiplier,
                                                    rate
                                                ).toLocaleString('ar-EG', {
                                                    minimumFractionDigits: decimalPlaces,
                                                    maximumFractionDigits: decimalPlaces
                                                })}
                                            </td>
                                        ))}
                                        <td className="whitespace-nowrap"> {/* Added whitespace-nowrap */}
                                            {(goldPrice * rate).toLocaleString('ar-EG', {
                                                minimumFractionDigits: decimalPlaces,
                                                maximumFractionDigits: decimalPlaces
                                            })}
                                        </td>
                                    </>
                                ) : (
                                    Array(5).fill('-').map((dash, idx) => <td key={idx} className="whitespace-nowrap">{dash}</td>) // Added whitespace-nowrap
                                )}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
