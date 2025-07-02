import { Button, Card } from "react-bootstrap";
import { type Product } from "../types/Product";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { addItem, calculatePrices } from "../features/cart/cartSlice";
import Rating from "./Rating";
import toast from "react-hot-toast";

const ProductItem = ({ product }: { product: Product }) => {
  const cart = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const addToCartHandler = async () => {
    const existingItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existingItem ? existingItem.quantity + 1 : 1;

    if (product.countInStock < quantity) {
      toast.error("Sorry, product is out of stock");
      return;
    }
    dispatch(
      addItem({
        _id: product._id,
        name: product.name,
        slug: product.slug,
        image: product.image,
        price: product.price,
        countInStock: product.countInStock,
        quantity,
      })
    );
     dispatch(calculatePrices())
    toast.success(`${product.name} added to cart`);
  };

  return (
    <Card className="h-100">
      <Link to={`/product/${product.slug}`}>
        <Card.Img variant="top" src={product.image} alt={product.name} />
      </Link>

      <Card.Body className="d-flex flex-column">
        <Link to={`/product/${product.slug}`} className="text-decoration-none ">
          <Card.Title>{product.name}</Card.Title>
        </Link>

        <Rating rating={product.rating} numReviews={product.numReviews} />

        <Card.Text className="mt-2">${product.price}</Card.Text>

        {product.countInStock === 0 ? (
          <Button variant="light" disabled className="w-100 mt-auto">
            Out of stock
          </Button>
        ) : (
          <Button className="w-100 mt-auto" onClick={addToCartHandler}>
            Add to cart
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default ProductItem;
