import axios from 'axios';
import { ErrorHandler } from '../utils/ErrorHandlingCustom.js';

const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3';

export const getCryptocurrencies = async (req, res, next) => {
    const vs_currency = req.query.vs_currency || 'usd';
    try {
        const response = await axios.get(`${COINGECKO_API_URL}/coins/markets`, {
            params: {
                vs_currency: vs_currency,
                order: 'market_cap_desc',
                per_page: 100,
                page: 1
            }
        });
        res.json(response.data);
    } catch (error) {
        next(new ErrorHandler(500, 'Error fetching data from CoinGecko'));
    }
};

export const convertCurrency = async (req, res, next) => {
    const { source, amount, target } = req.body;
    if (!source || !amount || !target) {
        return next(new ErrorHandler(400, 'Missing required parameters'));
    }

    try {
        const sourcePriceResponse = await axios.get(`${COINGECKO_API_URL}/simple/price`, {
            params: {
                ids: source,
                vs_currencies: target
            }
        });

        if (!sourcePriceResponse.data) {
            return next(new ErrorHandler(404, 'Currency not found'));
        }
        const responseData = sourcePriceResponse.data;
        const cryptocurrency = Object.keys(responseData)[0]; 
        const currency = Object.keys(responseData[cryptocurrency])[0]; 
        const price = responseData[cryptocurrency][currency]; 
        res.json({ result: price, currency: target });
    } catch (error) {
        next(new ErrorHandler(500, 'Error in conversion'));
    }
};
