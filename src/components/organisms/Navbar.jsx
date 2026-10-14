import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import Image from '../atoms/Image';
import Button from '../atoms/Button';
import CartPanel from './CartPanel';
import AccountMenu from './AccountMenu';

function NavBar() {
  const { totalItems, showCart, openCart, closeCart } = useCart();

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <Image src="/imagenes/store-front.png" alt="Logo The Seoul Food" className="logo-nav me-2" />
            The Seoul Food
          </Navbar.Brand>
          <Button
            variant="outline-light"
            className="order-lg-last ms-auto ms-lg-2 me-2 me-lg-0"
            onClick={openCart}
            aria-label="Abrir carrito"
          >
            🛒 <Badge bg="danger">{totalItems}</Badge>
          </Button>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Inicio</Nav.Link>
              <Nav.Link as={Link} to="/products">Productos</Nav.Link>
              <Nav.Link href="#footer">Contacto</Nav.Link>
            </Nav>
            <Nav className="me-lg-2">
              <AccountMenu />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <CartPanel show={showCart} onHide={closeCart} />
    </>
  );
}

export default NavBar;