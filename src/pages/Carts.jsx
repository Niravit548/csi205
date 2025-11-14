import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const Carts = ({ carts = [], setCarts }) => {
  const totalPrice = carts.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="d-flex justify-content-center align-items-center flex-column mt-3">

      {Array.isArray(carts) && carts.length > 0 ? (
        carts.map((product) => (
          <Card key={product.id} style={{ width: '18rem', margin: '10px' }}>
            <Card.Img variant="top" src={product.thumbnailUrl} />
            <Card.Body className="text-center">
              <Card.Title>{product.title}</Card.Title>
              <Card.Text>
                💰 ราคา: <b>${product.price.toFixed(2)}</b>
              </Card.Text>
              <Button
                variant="danger"
                onClick={() =>
                  setCarts(carts.filter((item) => item.id !== product.id))
                }
              >
                Out Carts
              </Button>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p className="mt-3 text-muted">No items in your cart </p>
      )}

      <h4 className='cartsbackgroug'>
        Items: {carts.length} item{carts.length !== 1 && 's'} - Total Price: ${totalPrice.toFixed(2)}
      </h4>
    </div>
  );
};

export default Carts;
