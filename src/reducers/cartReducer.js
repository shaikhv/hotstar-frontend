let initialState = [];
const cart = localStorage.getItem("cart");
if (cart) {
  initialState = JSON.parse(cart);
} else {
  initialState = [];
}

export const cartReducer = (state = initialState, action) => {
  const { type, payload } = action;
  if (type === "ADD_TO_CART") {
    return payload;
  }
  return state;
};
