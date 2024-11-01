import React from "react";

import addToCart from "../utils/addToCart";

class Card extends React.Component {
  render() {
    const { data } = this.props;

    const handleAddToCart = () => {
      const newItem = {
        id: data.id,
        quantity: 1,
        price: data.prices[0].amount,
      };

      if (data.attributes.length === 0) {
        addToCart(newItem);
        return;
      }

      data.attributes.forEach((attribute) => {
        if (attribute.id === "Size") {
          newItem.size = attribute.items[0].displayValue;
        } else if (attribute.id === "Color") {
          newItem.color = attribute.items[0].displayValue;
        } else {
          newItem[attribute.id] = attribute.items[0].displayValue;
        }
      });

      addToCart(newItem);
    };

    return (
      <div
        data-testid={`product-${data.id}`}
        className={` ${
          data.inStock ? "" : "out-of-stock"
        } w-[386px] h-[444px] group relative flex flex-col justify-center items-center customShadow`}
      >
        <button
          disabled={!data.inStock}
          onClick={() => {
            handleAddToCart();
          }}
          className=" z-10 hidden group-hover:flex  w-[52px] h-[52px] top-[304px] left-[287px] absolute bg-[#5ECE7B] rounded-full justify-center items-center"
        >
          <img src="white-cart.svg" alt="Cart" />
        </button>
        <a href={`/p/${data.id}`}>
          <img
            className="w-[354px] h-[330px] object-contain
          "
            src={data.gallery[0]}
            alt=""
          />
        </a>
        <div className="w-[354px] h-[58px] mt-[24px]">
          <p className="text-[18px] font-light">{data.name}</p>
          <p className="text-[18px]">
            {data.prices[0].currency.symbol}
            {data.prices[0].amount}
          </p>
        </div>
      </div>
    );
  }
}

export default Card;
