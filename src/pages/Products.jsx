import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Products({ products, carts, setCarts }) {
  return (
    <div className="d-flex justify-content-center">
      <div className="products-item-container products-container d-flex flex-wrap gap-3">
        {products.map((product) => {
          const isAdded = carts.find((item) => item.id === product.id);

          return (
            <Card style={{ width: '18rem' }} key={product.id}>
              <Card.Img variant="top" src={product.thumbnailUrl} />
              <Card.Body className="text-center">
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>
                  <b>${product.price.toFixed(2)}</b>
                </Card.Text>

                {isAdded ? (
                  <span className="badge bg-danger">Added</span>
                ) : (
                  <Button
                    variant="outline-primary"
                    onClick={() => setCarts([...carts, product])}
                  >
                    Add To Cart
                  </Button>
                )}
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default Products;
