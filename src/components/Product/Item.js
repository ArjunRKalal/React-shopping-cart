import "./Item.css";
import Star from "../../Assets/Icons/star.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ADD_TO_CART, REMOVE } from "../../actions";

function Item(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { item } = props;
  const handleNavigate = (item) => {
    navigate(`/products/${item.title}`);
  };

  const handleAddToCart = () => {
    dispatch({ type: item.added ? REMOVE : ADD_TO_CART, payload: item.id });
  };

  return (
    <div className="Item">
      <div className="item-thumbnail" onClick={() => handleNavigate(item)}>
        <img src={item.image} alt={item.title}></img>
      </div>
      <div className="body">
        <h2 onClick={handleNavigate}>{item.title}</h2>
        <span className="price">$ {item.price}</span>
        <span className="category">{item.category}</span>
      </div>
      <div className="footer">
        <div className="rating">
          <p className="grade">{item.rating.rate}</p>
          <img src={Star} alt="star-icon" className="ratinglogo" />
        </div>
        <button
          className={item.added ? "buttonAddToCart added" : "buttonAddToCart"}
          onClick={handleAddToCart}
        >
          {item.added ? "Remove" : "Add to cart"}
        </button>
      </div>
    </div>
  );
}

export default Item;
