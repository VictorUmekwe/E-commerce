import { Col, Row } from "react-bootstrap";
import { sampleProducts } from "../data";
import { Link } from "react-router-dom";
const HomePage = () => {
  return (
    <Row>
      {sampleProducts.map((product) => (
        <Col key={product.slug} className="card" sm={6} md={4} lg={3}>
          <Link to={`/product/${product.slug}`}>
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />
            <h2>{product.name}</h2>
            <p>Price: ${product.price}</p>
            <p>Brand: {product.brand}</p>
            <p>Category: {product.category}</p>
            <p>Rating: {product.rating} stars</p>
            <p>{product.description}</p>
          </Link>
        </Col>
      ))}
    </Row>
  );
};

export default HomePage;
