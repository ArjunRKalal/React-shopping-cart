import { useNavigate } from "react-router-dom";
import "./OrderSuccessPage.css";
import { useDispatch } from "react-redux";
import { FILTER, RESET } from "../actions";

function OrderSuccessPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleContinueShopping = () => {
    dispatch({ type: FILTER, payload: "All items" });
    dispatch({ type: RESET });
    navigate("/");
  };

  return (
    <section>
      <div>
        <h2>Your order has been received</h2>
        <p>Thank you for your purchase</p>
        <p>Your order id is: 34562</p>
        <p>
          You will receive an order confirmation email with details of your
          order and a link to track its progress
        </p>
        <button className="button-shopping" onClick={handleContinueShopping}>
          Continue Shopping
        </button>
      </div>
    </section>
  );
}

export default OrderSuccessPage;
