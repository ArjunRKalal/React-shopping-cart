import "./ProductsPage.css";
import Item from "../components/Product/Item";
import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { ADD_INITIAL_ITEMS, FILTER } from "../actions";
import products from './../data.json';

function ProductsPage() {
  const dispatch = useDispatch(); // to set initial data

  const filterHandleClick = (category) => {
    dispatch({ type: FILTER, payload: category });
  };

  useEffect(() => {
    dispatch({ type: ADD_INITIAL_ITEMS, payload: products });
  }, []);

  const filterAt = useSelector((state) => state.filterAt);
  const categories = useSelector((state) => state.categories);
  const items = useSelector((state) => state.filteredItems); // get the latest items

  return (
    <div>
      <section className="home">
        {categories.length > 0 ? (
          <section className="filter">
            {categories.map((category, index) => (
              <button
                key={index}
                className={
                  filterAt === category
                    ? "buttoncategory chosen"
                    : "buttoncategory"
                }
                onClick={() => {
                  filterHandleClick(category);
                }}
              >
                {category}
              </button>
            ))}
          </section>
        ) : (
          <p>No Filters</p>
        )}
      </section>

      <section className="homeItems">
        {items ? (
          items.map((item) => <Item item={item} key={item.id} />)
        ) : (
          <p>No Items</p>
        )}
      </section>
    </div>
  );
}

export default ProductsPage;
