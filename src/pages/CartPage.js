import "./CartPage.css";
import trash from "../Assets/Icons/trash.svg";
import { useDispatch } from "react-redux";
import { CHANGE_QUANTITY, REMOVE, SET_AMOUNT } from "../actions";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CartPage(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { shoppingCart } = props.state;
  const [totalAmount, setTotalAmount] = useState({
    subtotal: 0,
    taxes: 0,
    total: 0,
  });

  useEffect(() => {
    if (shoppingCart.length > 0) {
      let subtotal = 0;
      let taxes = 0;
      let total = 0;

      shoppingCart.forEach((item) => {
        subtotal += item.price * item.quantity;
        taxes += subtotal * 0.18;
      });

      total = subtotal + taxes;

      setTotalAmount({
        subtotal: Number(subtotal.toFixed(2)),
        taxes: Number(taxes.toFixed(2)),
        total: Number(total.toFixed(2)),
      });
    }
  }, [shoppingCart]);

  const handleCheckoutClick = () => {
    dispatch({
      type: SET_AMOUNT,
      payload: totalAmount.total,
    });
    navigate("/checkout");
  };

  const handleQunatityChange = (e, product) => {
    dispatch({
      type: CHANGE_QUANTITY,
      payload: { id: product.id, quantity: Number(e.target.value) },
    });
  };

  return (
    <section className="cart-container">
      {shoppingCart.length > 0 ? (
        <section className="content">
          <article className="products">
            {shoppingCart.map((product) => (
              <div className="product">
                <div className="cart-thumbnail">
                  <img src={product.image} alt={product.title} />
                </div>
                <div className="product-content">
                  <div>
                    <h2>{product.title}</h2>
                    <span>${product.price}</span>
                    <select
                      defaultValue={product.quantity}
                      onChange={(e) => handleQunatityChange(e, product)}
                    >
                      <option value="1" selected="">
                        1
                      </option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                    </select>
                  </div>
                  <button
                    className="Button-small"
                    onClick={() => {
                      dispatch({ type: REMOVE, payload: product.id });
                    }}
                  >
                    <img src={trash} alt="trash-icon" />
                  </button>
                </div>
              </div>
            ))}
          </article>
          <article className="info">
            <div className="cart-total">
              <div>
                <h2>Subtotal</h2>
                <span>${totalAmount.subtotal}</span>
              </div>
              <div>
                <h2>Taxes</h2>
                <span>${totalAmount.taxes}</span>
              </div>
              <div>
                <h2>Total</h2>
                <span>${totalAmount.total}</span>
              </div>
            </div>
            <button className="button-checkout" onClick={handleCheckoutClick}>
              Proceed to Checkout
            </button>
          </article>
        </section>
      ) : (
        <span classNameName="Cart__msg">The cart is empty</span>
      )}
    </section>
  );
}

export default CartPage;
