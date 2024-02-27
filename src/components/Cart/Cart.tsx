import { CartProduct, useCartStore } from "../../store/cartStore";
import { useCountStore } from "../../store/count";
import { useInternalCountStore } from "../../store/productCount";
import './cart.scss'

const Cart = () => {
  const { cart } = useCartStore();
  const { increment, decrement } = useCountStore();
  const { internalIncrement, internalDecrement, internalCount } = useInternalCountStore();

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
                internalDecrement();
              }}
            >
              -
            </button>
            <p>{internalCount}</p>
            <button
              onClick={() => {
                increment();
                internalIncrement();
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
