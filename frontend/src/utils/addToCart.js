function addToCart(product) {
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  const existingProduct = cartItems.find((item) => item.id === product.id);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cartItems.push(product);
  }

  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

export default addToCart;
