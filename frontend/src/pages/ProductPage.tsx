import { useParams, useNavigate } from "react-router-dom";
import { useGetProductQuery } from "../features/product/productApi";
import LoadingBox from "../components/LoadingBox";
import toast from "react-hot-toast";
import { Badge, Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import Rating from "../components/Rating";
import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import { addItem} from "../features/cart/cartSlice";

const ProductPage = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const { slug } = params;
  const navigate = useNavigate()

  const { data: product, isLoading, error } = useGetProductQuery(slug!);
  const cart = useAppSelector((state) => state.cart);

  const addToCartHandler = () => {
    if (!product) return;

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

    
    toast.success(`${product.name} added to cart`);
    navigate('/cart')
  };

  if (isLoading) {
    return (
      <div className="text-center my-5 display-3">
        <LoadingBox />
      </div>
    );
  }

  if (error) {
    toast.error("Failed to load product. Please try again later.");
    return null;
  }

  if (!product) {
    toast.error("No product found");
    return null;
  }

  return (
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
            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
            <ListGroup.Item>
              Description:
              <p>{product.description}</p>
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
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
                        <Badge bg="success">In Stock</Badge>
                      ) : (
                        <Badge bg="danger">Unavailable</Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Button
                      variant="primary"
                      onClick={addToCartHandler}
                      className="w-100"
                    >
                      Add to cart
                    </Button>
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
