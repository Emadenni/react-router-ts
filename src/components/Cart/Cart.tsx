import { CartProduct, useCartStore } from "../../store/cartStore";
import { useCountStore } from "../../store/count";

import "./cart.scss";

const Cart = () => {
  const { cart, updateQuantity, removeProduct, emptyCart } = useCartStore();
  const { increment, decrement, resetCounts } = useCountStore();

  const handleDecrement = (productId: string) => {
    decrement();
    updateQuantity(productId, -1);
  };

  const handleIncrement = (productId: string) => {
    increment();
    updateQuantity(productId, 1);
  };

  const handleEmptyCart = () => {
    emptyCart()
  }
  

  return (
    <div className="cart-wrapper">
{cart.length > 0 && <button onClick={() => { handleEmptyCart(); resetCounts(); }} className="empty_cart-button">Empty Cart</button>}


      <h2>Cart</h2>
      
      <ul className="cart-list">
          {cart.map((pokemon: CartProduct) => (
            <li key={pokemon.id}>
            <h3>{pokemon.name}</h3>
            <p>Price: {pokemon.price}</p>

            <button onClick={() => (pokemon.quantity > 1 ? handleDecrement(pokemon.id) : null)}>-</button>

            <p>Quantity: {pokemon.quantity}</p>
            <button onClick={() => handleIncrement(pokemon.id)}>+</button>
            <button onClick={() => removeProduct(pokemon.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
