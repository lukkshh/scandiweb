import React from "react";
import getCartTotal from "../utils/getCartTotal";

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItemsCount: this.getCartItemsCount(),
    };
  }

  getCartItemsCount = () => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    return cartItems.length;
  };

  componentDidMount() {
    this.interval = setInterval(() => {
      const newCount = this.getCartItemsCount();
      if (newCount !== this.state.cartItemsCount) {
        this.setState({ cartItemsCount: newCount });
      }
    }, 500);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { cartItemsCount } = this.state;
    const { isCartOpen, onCartToggle } = this.props;

    const cartTotal = getCartTotal();

    return (
      <div className="relative">
        <div
          className={`${
            cartItemsCount === 0 ? "hidden" : ""
          } font-roboto w-5 h-5 rounded-full absolute top-[-10px] right-[-13px] flex justify-center items-center bg-[#1D1F22] text-white`}
        >
          {cartItemsCount}
        </div>
        <img
          className="cursor-pointer z-50"
          onClick={onCartToggle}
          src="/cart.svg"
          alt="cart"
        />
        {isCartOpen && (
          <div className="absolute right-[-40px] top-[49px] w-[325px] bg-white z-50">
            <div className="m-4 ">
              <span className="font-bold">MyBag</span>, {cartItemsCount} items
            </div>
            <div className="m-4"></div>
            <div className="m-4 font-medium font-roboto flex justify-between ">
              <span>Total</span> <span>${cartTotal}</span>
            </div>
            <div className="m-4">
              <button
                disabled={cartItemsCount === 0}
                onClick={() => {
                  localStorage.removeItem("cartItems");
                }}
                className="bg-[#5ECE7B] disabled:bg-[#99dbab] w-[292px] h-[43px] text-white uppercase"
              >
                Place Order
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Cart;
