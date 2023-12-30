import express from 'express';
import { getCryptocurrencies, convertCurrency } from '../controllers/cryptoController.js';

const router = express.Router();

router.get('/cryptocurrencies', getCryptocurrencies);
router.post('/convert', convertCurrency);

export default router;
