import { KARAT_MULTIPLIERS, TROY_OUNCE_TO_GRAM } from '../constants/gold';

export function calculateGoldPrice(ouncePrice: number, karatMultiplier: number, currencyRate = 1) {
    const gramPriceUSD = ouncePrice / TROY_OUNCE_TO_GRAM;
    return gramPriceUSD * karatMultiplier * currencyRate;
}

export function calculateMithqalPrice(ouncePrice: number, currencyRate: number) {
    const gramPrice21K = calculateGoldPrice(ouncePrice, KARAT_MULTIPLIERS.k21, currencyRate);
    return gramPrice21K * 5;
}