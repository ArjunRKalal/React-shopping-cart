import "./Header.css";
import Search from "../../Assets/Icons/search.png";
import Cart from "../../Assets/Icons/cart.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FILTER, SEARCHING } from "../../actions";

function Header(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { shoppingCart } = props.state;

  const handleCartNavigate = () => {
    navigate(`/cart`);
  };

  const handleInputChange = (e) => {
    dispatch({ type: SEARCHING, payload: e.target.value });
    if (!e.target.value) {
      dispatch({ type: FILTER, payload: "All items" });
    }
  };

  const handleLogoClick = () => {
    navigate(`/`);
  };

  return (
    <header className="header">
      <div className="logo" onClick={handleLogoClick}>
        Shopping Cart
      </div>
      {window.location.pathname === "/" ? (
        <nav className="nav">
          <div className="searchfield">
            <label htmlFor="search">
              <img src={Search} alt="search-icon" />
            </label>

            <input
              type="text"
              id="search"
              placeholder="Search..."
              onChange={handleInputChange}
            />
          </div>
          <button className="cart" onClick={handleCartNavigate}>
            <span>Cart</span>
            <img src={Cart} alt="cart-icon" />
            {shoppingCart.length > 0 && (
              <span className="cart-notification"></span>
            )}
          </button>
        </nav>
      ) : (
        <div></div>
      )}
    </header>
  );
}

export default Header;
