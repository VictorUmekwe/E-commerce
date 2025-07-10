import { Button, Container, Form } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useRegisterMutation } from "../features/auth/authApi";
import { setCredentials } from "../features/auth/authSlice";
import { useAppDispatch } from "../hooks/hooks";
import toast from "react-hot-toast";
import LoadingBox from "../components/LoadingBox";

const Register = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
     const {search} = useLocation()
     const redirectInUrl = new URLSearchParams(search).get('redirect')
  const redirect = redirectInUrl ? redirectInUrl : '/'

    const [register, {isLoading} ] = useRegisterMutation()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;

  

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if(formData.password.length < 6){
    toast.error('Password cannot be less than 6 characters')
  }else{
   try {
        const user = await register(formData).unwrap()
        dispatch(setCredentials(user));
        toast.success('User registered')
        navigate( redirect || '/')
     // eslint-disable-next-line @typescript-eslint/no-explicit-any
     } catch (err: any) {
        toast.error(err?.data?.message || 'Invalid credentials')
     }
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
    <Container className="mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="mb-3 fw-bold">Register</h2>
      <Form onSubmit={submitHandler} className="card p-3">
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
        </Form.Group>

        <Button type="submit" variant="primary" className="w-100 mt-2">
          Register
        </Button>
        <p className="text-sm-center pt-3">
          Already have an account? <Link to="/signin">Sign in</Link>
        </p>
      </Form>
    </Container>
  );
};

export default Register;
