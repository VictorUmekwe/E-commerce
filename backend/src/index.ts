import exprss from 'express';
import 'dotenv/config';
import cors from 'cors'


const app = exprss();
const PORT = process.env.PORT || 5001;

app.use(cors({
    credentials: true,
    origin: ['http://localhost:5173',]
}));

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});