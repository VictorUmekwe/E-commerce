import { Button, Card } from "react-bootstrap";
import { type Product } from "../types/Product";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const ProductItem = ({ product }: { product: Product }) => {
  return (
    <Card>
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} className=" card-img-top" alt={product.name} />
        <Card.Body>
          <Link to={`/product/${product.slug}`}>
            <Card.Title>{product.name}</Card.Title>
          </Link>
          <Rating rating={product.rating} numReviews={product.numReviews} />
          <Card.Text>${product.price}</Card.Text>
          {product.countInStock === 0 ? (
            <Button variant="light" disabled className=" w-100 ">
              Out of stock
            </Button>
          ) : (
            <Button className=" w-100 ">Add to cart</Button>
          )}
        </Card.Body>
      </Link>
    </Card>
  );
};

export default ProductItem;
