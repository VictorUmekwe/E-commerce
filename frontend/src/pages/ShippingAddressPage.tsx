import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import { useEffect, useState } from "react";
import { saveShippingAddress } from "../features/cart/cartSlice";
import CheckoutSteps from "../components/CheckoutSteps";
import { Button, Form } from "react-bootstrap";
import toast from "react-hot-toast";

const ShippingAddressPage = () => {
  const navigate = useNavigate();
  const cart = useAppSelector((state) => state.cart);
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!user) {
      navigate("/signin?redirect=/shipping");
    }
  }, [user, navigate]);

  const [formData, setFormData] = useState({
    fullName: cart.shippingAddress.fullName || "",
    address: cart.shippingAddress.address || "",
    city: cart.shippingAddress.city || "",
    postalCode: cart.shippingAddress.postalCode || "",
    country: cart.shippingAddress.country || ""
  });

  const {fullName, address, city, postalCode, country} = formData

  const submitHandler = (e: React.FormEvent) => {
       e.preventDefault()
       
       if(!fullName || !address || !city || !postalCode || !country){
        toast.error('Please fill out fields');
        return;
       }
       dispatch(saveShippingAddress(formData))
       navigate('/payment')
  }


  return (
    <div>
        <CheckoutSteps step1 step2 ></CheckoutSteps>
        <div className="small-container container">
            <h1 className=" my-3">Shipping Address</h1>
            <Form onSubmit={submitHandler} className="card shadow p-4">
                <Form.Group className="mb-3" controlId="fullName">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control type="text" value={fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})}/>
                </Form.Group>

                 <Form.Group className="mb-3" controlId="address">
                  <Form.Label>Address</Form.Label>
                  <Form.Control type="text" value={address} onChange={(e) => setFormData({...formData, address: e.target.value})}/>
                </Form.Group>

                 <Form.Group className="mb-3" controlId="city">
                  <Form.Label>City</Form.Label>
                  <Form.Control type="text" value={city} onChange={(e) => setFormData({...formData, city: e.target.value})}/>
                </Form.Group>

                 <Form.Group className="mb-3" controlId="postalCode">
                  <Form.Label>Postal Code</Form.Label>
                  <Form.Control type="text" value={postalCode} onChange={(e) => setFormData({...formData, postalCode: e.target.value})}/>
                </Form.Group>

                 <Form.Group className="mb-3" controlId="country">
                  <Form.Label>Country</Form.Label>
                  <Form.Control type="text" value={country} onChange={(e) => setFormData({...formData, country: e.target.value})}/>
                </Form.Group>

                <div className=" mb-3">
                    <Button variant="primary" type="submit" className="w-100">Continue</Button>
                </div>
            </Form>
        </div> 
    </div>
  )
};

export default ShippingAddressPage;
