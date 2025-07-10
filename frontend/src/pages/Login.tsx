// src/pages/LoginPage.tsx
import { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useLoginMutation } from "../features/auth/authApi";
import { useAppDispatch } from "../hooks/hooks";
import { setCredentials } from "../features/auth/authSlice";
import { Link, useNavigate, useLocation} from "react-router-dom";
import toast from "react-hot-toast";
import LoadingBox from "../components/LoadingBox";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, {isLoading}] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {search} = useLocation()
  const redirectInUrl = new URLSearchParams(search).get('redirect')
  const redirect = redirectInUrl ? redirectInUrl : '/'

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await login({ email, password }).unwrap();
      dispatch(setCredentials(user));
      toast.success("Logged in successfully");
      navigate(redirect);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err?.data?.message || "Invalid credentials");
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
  
    <Container className="mt-5" style={{ maxWidth: "600px" }}>
      <h2 className="my-3 fw-bold">Sign In</h2>
      <Form onSubmit={submitHandler} className="card p-3 shadow">
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </Form.Group>

        <Button type="submit" variant="primary" className="w-100 mt-2"  disabled={isLoading}>
          Login
        </Button>
        <p className="text-sm-center mt-3">Don't have an account? <Link to={`/register?redirect=${redirect}`}>Register</Link></p>
      </Form>
    </Container>
  );
};

export default LoginPage;
