import express from 'express';

import 'dotenv/config';
import cors from 'cors'
import morgan from 'morgan'
import { connectDB } from './config/connectDB';
import { productRoute } from './routes/ProductRoute';
import { errorHandler, notFound } from './middleware/errorMiddleware';
import { seedRouter } from './routes/seedRoutes';
import cookieParser from 'cookie-parser'
import { authRoute } from './routes/authRoutes';
import { orderRoutes } from './routes/orderRoutes';

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({
    credentials: true,
    origin: ['http://localhost:5173',]
}));

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(morgan('dev'));
app.use('/api/products', productRoute)
app.use('/api/auth', authRoute)
app.use('/api/order', orderRoutes)
app.use('/api/seed', seedRouter)

app.use(notFound)
app.use(errorHandler)




connectDB().then(()=>{
    app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});

})