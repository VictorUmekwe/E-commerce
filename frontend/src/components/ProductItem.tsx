import { Button, Card } from "react-bootstrap";
import { type Product } from "../types/Product";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const ProductItem = ({ product }: { product: Product }) => {
  return (
    <Card className="h-100">
    
      <Link to={`/product/${product.slug}`}>
        <Card.Img variant="top" src={product.image} alt={product.name} />
      </Link>

      <Card.Body className="d-flex flex-column">
        
        <Link to={`/product/${product.slug}`} className="text-decoration-none text-dark">
          <Card.Title >{product.name}</Card.Title>
        </Link>

        <Rating rating={product.rating} numReviews={product.numReviews} />

        <Card.Text className="mt-2">${product.price}</Card.Text>

        {product.countInStock === 0 ? (
          <Button variant="light" disabled className="w-100 mt-auto">
            Out of stock
          </Button>
        ) : (
          <Button className="w-100 mt-auto">Add to cart</Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default ProductItem;
