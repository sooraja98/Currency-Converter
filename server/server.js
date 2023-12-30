import express from 'express';
import cors from 'cors';
import cryptoRoutes from './routes/cryptoRoutes.js';
import { errorHandler } from  './middleware/errorHandler.js'

const app = express();
app.use(cors());
app.use(express.json());

// Crypto routes
app.use('/api', cryptoRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
