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

    // Filter CURRENCY_DATA to only include IQD and USD
    const filteredCurrencyData = Object.entries(CURRENCY_DATA)
        .filter(([, value]) => value.code === 'IQD' || value.code === 'USD') // Ignore key from [key, value] pair
        .reduce((obj, [key, value]) => {
            obj[key as keyof typeof CURRENCY_DATA] = value; // Assert key type for indexing
            return obj;
        }, {} as typeof CURRENCY_DATA);
    
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
        <div className="table-container box-border overflow-x-auto w-full"> {/* Added box-border */}
            <table id="currencyTable" className="w-full table-fixed"> {/* Changed table-auto to table-fixed */}
                <thead>
                    <tr>
                        <th className="whitespace-nowrap sticky left-0 bg-[#f0f0f0] z-10">العملة</th> {/* Changed bg-white to bg-[#f0f0f0] */}
                        <th className="whitespace-nowrap text-center">عيار 24</th> {/* Added text-center */}
                        <th className="whitespace-nowrap text-center">عيار 22</th> {/* Added text-center */}
                        <th className="whitespace-nowrap text-center">عيار 21</th> {/* Added text-center */}
                        <th className="whitespace-nowrap text-center">عيار 18</th> {/* Added text-center */}
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(filteredCurrencyData).map(([currency, data]) => { // Removed unused 'index'
                        const decimalPlaces = getDecimalPlaces(data.code);
                        const rate = getRate(data.code);
                        
                        return (
                            <tr key={data.code}>
                                <td className="whitespace-nowrap sticky left-0 z-10">
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
                                            <td key={idx} className="whitespace-nowrap text-center"> {/* Added text-center */}
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
                                    </>
                                ) : (
                                    Array(4).fill('-').map((dash, idx) => <td key={idx} className="whitespace-nowrap text-center">{dash}</td>) // Added text-center
                                )}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
