import express, {Request, Response} from 'express';
import { sampleProducts } from './data';
import 'dotenv/config';
import cors from 'cors'
import morgan from 'morgan'


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

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});