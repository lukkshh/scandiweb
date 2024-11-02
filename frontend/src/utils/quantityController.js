function increase(id) {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  const item = cartItems.find((item) => item.itemID === id);

  if (item) {
    item.quantity += 1;

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }
}

function decrease(id) {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  const item = cartItems.find((item) => item.itemID === id);

  if (item && item.quantity > 1) {
    item.quantity -= 1;
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  } else if (item && item.quantity === 1) {
    const updatedCartItems = cartItems.filter((item) => item.itemID !== id);

    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  }
}

export default {
  increase,
  decrease,
};
