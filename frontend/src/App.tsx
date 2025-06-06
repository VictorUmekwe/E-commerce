import { Col, Container, Nav, Navbar, NavbarBrand, Row } from "react-bootstrap";
import { sampleProducts } from "./data";

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

        <Row>
          {sampleProducts.map((product) => (
            <Col key={product.slug} sm={6} md={4} lg={3}>
              <img src={product.image} alt={product.name} className="product-image"/>
              <h2>{product.name}</h2>
              <p>${product.price}</p>
            </Col>
          ))}
        </Row>
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
