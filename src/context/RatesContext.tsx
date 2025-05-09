import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { fetchCurrencyRates, fetchGoldPrice } from '../api/goldPrice'; // Import both fetch functions
import { MANUAL_RATES } from '../constants/currencies';

interface ManualRates {
    SYP: number;
    IQD: number;
    EGP: number;
    LBP: number;
}

interface RatesContextType {
    manualRates: ManualRates;
    updateRates: (newRates: ManualRates) => void;
    goldPriceUSD: number | null;
    fetchedRates: Record<string, number> | null; // Add state for fetched rates (EUR, TRY, etc.)
    lastUpdate: string;
    loading: boolean;
}

const RatesContext = createContext<RatesContextType | undefined>(undefined);

const STORAGE_KEY = 'manualRates';

export function RatesProvider({ children }: { children: React.ReactNode }) {
    // Initialize state from localStorage or default values
    const [manualRates, setManualRates] = useState<ManualRates>(() => {
        const savedRates = localStorage.getItem(STORAGE_KEY);
        if (savedRates) {
            try {
                return JSON.parse(savedRates);
            } catch {
                return {
                    SYP: MANUAL_RATES.SYP,
                    IQD: MANUAL_RATES.IQD,
                    EGP: MANUAL_RATES.EGP,
                    LBP: MANUAL_RATES.LBP
                };
            }
        }
        return {
            SYP: MANUAL_RATES.SYP,
            IQD: MANUAL_RATES.IQD,
            EGP: MANUAL_RATES.EGP,
            LBP: MANUAL_RATES.LBP
        };
    });
    const [goldPriceUSD, setGoldPriceUSD] = useState<number | null>(null);
    const [fetchedRates, setFetchedRates] = useState<Record<string, number> | null>(null); // State for fetched rates
    const [lastUpdate, setLastUpdate] = useState('');
    const [loading, setLoading] = useState(true);

    // Fetch gold price and currency rates data
    const fetchData = useCallback(async () => {
        // setLoading(true); // Avoid flicker on refetch
        try {
            // Fetch both gold price and currency rates concurrently
            const [goldData, currencyData] = await Promise.all([
                fetchGoldPrice(),
                fetchCurrencyRates()
            ]);

            if (goldData !== null) {
                setGoldPriceUSD(goldData);
            }
            // Store fetched currency rates (EUR, TRY, etc.)
            setFetchedRates(currencyData);

            // Update timestamp if either fetch was successful (or always update)
            if (goldData !== null || currencyData !== null) {
                 setLastUpdate(new Date().toLocaleString('ar-EG', {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true
                }));
            }

        } catch (error) {
            console.error('Error fetching data in context:', error);
            // Decide how to handle errors (e.g., set states to null, keep old values)
            // setGoldPriceUSD(null);
            // setFetchedRates(null);
        } finally {
            setLoading(false);
        }
    }, []);

    // Fetch on mount and set interval
    useEffect(() => {
        fetchData(); // Initial fetch
        const interval = setInterval(fetchData, 60000); // Refetch every 60 seconds
        return () => clearInterval(interval); // Cleanup interval on unmount
    }, [fetchData]);


    // Save manual rates to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(manualRates));
    }, [manualRates]);

    const updateRates = (newRates: ManualRates) => {
        setManualRates(newRates);
    };

    return (
        <RatesContext.Provider value={{ manualRates, updateRates, goldPriceUSD, fetchedRates, lastUpdate, loading }}>
            {children}
        </RatesContext.Provider>
    );
}

export function useRates() {
    const context = useContext(RatesContext);
    if (context === undefined) {
        throw new Error('useRates must be used within a RatesProvider');
    }
    return context;
}
