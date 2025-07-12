import { useEffect } from "react";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { Link, useNavigate } from "react-router-dom";
import { calculatePrices, clearCart } from "../features/cart/cartSlice";
import CheckoutSteps from "../components/CheckoutSteps";
import { useCreateOrderMutation } from "../features/order/orderApi";
import toast from "react-hot-toast";
import LoadingBox from "../components/LoadingBox";

const PlaceOrderPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cart = useAppSelector((state) => state.cart);
  const [createOrder, { isLoading }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.paymentMethod) {
      navigate("/payment");
    }
    dispatch(calculatePrices());
  }, [dispatch, cart.paymentMethod, navigate]);

  const placeOrderHandler = async () => {
    try {
      const order = {
        orderItems: cart.cartItems.map((item) => ({
          _id:item._id,
          name: item.name,
          slug: item.slug,
          image:item.image,
          price: item.price,
          quantity: item.quantity,
          countInStock: item.countInStock,
          Product: item._id, // must match with my backend OrderModel field name
        })),
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      };

      const res = await createOrder(order).unwrap();
      if (res?._id) {
        dispatch(clearCart());
        toast.success("Order placed successfully!");
        navigate(`/order/${res._id}`);
      } else {
        toast.error("Order placement failed. No order ID returned.");
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.message || "Order failed");
    }
  };

  if (isLoading) {
    return (
      <div className="text-center my-5 display-3">
        <LoadingBox />
      </div>
    );
  }

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row className="my-3">
        <Col md={8}>
          {/* Shipping Info */}
          <Card className="mb-3 shadow">
            <Card.Body>
              <h2>Shipping</h2>
              <p>
                <strong>Name:</strong> {cart.shippingAddress.fullName} <br />
                <strong>Address:</strong>{" "}
                {`${cart.shippingAddress.address}, ${cart.shippingAddress.city}, ${cart.shippingAddress.country}, ${cart.shippingAddress.postalCode}`}
              </p>
              <Link to="/shipping" className="btn btn-outline-primary">
                Edit
              </Link>
            </Card.Body>
          </Card>

          {/* Payment Info */}
          <Card className="mb-3 shadow">
            <Card.Body>
              <h2>Payment Method</h2>
              <p>
                <strong>Method:</strong> {cart.paymentMethod}
              </p>
              <Link to="/payment" className="btn btn-outline-primary">
                Edit
              </Link>
            </Card.Body>
          </Card>

          {/* Order Items */}
          <Card className="mb-3 shadow">
            <Card.Body>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <p>Your cart is empty</p>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item) => (
                    <ListGroup.Item key={item._id}>
                      <Row className="align-items-center">
                        <Col md={2}>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="img-fluid rounded"
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.slug}`}>{item.name}</Link>
                        </Col>
                        <Col md={4}>
                          {item.quantity} x ${item.price} = $
                          {item.quantity * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
              <Link to="/cart" className="btn btn-outline-primary mt-2">
                Edit
              </Link>
            </Card.Body>
          </Card>
        </Col>

        {/* Order Summary */}
        <Col md={4}>
          <Card className="shadow">
            <Card.Body>
              <h2>Order Summary</h2>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>${cart.itemsPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>${cart.shippingPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>${cart.taxPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Total</Col>
                    <Col>${cart.totalPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    type="button"
                    className="w-100 mt-3"
                    disabled={cart.cartItems.length === 0 || isLoading}
                    onClick={placeOrderHandler}
                  >
                    Place Order
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PlaceOrderPage;
