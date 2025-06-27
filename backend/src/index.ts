import express from 'express';

import 'dotenv/config';
import cors from 'cors'
import morgan from 'morgan'
import { connectDB } from './config/connectDB';
import { productRoute } from './routes/ProductRoute';
import { errorHandler, notFound } from './middleware/errorMiddleware';


const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({
    credentials: true,
    origin: ['http://localhost:5173',]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use('/api/products', productRoute)
app.use(notFound)
app.use(errorHandler)




connectDB().then(()=>{
    app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});

})