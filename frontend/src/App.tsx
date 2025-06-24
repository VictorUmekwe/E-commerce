import { Container, Nav, Navbar } from "react-bootstrap";
import { Outlet } from "react-router-dom";



const App = () => {
  return (
    <div className="d-flex flex-column vh-100">
      <header>
        <Navbar bg="dark" variant="dark" expand="lg" >
           <Container >
            <Navbar.Brand>
              Bahddet Collections
            </Navbar.Brand>
           </Container>
           <Nav>
            <a className=" nav-link" href="/cart">Cart</a>
            <a className="nav-link" href="/signin">Sign In</a>
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
