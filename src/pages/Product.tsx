import { useParams } from "react-router-dom";
import { Props } from "../components/Card/Card";
import { data, imageString } from "../components/constants/constants";
import "./product.scss";
import { useState } from "react";

import { useCountStore } from "../store/count";
import { useCartStore } from "../store/cartStore";
import { CartProduct } from "../store/cartStore";

//Efter att ett villkor är mött, ska vi rendera produktinformationen.

//Om id´t i parametern, matchar id´t i data objektet.
//Rendera JSX (Visa Rätt UI för användaren)
const Product = () => {
  const { id } = useParams();
  const [show, setShow] = useState(false);
  /*   const [count, setCount] = useState<number>(0); */
  const { increment } = useCountStore();

  const { addToCart } = useCartStore();

  const pokemon = data.find((pokemon) => pokemon.id === id);

  if (!pokemon) {
    <div>Pokemon not found</div>;
  }

  const { desc, name } = pokemon as Props;

  const handleClick = () => {
    setShow((prevValue) => !prevValue);
  };

  const handleAddToCart = () => {
    addToCart(pokemon as unknown as CartProduct);
  };
  console.log("cart array", useCartStore.getState().cart);
  return (
    <section className="product-wrapper">
      <picture>
        <img src={imageString} alt="" />
      </picture>
      <article className="product-wrapper__product-info">
        {show && (
          <>
            <h4>{name}</h4>
            <p>{desc}</p>
            <div className="add-to-cart">
              <button
                onClick={() => {
                  increment();
                  handleAddToCart();
                }}
              >
                Add To cart
              </button>
            </div>
          </>
        )}
        <button onClick={handleClick}>{show ? <span>See Less</span> : <span>See More</span>}</button>
      </article>
    </section>
  );
};

export default Product;
