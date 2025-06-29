import { Badge, Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import { toggleTheme } from "./features/theme/themeSlice";
import { useEffect } from "react";

const App = () => {
  const mode = useAppSelector((state) => state.theme.mode);
  const cart = useAppSelector((state) => state.cart)
  const dispatch = useAppDispatch();

  useEffect(() => {
    document.body.setAttribute("data-bs-theme", mode);
  }, [mode]);

  const handleToggle = () => {
    dispatch(toggleTheme());
  };
  return (
    <div className="d-flex flex-column vh-100">
      <header>
        <Navbar bg={mode} variant={mode} expand="lg">
          <Container>
            <Navbar.Brand>Bahddest Collections</Navbar.Brand>
          </Container>
          <Nav>
            <Button variant={mode} onClick={handleToggle}>
              <i className={mode === "light" ? "fa fa-sun" : "fa fa-moon"} />
            </Button>
            <Link className=" nav-link" to="/cart">
              Cart
              {cart.cartItems.length > 0 && (
                <Badge pill bg='danger'>
                  {cart.cartItems.reduce((a,c) => a + c.quantity, 0)}
                </Badge>
              )}
            </Link>
            <a className="nav-link" href="/signin">
              Sign In
            </a>
          </Nav>
        </Navbar>
      </header>
      <main>
        <Container className="mt-3">
          <Outlet />
        </Container>
      </main>
      <footer>
        <div className=" text-center ">
          <p>
            All rights reserved <span className=" fw-bold">Bahddest</span>
            &copy;{new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
