import express, { Request, Response } from 'express'
import { sampleProducts } from '../data';


const router = express.Router()

router.get('/', (req: Request, res: Response) => {
    res.send(sampleProducts);
});


// api for single product
router.get('/:slug', (req: Request, res: Response) => {
   res.json(sampleProducts.find((product) => product.slug === req.params.slug))
})

export {router as productRoute}