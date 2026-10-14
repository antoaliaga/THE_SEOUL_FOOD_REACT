import Button from '../atoms/Button';
import { useCart } from '../../context/CartContext';

// Muestra "Agregar" si el producto no está en el carrito,
// y un selector  −  cantidad  +  si ya hay unidades agregadas.
function QuantityControl({ product }) {
  const { getQuantity, addToCart, decreaseItem } = useCart();
  const quantity = getQuantity(product.id);

  if (product.stock <= 0) {
    return (
      <div className="qty-slot">
        <Button variant="secondary" disabled>Sin stock</Button>
      </div>
    );
  }

  if (quantity === 0) {
    return (
      <div className="qty-slot">
        <Button variant="success" onClick={() => addToCart(product.id)}>Agregar</Button>
      </div>
    );
  }

  const atMax = quantity >= product.stock;

  return (
    <div className="qty-slot">
      <div className="qty-control" role="group" aria-label={`Cantidad de ${product.name}`}>
        <Button variant="outline-success" aria-label="Quitar una unidad" onClick={() => decreaseItem(product.id)}>
          −
        </Button>
        <span className="qty-value" aria-live="polite">{quantity}</span>
        <Button
          variant="success"
          aria-label="Agregar una unidad"
          title={atMax ? 'Stock máximo alcanzado' : undefined}
          disabled={atMax}
          onClick={() => addToCart(product.id)}
        >
          +
        </Button>
      </div>
    </div>
  );
}

export default QuantityControl;