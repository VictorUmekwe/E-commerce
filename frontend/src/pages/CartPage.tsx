import { Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import toast from "react-hot-toast";
import {
  addItem,
  removeItem,
  calculatePrices,
} from "../features/cart/cartSlice";

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);
  const mode = useAppSelector((state) => state.theme.mode)

  const updateCartHandler = (itemId: string, quantity: number) => {
    const item = cart.cartItems.find((x) => x._id === itemId);
    if (!item) return;

    if (item.countInStock < quantity) {
      toast.error("Product is out of stock");
      return;
    }

    dispatch(addItem({ ...item, quantity }));
    dispatch(calculatePrices());
  };

  const removeItemHandler = (itemId: string) => {
    const item = cart.cartItems.find((x) => x._id === itemId);
    if (!item) return;
    dispatch(removeItem(item));
    dispatch(calculatePrices());
    toast.success("Item removed");
  };
  
  const checkoutHandler = () => {
    navigate('/signin?redirect=/shipping' )
  }
  return (
    <div>
      <h1>Shopping Cart</h1>
      <Row>
        <Col md={8}>
          {cart.cartItems.length === 0 ? (
            <div>
              <h3>Your cart is empty.</h3>
              <Link to="/">Go shopping</Link>
            </div>
          ) : (
            <ListGroup variant="flush" >
              {cart.cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row className="align-items-center ">
                    <Col md={2}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded"
                      />
                    </Col>

                    <Col md={3}>
                      <Link to={`/product/${item.slug}`}>{item.name}</Link>
                    </Col>

                    <Col md={2}>${item.price}</Col>

                    <Col md={3} className="d-flex align-items-center gap-2">
                      <Button
                        variant={mode}
                        disabled={item.quantity === 1}
                        onClick={() =>
                          updateCartHandler(item._id, item.quantity - 1)
                        }
                      >
                        <i className="fas fa-minus-circle"></i>
                      </Button>{" "}
                      <span>{item.quantity}</span>
                      <Button
                        variant={mode}
                        disabled={item.quantity === item.countInStock}
                        onClick={() =>
                          updateCartHandler(item._id, item.quantity + 1)
                        }
                      >
                        <i className="fas fa-plus-circle"></i>
                      </Button>{" "}
                    </Col>

                    <Col md={2}>
                      <Button
                        variant={mode}
                        onClick={() => removeItemHandler(item._id)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>

        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h4>
                    Subtotal (
                    {cart.cartItems.reduce((a, c) => a + c.quantity, 0)} items):
                    ${cart.totalPrice.toFixed(2)}
                  </h4>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      variant="primary"
                      disabled={cart.cartItems.length === 0}
                      className="w-100"
                      onClick={checkoutHandler}
                    >
                      Proceed to Checkout
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CartPage;
