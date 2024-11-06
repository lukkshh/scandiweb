import React from "react";

import quantityController from "../../utils/quantityController";
const { increase, decrease } = quantityController;
class QuantityController extends React.Component {
  render() {
    return (
      <div className="w-6 flex flex-col justify-between items-center">
        <button
          data-testid="cart-item-amount-increase"
          className="border-2 flex justify-center items-center border-[#1D1F22] w-6 h-6 "
          onClick={() => increase(this.props.item.itemID)}
        >
          +
        </button>
        <p data-testid="cart-item-amount">{this.props.item.quantity}</p>
        <button
          data-testid="cart-item-amount-decrease"
          className="border-2 flex justify-center items-center border-[#1D1F22] w-6 h-6 "
          onClick={() => decrease(this.props.item.itemID)}
        >
          -
        </button>
      </div>
    );
  }
}

export default QuantityController;
