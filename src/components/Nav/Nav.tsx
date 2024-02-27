import Logo from "../UI/Logo/Logo";
import Cart from "../../assets/cart.svg";
import Navigation from "./Navigation";
import "./nav.scss";
import { navigationLinks } from "../constants/constants";
import { useCountStore } from "../../store/count";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const { count } = useCountStore();
  const navigate = useNavigate();

  function showCart() {
    console.log("clicked button cart");
    navigate("/cart");
  }
  return (
    <nav className="nav">
      <Logo />
      <Navigation navigationLinks={navigationLinks} />
      <picture className="nav__image-wrapper">
        <img src={Cart} alt="" onClick={showCart} />
        <p className="nav__image-wrapper--count">{count}</p>
      </picture>
    </nav>
  );
};

export default Nav;
