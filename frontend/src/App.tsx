import { Badge, Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import { toggleTheme } from "./features/theme/themeSlice";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { logout } from "./features/auth/authSlice";
import { useLogoutMutation } from "./features/auth/authApi";


const App = () => {
  const mode = useAppSelector((state) => state.theme.mode);
  const cart = useAppSelector((state) => state.cart);
  const {user} = useAppSelector((state) => state.auth)
  const navigate = useNavigate()
  const [logoutUser] = useLogoutMutation()
  const dispatch = useAppDispatch();

  const handleLogout = async() => {
    try {
      await logoutUser().unwrap()
      dispatch(logout())
      navigate('/signin')
      toast.success('Logout successful!')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('Logout failed')
    }
  }

  useEffect(() => {
    document.body.setAttribute("data-bs-theme", mode);
  }, [mode]);

  const handleToggle = () => {
    dispatch(toggleTheme());
  };
  return (
    <div className="d-flex flex-column vh-100">
      <Toaster position="top-center" reverseOrder={false} />

      <header>
        <Navbar bg={mode} variant={mode} expand="lg">
          <Container>
            <Link to="/" className=" fw-bolder text-decoration-none">
              <Navbar.Brand>Bahddest Collections</Navbar.Brand>
            </Link>
          </Container>
          <Nav>
            <Button variant={mode} onClick={handleToggle}>
              <i className={mode === "light" ? "fa fa-sun" : "fa fa-moon"} />
            </Button>
            <Link className=" nav-link" to="/cart">
              Cart
              {cart.cartItems.length > 0 && (
                <Badge pill bg="danger">
                  {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                </Badge>
              )}
            </Link>
             {user ? (
              <NavDropdown title={user.name} id="basic-nav-dropdown"  >
                
                   <Link className="dropdown-item z-3" to='#signout' onClick={handleLogout}>
                   Logout
                   </Link>
              </NavDropdown>
             ) : (
              <Link className="nav-link" to='/signin'>
                Login
              </Link>
             )}
             {!user ? (<Link className="nav-link" to="/register">Register</Link>) : ("")}
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
