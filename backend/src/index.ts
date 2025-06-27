import express, {Request, Response} from 'express';
import { sampleProducts } from './data';
import 'dotenv/config';
import cors from 'cors'
import morgan from 'morgan'
import { connectDB } from './config/connectDB';


const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({
    credentials: true,
    origin: ['http://localhost:5173',]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/api/products', (req: Request, res: Response) => {
    res.send(sampleProducts);
});

// api for single product
app.get('/api/products/:slug', (req: Request, res: Response) => {
   res.json(sampleProducts.find((product) => product.slug === req.params.slug))
})


connectDB().then(()=>{
    app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});

})