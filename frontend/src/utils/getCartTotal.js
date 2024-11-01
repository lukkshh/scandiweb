function getCartTotal(cartItems) {
  const cartItem = JSON.parse(localStorage.getItem("cartItems")) || [];

  const total = cartItem.reduce((accumulator, item) => {
    const price = item.price || 0;
    const quantity = item.quantity || 1;
    return accumulator + price * quantity;
  }, 0);

  return total.toFixed(2);
}

export default getCartTotal;
