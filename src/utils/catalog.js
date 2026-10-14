import baseProducts from '../data/products';

const ADDED_KEY = 'productosAgregados';
const EDITED_KEY = 'productosEditados';
const DELETED_KEY = 'productosEliminados';

function read(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

// Evita stock negativo, decimal o vacío
function cleanStock(value) {
  return Math.max(0, Math.floor(Number(value)) || 0);
}

function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function loadCatalog() {
  const added = read(ADDED_KEY, []);
  const edited = read(EDITED_KEY, {});
  const deleted = read(DELETED_KEY, []);

  const base = baseProducts
    .filter((p) => !deleted.includes(p.id))
    .map((p) => (edited[p.id] ? { ...p, ...edited[p.id] } : p));

  return [...base, ...added];
}

export function createProduct({ name, image, price, description, stock }) {
  const product = {
    id: 'ADM-' + Date.now(),
    name,
    image,
    price: Number(price),
    description,
    stock: cleanStock(stock),
  };
  write(ADDED_KEY, [...read(ADDED_KEY, []), product]);
  return product;
}

export function saveEdit(id, price, stock) {
  const values = { price: Number(price), stock: cleanStock(stock) };
  if (String(id).startsWith('ADM-')) {
    write(
      ADDED_KEY,
      read(ADDED_KEY, []).map((p) => (p.id === id ? { ...p, ...values } : p))
    );
  } else {
    write(EDITED_KEY, { ...read(EDITED_KEY, {}), [id]: values });
  }
}

export function removeProduct(id) {
  if (String(id).startsWith('ADM-')) {
    write(ADDED_KEY, read(ADDED_KEY, []).filter((p) => p.id !== id));
  } else {
    write(DELETED_KEY, [...read(DELETED_KEY, []), id]);
  }
}