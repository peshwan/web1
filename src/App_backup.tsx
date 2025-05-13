import { useEffect, useState } from 'react'; // Add useState, useEffect back
import { Helmet } from 'react-helmet-async'; // Import Helmet from async
import { Navigate, Route, BrowserRouter as Router, Routes, } from 'react-router-dom';
import { fetchCurrencyRates } from './api/goldPrice'; // Add fetchCurrencyRates back
import CurrencyBanner from './components/CurrencyBanner';
import { CurrencyTable } from './components/CurrencyTable';
import { Footer } from './components/Footer';
import { GoldCalculator } from './components/GoldCalculator';
import GoldInfo from './components/GoldInfo';
import { PriceCard } from './components/PriceCard';
import { AuthProvider, useAuth } from './context/AuthContext';
import { RatesProvider, useRates } from './context/RatesContext';
import { AdminPanel } from './pages/AdminPanel';
import { Login } from './pages/Login';
import NotFound from './pages/NotFound'; // Import the NotFound component
import PrivacyPolicy from './pages/PrivacyPolicy';
import CanonicalLink from './components/CanonicalLink'; // Import CanonicalLink
import { calculateMithqalPrice } from './utils/priceCalculations';

function RequireAuth({ children }: { children: JSX.Element }) {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

function HomePage() {
    // Get data from context
    const { manualRates, goldPriceUSD, lastUpdate, loading: contextLoading } = useRates();
    // State for banner-specific currency rates
    const [bannerCurrencyRates, setBannerCurrencyRates] = useState<Record<string, number> | null>(null);
    const [bannerLoading, setBannerLoading] = useState(true);

    // Fetch currency rates specifically for the banner
    useEffect(() => {
        const fetchBannerData = async () => {
            setBannerLoading(true); // Set loading true for banner data fetch
            try {
                const currencyData = await fetchCurrencyRates();
                setBannerCurrencyRates(currencyData);
            } catch (error) {
                console.error('Error fetching banner currency data:', error);
                setBannerCurrencyRates(null); // Set to null on error
            } finally {
                setBannerLoading(false);
            }
        };
        fetchBannerData();
        // Optionally, set an interval if banner rates need frequent updates
        // const interval = setInterval(fetchBannerData, 300000); // e.g., every 5 minutes
        // return () => clearInterval(interval);
    }, []);


    const mithqalPrice = goldPriceUSD && manualRates?.IQD
        ? Math.round(calculateMithqalPrice(goldPriceUSD, manualRates.IQD)).toLocaleString('ar-EG')
        : '--';

    const ouncePrice = goldPriceUSD
        ? `$${goldPriceUSD.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })}`
        : '--';

    return (
        <div dir="rtl" className="min-h-screen bg-gray-50 flex flex-col"> {/* Added flex flex-col */}
            <Helmet>
                <title>أسعار الذهب اليوم في العراق</title>
                <meta name="description" content="تحديث يومي لأسعار الذهب في العراق لجميع العيارات بالدينار العراقي. تابع أحدث الأسعار لسعر المثقال والغرام." />
                <meta name="keywords" content="أسعار الذهب اليوم العراق, سعر الذهب بالدينار العراقي, سعر مثقال الذهب" />
                {/* Add other default tags if needed */}
            </Helmet>
            {/* Pass fetched banner rates to CurrencyBanner */}
            {!bannerLoading && <CurrencyBanner currencyRates={bannerCurrencyRates} />}
            <main className="flex-grow"> {/* Added main tag and flex-grow */}
                <div className="container mx-auto px-4 pt-0 pb-4 md:py-8"> {/* Removed pt on mobile */}
                    <div className="text-center mb-4 md:mb-8"> {/* Reduced mb on mobile */}
                    <p className="text-4xl md:text-5xl font-extrabold text-gray-900">
                        أسعار الذهب الیوم في العراق
                    </p>
                </div>

                {contextLoading ? ( // Use loading state from context for main content
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto px-4 mb-8">
                            <div className="transition-transform duration-200 hover:-translate-y-1">
                                <PriceCard
                                    label="سعر مثقال الّذهب بالدينار العراقي"
                                    value={mithqalPrice}
                                    lastUpdate={lastUpdate ? `آخر تحديث: ${lastUpdate}` : ''}
                                />
                            </div>

                            <div className="transition-transform duration-200 hover:-translate-y-1">
                                <PriceCard
                                    label="سعر الاونصه‌  الذهب  بالدولار الامريكي"
                                    value={ouncePrice}
                                    lastUpdate={lastUpdate ? `آخر تحديث: ${lastUpdate}` : ''}
                                />
                            </div>
                        </div>
                        {/* Removed button from here */}
                        <div className="transition-all duration-200 hover:shadow-lg rounded-2xl mt-4">
                            {/* Pass goldPriceUSD from context and bannerCurrencyRates as the currencyRates prop */}
                            <CurrencyTable goldPrice={goldPriceUSD} currencyRates={bannerCurrencyRates} />
                        </div>
                        <div className="text-center mt-6 space-y-4"> {/* Added container div with spacing */}
                            <p className="text-gray-700">
                                موقع متخصص في متابعة أسعار الذهب الیوم في العراق سعر جرام الذهب (عيار 24, 22, 18والمثقال) وسعر الدولار في اربيل وبغداد و العملات في العراق. نوفر تحديثات يومية لأسعار الذهب بالدينار العراقي
                            </p>
                           
                        </div>
                        </>
                    )}
                </div>
            </main>
            <Footer /> {/* Footer will be pushed down by flex-grow on main */}
        </div>
    );
}

function App() {
    return (
        <Router basename="/">
            <AuthProvider>
                <RatesProvider>
                    <CanonicalLink /> {/* Add CanonicalLink here */}
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<Login />} />
                        <Route 
                            path="/admin" 
                            element={
                                <RequireAuth>
                                    <AdminPanel />
                                </RequireAuth>
                            }
                        />
                        <Route path="/calculate" element={<GoldCalculator />} />
                        <Route path="/privacy" element={<PrivacyPolicy />} />
                        <Route path="/gold-info" element={<GoldInfo />} />
                        {/* Catch-all route for 404 */}
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </RatesProvider>
            </AuthProvider>
        </Router>
    );
}

export default App;
