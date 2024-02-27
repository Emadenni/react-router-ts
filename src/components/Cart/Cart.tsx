import { CartProduct, useCartStore } from "../../store/cartStore";
import { useCountStore } from "../../store/count";
import { useEffect } from "react";
import "./cart.scss";

const Cart = () => {
  const { cart, total, updateQuantity, removeProduct, emptyCart } = useCartStore();
  const { increment, decrement, resetCounts } = useCountStore();

  useEffect(() => {
   
  }, [cart]);

  const handleDecrement = (productId: string) => {
    const product = cart.find((item) => item.id === productId);
    if (product && product.quantity > 0) {
      decrement();
      updateQuantity(productId, -1);
    }
  };

  const handleIncrement = (productId: string) => {
    increment();
    updateQuantity(productId, 1);
  };

  const handleEmptyCart = () => {
    emptyCart();
  };

  return (
    <div className="cart-wrapper">
      {cart.length > 0 && <button onClick={() => { handleEmptyCart(); resetCounts(); }} className="empty_cart-button">Empty Cart</button>}

      <h2>Cart</h2>

      <ul className="cart-list">
        {cart.map((product: CartProduct) => (
          <li key={product.id}>
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>

            <button onClick={() => handleDecrement(product.id)}>-</button>
            <p>Quantity: {product.quantity}</p>
            <button onClick={() => handleIncrement(product.id)}>+</button>

            <button onClick={() => removeProduct(product.id)}>Remove</button>
          </li>
        ))}
      </ul>

      {cart.length > 0 && <p className="show-total">Total Price: ${total}</p>}

    </div>
  );
};

export default Cart;
