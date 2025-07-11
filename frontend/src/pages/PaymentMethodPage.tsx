import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { useEffect, useState } from "react";
import { savePaymentMethod } from "../features/cart/cartSlice";
import CheckoutSteps from "../components/CheckoutSteps";
import { Button, Form } from "react-bootstrap";
const PaymentMethodPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const payment = useAppSelector((state) => state.cart.paymentMethod);
  const shipping = useAppSelector((state) => state.cart.shippingAddress);

  const [paymentMethod, setPaymentMethod] = useState(payment || "PayPal");

  useEffect(() => {
    if (!shipping.address) {
      navigate("/shipping");
    }
  }, [shipping, navigate]);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <div className="container small-container">
      <CheckoutSteps step1 step2 step3></CheckoutSteps>

      <h1 className="my-3">Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <div className="mb-3">
          <Form.Check
            type="radio"
            id="PayPal"
            label="PayPal"
            value="PayPal"
            checked={paymentMethod === "PayPal"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
        </div>

         <div className="mb-3">
          <Form.Check
            type="radio"
            id="Stripe"
            label="Stripe"
            value="Stripe"
            checked={paymentMethod === "Stripe"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
        </div>

        <div className="mb-3">
           <Button type="submit" className="w-100">Continue</Button>
        </div>
      </Form>
    </div>
  );
};

export default PaymentMethodPage;
