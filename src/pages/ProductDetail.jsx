import { Container, Card } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import Image from '../components/atoms/Image';
import Text from '../components/atoms/Text';
import Button from '../components/atoms/Button';
import QuantityControl from '../components/molecules/QuantityControl';
import { useProducts } from '../context/ProductsContext';


function ProductDetail() {
  const { id} = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <Container className="my-5">
        <h1>Producto no encontrado</h1>
        <Button variant="secondary" onClick={() => navigate('/products')}>
          Volver a productos
        </Button>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Card className="detail-card mx-auto">
        <Image src={product.image} alt={product.name} className="card-img-top product-img" />
        <Card.Body className="text-center">
          <Text variant="h2">{product.name}</Text>
          <Text variant="p">{product.description}</Text>
          <Text variant="h4">
            <span className="text-success">Precio:</span>{' '}
            ${product.price.toLocaleString('es-CL')}
          </Text>
          <div className="d-flex flex-wrap align-items-center justify-content-center gap-2">
            <QuantityControl product={product} />
            <Button variant="secondary" onClick={() => navigate(-1)}>
              Volver
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ProductDetail;