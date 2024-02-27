import { useState } from "react";
import { CartProduct, useCartStore } from "../../store/cartStore";
import { useCountStore } from "../../store/count";

import './cart.scss'

const Cart = () => {
  const { cart } = useCartStore();
  const { increment, decrement } = useCountStore();

  const [quantity, setQuantity] = useState(1);
  const handleDecrement = () => {
    if (quantity && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };


  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };



  console.log(cart);

  return (
    <div className="cart-wrapper">
      <h2>Cart</h2>
      <ul className="cart-list">
        {cart.map((pokemon: CartProduct) => (
          <li key={pokemon.id}>
            <h3>{pokemon.name}</h3>
            <p>Price: {pokemon.price}</p>
          

            <button
              onClick={() => {
                decrement();
                handleDecrement()
              }}
            >
              -
            </button>
            <p>Quantity: {quantity ?? 1}</p>
            <button
              onClick={() => {
                increment();
               handleIncrement()
              }}
            >
              +
            </button>

            <button>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
