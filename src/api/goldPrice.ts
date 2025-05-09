export async function fetchGoldPrice(): Promise<number | null> {
    try {
        const response = await fetch('https://data-asg.goldprice.org/dbXRates/USD');
        const data = await response.json();
        return data?.items?.[0]?.xauPrice ?? null;
    } catch (error) {
        console.error('Error fetching gold price:', error);
        return null;
    }
}

export async function fetchCurrencyRates() {
    try {
        const response = await fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json');
        const data = await response.json();
        return data.usd;
    } catch (error) {
        console.error('Error fetching currency rates:', error);
        return null;
    }
}