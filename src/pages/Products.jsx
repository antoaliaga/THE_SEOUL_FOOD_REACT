import { Container, Row, Col } from 'react-bootstrap';
import ProductCard from '../components/organisms/ProductCard';
import { useProducts } from '../context/ProductsContext';

function Products() {
  const { products } = useProducts();
  return (
    <Container className="my-5">
      <h1 className="text-center text-light mb-4">Productos</h1>
      <Row className="g-4 justify-content-center">
        {products.map((product) => (
          <Col key={product.id} xs={12} sm={6} lg={4} xl={3} className="d-flex">
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Products;