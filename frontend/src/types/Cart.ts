export type CartItem = {
  _id: string;
  image?: string ;
  slug: string;
  quantity: number;
  countInStock: number;
  price: number;
  name: string;
};

export type ShippingAddress ={
    fullName: string;
    address: string;
    city: string;
    country: string;
    postalCode: string;
}

export type Cart ={
    cartItems: CartItem[];
    shippingAddress: ShippingAddress;
    paymentMethod: string;
    itemsPrice: number;
    shippingPrice: number;
    taxPrice: number;
    totalPrice: number;
    
}