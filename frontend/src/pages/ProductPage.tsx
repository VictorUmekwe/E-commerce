import { useParams } from "react-router-dom";
import { useGetProductQuery } from "../features/product/productApi";
import LoadingBox from "../components/LoadingBox";
import toast from "react-hot-toast";
import { Badge, Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import Rating from "../components/Rating";

const ProductPage = () => {
  const params = useParams();
  const { slug } = params;
  const { data: product, isLoading, error } = useGetProductQuery(slug!);

  return isLoading ? (
    <div className="text-center my-5 display-3">
      <LoadingBox />
    </div>
  ) : error ? (
    toast.error("Failed to load product. Please try again later.")
  ) : !product ? (
    toast.error("No product found")
  ) : (
    <div>
      <Row>
        <Col md={6}>
          <img className="large" src={product.image} alt={product.name} />
        </Col>
        <Col md={3}>
          <ListGroup>
            <ListGroup.Item>
              <h1>{product.name}</h1>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating rating={product.rating} numReviews={product.numReviews} />
            </ListGroup.Item>
            <ListGroup.Item>
              Price : ${product.price}
            </ListGroup.Item>
            <ListGroup.Item>
              Description: 
              <p>{product.description}</p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
        <Card>
            <Card.Body>
              <ListGroup>
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>${product.price}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                    {product.countInStock > 0 ? (
                      <Badge bg='success'>
                        In Stock
                      </Badge>
                    ) : (<Badge bg='danger'>Unavailable</Badge>)}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Button variant="primary">Add to cart</Button>
                    </Row>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
        </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProductPage;
