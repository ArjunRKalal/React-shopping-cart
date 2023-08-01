import {
  ADD_INITIAL_ITEMS,
  ADD_TO_CART,
  CHANGE_QUANTITY,
  FILTER,
  REMOVE,
  RESET,
  SEARCHING,
  SET_AMOUNT,
} from "./actions";

export const initialState = () => {
  return {
    items: [],
    filteredItems: [],
    shoppingCart: [],
    filterAt: "All items",
    categories: ["All items"],
    totalAmount: 0,
    error: false,
    loading: true,
  };
};

function reducer(state = initialState(), action) {
  let index;
  let newShoppingCart = [];
  let newItem;

  const { type, payload } = action;

  const getIndex = () => {
    return state.items.findIndex((item) => item.id === payload);
  };

  switch (type) {
    case ADD_INITIAL_ITEMS:
      state.items = payload;
      state.filteredItems = state.items;
      state.items.forEach((item) => {
        if (!state.categories.includes(item.category)) {
          state.categories.push(item.category);
        }
      });
      return {
        ...state,
        loading: false,
      };

    case FILTER:
      state.filteredItems =
        payload === "All items"
          ? state.items
          : state.items.filter((item) => item.category === payload);
      return {
        ...state,
        filterAt: payload,
        loading: false,
      };

    case SEARCHING:
      state.filteredItems = state.items.filter((item) => {
        return item.title.toLowerCase().includes(payload.toLowerCase());
      });

      return {
        ...state,
      };

    case ADD_TO_CART:
      index = getIndex();
      if (index >= 0) {
        newItem = state.items[index];
        newItem.quantity = 1;
        newShoppingCart = [...state.shoppingCart, newItem];
      } else {
        newShoppingCart = state.shoppingCart;
      }
      state.items[index].added = true;
      return {
        ...state,
        shoppingCart: newShoppingCart,
      };

    case REMOVE:
      index = getIndex();
      newShoppingCart = state.shoppingCart.filter(
        (item) => item.id !== payload
      );
      state.items[index].added = false;
      return {
        ...state,
        shoppingCart: newShoppingCart,
      };

    case SET_AMOUNT:
      return {
        ...state,
        totalAmount: payload,
      };

      case CHANGE_QUANTITY:
        index = state.shoppingCart.findIndex(
          item => item.id === payload.id
        )
        newShoppingCart = [...state.shoppingCart]
        newShoppingCart[index].quantity = payload.quantity
  
        return {
          ...state,
          shoppingCart: newShoppingCart
        }
    case RESET:
      state.items.map((item) => {
        delete item.added;
        return item;
      });
      return {
        ...state,
        shoppingCart: [],
      };
    default:
      return {
        ...state,
      };
  }
}

export default reducer;
