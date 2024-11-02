import React from "react";
import getCartTotal from "../utils/getCartTotal";

import quantityController from "../utils/quantityController";
const { increase, decrease } = quantityController;

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItemsCount: this.getCartItemsCount(),
      cartItems: this.getCartItems(),
    };
  }

  getCartItemsCount = () => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    return cartItems.length;
  };

  getCartItems = () => {
    return (JSON.parse(localStorage.getItem("cartItems")) || []).reverse();
  };

  componentDidMount() {
    this.interval = setInterval(() => {
      const newCount = this.getCartItemsCount();
      const newItems = this.getCartItems();

      const currentItemsString = JSON.stringify(this.state.cartItems);
      const newItemsString = JSON.stringify(newItems);

      if (
        newCount !== this.state.cartItemsCount ||
        currentItemsString !== newItemsString
      ) {
        this.setState({ cartItemsCount: newCount, cartItems: newItems });
      }
    }, 500);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  generateUniqueNumber() {
    return Date.now() + Math.floor(Math.random() * 1000);
  }

  renderSizeOptions(item) {
    const sizes = ["XS", "S", "M", "L"];

    const selectedSize = item.size || "XS";

    return sizes.map((size, index) => (
      <div className="relative" key={index}>
        <input
          data-testid={
            selectedSize === size
              ? `cart-item-attribute-size-${size}-selected`
              : `cart-item-attribute-size-${size}`
          }
          disabled
          className={`appearance-none h-6 w-6 border-2 border-[#1D1F22] rounded-sm ${
            selectedSize === size ? "bg-[#1D1F22]" : "bg-white"
          } focus:outline-none`}
          type="radio"
          defaultChecked={selectedSize === size}
          name="size"
        />
        <label
          className={`${
            selectedSize === size ? "text-white" : "text-black"
          } text-[14px] top-[2px] font-roboto absolute left-1/2 translate-x-[-50%]`}
          htmlFor=""
        >
          {size}
        </label>
      </div>
    ));
  }

  renderColorOptions(item) {
    const colors = ["#D3D2D5", "#2B2B2B", "#0F6450"];

    const selectedColor = item.color || "#D3D2D5";

    return colors.map((color, index) => (
      <div key={index}>
        <input
          data-testid={
            selectedColor === color
              ? `cart-item-attribute-color-${color}-selected`
              : `cart-item-attribute-color-${color}`
          }
          className="appearance-none h-4 w-4 border-2 checked:border-[#5ECE7B] rounded-sm focus:outline-none"
          type="radio"
          disabled
          name={this.generateUniqueNumber()}
          defaultChecked={selectedColor === color}
          style={{ backgroundColor: color }}
        />
      </div>
    ));
  }

  render() {
    const { cartItemsCount, cartItems } = this.state;
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
              <span className="font-bold">MyBag</span>,{" "}
              <span data-testid="cart-item-amount">{cartItemsCount}</span> items
            </div>
            {/* items to display */}
            <div className="m-4 mt-8 max-h-[500px] space-y-10 no-scrollbar overflow-y-auto ">
              {cartItems.map((item, index) => (
                <div
                  data-testid={`cart-item-attribute-${item.name}`}
                  className="flex justify-around"
                  key={index}
                >
                  <div className="w-[136px]">
                    <div>
                      <p className="font-light">{item.name}</p>
                      <p className=" font-bold">
                        {item.currencySymbol}
                        {item.price}
                      </p>
                      <p>Size:</p>
                      <div className="flex space-x-2">
                        {this.renderSizeOptions(item)}
                      </div>
                      <p>Color:</p>
                      <div className="flex space-x-2">
                        {this.renderColorOptions(item)}
                      </div>
                    </div>
                  </div>
                  <div className="w-6 flex flex-col justify-between items-center">
                    <button
                      data-testid="cart-item-amount-increase"
                      className="border-2 flex justify-center items-center border-[#1D1F22] w-6 h-6 "
                      onClick={() => increase(item.itemID)}
                    >
                      +
                    </button>
                    {item.quantity}
                    <button
                      data-testid="cart-item-amount-decrease"
                      className="border-2 flex justify-center items-center border-[#1D1F22] w-6 h-6 "
                      onClick={() => decrease(item.itemID)}
                    >
                      -
                    </button>
                  </div>
                  <div className="flex w-[121px] h-[167]  justify-end">
                    <img
                      className="w-[121px] h-[167] object-contain"
                      src={item.img}
                      alt={item.name}
                    />
                  </div>
                </div>
              ))}
            </div>
            {/* total */}
            <div
              data-testid="cart-total"
              className="m-4 mt-8 font-medium font-roboto flex justify-between "
            >
              <span>Total</span> <span>${cartTotal}</span>
            </div>
            <div className="m-4 mt-8">
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
