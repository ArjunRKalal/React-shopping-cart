import { useRef, useState } from "react";
import "./CheckoutPage.css";
import { useNavigate } from "react-router-dom";

function CheckoutPage(props) {
  const { totalAmount } = props.state;
  const errorRef = useRef(null);
  const navigate = useNavigate();

  const [localState, setLocalState] = useState({
    fullName: "",
    email: "",
    country: "",
    address: "",
    cardNumber: null,
    expirationDate: null,
    zipCode: null,
  });

  const handleChange = (evt) => {
    setLocalState((prev) => ({
      ...prev,
      [evt.target.id]: evt.target.value,
    }));
  };

  const handleSubmit = () => {
    let flag = true;

    Object.values(localState).forEach((value) => {
      if (!value) flag = false;
    });

    console.log("flag: ", flag);

    if (flag) {
      errorRef.current?.classList.remove("error");
      navigate('/order-success');
    } else {
      errorRef.current?.classList.add("error");
      window.scroll({
        top: 10000,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="checkout">
      <form className="checkout-form">
        <input
          name="Full Name"
          id="fullName"
          type="text"
          placeholder="John Doe"
          onChange={handleChange}
        />
        <input
          name="Email"
          id="email"
          type="email"
          placeholder="john@doe.com"
          onChange={handleChange}
        />
        <input
          name="Country"
          id="country"
          type="text"
          placeholder="Country"
          onChange={handleChange}
        />
        <input
          name="Address"
          id="address"
          type="text"
          placeholder="Street address"
          onChange={handleChange}
        />
        <input
          name="Card Number"
          id="cardNumber"
          type="number"
          placeholder="1234 1234 1234 1234"
          onChange={handleChange}
        />
        <input
          name="Expiration Date"
          id="expirationDate"
          type="number"
          placeholder="MM / YY"
          onChange={handleChange}
        />
        <input
          name="Zip code"
          id="zipCode"
          type="number"
          placeholder="11655"
          onChange={handleChange}
        />
        <span className="checkout-error" ref={errorRef}>
          Please fill all the required fields
        </span>
      </form>

      <button className="checkout-cta" onClick={handleSubmit}>
        <h2>Pay ${totalAmount}</h2>
      </button>
    </section>
  );
}

export default CheckoutPage;
