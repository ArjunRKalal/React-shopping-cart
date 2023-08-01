import { useParams } from "react-router-dom";
import "./ProductDetailsPage.css";
import { useDispatch } from "react-redux";
import { ADD_TO_CART, REMOVE } from "../actions";

function ProductsDetailsPage(props) {
  const { title } = useParams();
  const { items } = props.state;
  const item = items.find((index) => index.title.trim() === title?.trim());
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch({ type: item.added ? REMOVE : ADD_TO_CART, payload: item.id });
  };

  return (
    <section className="detail">
      <article className="thumbnail">
        <img src={item.image} alt={item.title} />
      </article>
      <article className="detailinfo">
        <div className="detailinfoheader">
          <h2>{item.title}</h2>
          <button className={item.added ? "buttonAddToCart added" : "buttonAddToCart"} onClick={handleAddToCart}>
            {item.added ? "Remove" : "Add to cart"}
          </button>
        </div>
        <div className="detailinfometa">
          <span className="detailprice">${item.price}</span>
          <div className="rating">
            <p className="grade">{item.rating.rate}</p>
            <img
              src="/static/media/star.f18b2fadf3b42309674806de99238168.svg"
              alt=""
              className="ratinglogo"
            />
          </div>
        </div>
        <p className="detailinfodescription">{item.description}</p>
      </article>
    </section>
  );
}

export default ProductsDetailsPage;
