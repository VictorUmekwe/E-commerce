import {  Container, Nav, Navbar, NavbarBrand } from "react-bootstrap";
import { Outlet } from "react-router-dom";



const App = () => {
  return (
    <div className="d-flex flex-column vh-100">
      <header>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <NavbarBrand>Bahddest</NavbarBrand>
          </Container>
          <Nav>
            <a href="/cart" className="nav-link">Cart</a>
            <a href="/login" className="nav-link">Login</a>
          </Nav>
        </Navbar>
      </header>
      <main>
        <Container className="mt-3">
          <Outlet/>
   
        </Container>
      </main>
      <footer>
        <div className="text-center">

        All rights reserved &copy; {new Date().getFullYear()}
        </div>
        </footer>
    </div>
  );
};

export default App;
