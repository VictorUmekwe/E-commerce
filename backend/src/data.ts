import bcrypt from 'bcryptjs'
import { IUser } from './models/UserModel'
import { IProduct } from './models/ProductModel'



export const sampleProducts: IProduct[] = [
    {
        name:'Nike Slim Shirt',
        slug:'nike-slim-shirt',
        image:'/images/p1.jpg',
        category:'Shirts',
        brand:'Nike',
        price:120,
        countInStock:25,
        description:'high quality shirt',
        rating:4.5,
        numReviews:10,
    },
    {
        name:'Adidas Fit Shirt',
        slug:'adidas-fit-shirt',
        image:'/images/p2.jpg',
        category:'Shirts',
        brand:'Adidas',
        price:100,
        countInStock:20,
        description:'high quality shirt',
        rating:4.0,
        numReviews:15,
    },
    {
        name:'Lacoste Free Shirt',
        slug:'lacoste-free-shirt',
        image:'/images/p3.jpg',
        category:'Shirts',
        brand:'Lacoste',
        price:220,
        countInStock:0,
        description:'high quality shirt',
        rating:4.8,
        numReviews:17,
    },
    {
        name: 'Puma Slim Pant',
        slug: 'puma-slim-pant',
        image: '/images/p4.jpg',        
        category: 'Pants',
        brand: 'Puma',
        price: 78,
        countInStock: 15,
        description: 'high quality pant',
        rating: 4.2,
        numReviews: 12,
    }
]


export const sampleUsers:IUser[] = [
    {
        name: 'Victor',
        email: 'admin@gmail.com',
        password: bcrypt.hashSync('123456'),
        isAdmin: true,
    },

    {
        name: 'John',
        email: 'user@gmail.com',
        password: bcrypt.hashSync('123456'),
        isAdmin: false,
    }
]