import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../hooks/hooks"
import { useEffect, useState } from "react"

const PaymentMethodPage = () => {
  const navigate = useNavigate()
  const payment = useAppSelector((state) => state.cart.paymentMethod)
  const shipping = useAppSelector((state) => state.cart.shippingAddress)

  const [paymentMethod, setPaymentMethod] = useState(payment || 'PayPal')

  useEffect(() => {
    if(!shipping.address){
        navigate('/shipping')
    }
  }, [shipping, navigate])

  const submitHandler = ()
}

export default PaymentMethodPage