import React from "react";
import addToCart from "../utils/addToCart";

class Card extends React.Component {
  render() {
    const { data } = this.props;

    const handleAddToCart = () => {
      if (!Array.isArray(data.attributes) || data.attributes.length === 0) {
        addToCart({
          id: data.id,
          quantity: 1,
          price: data.prices[0].amount,
          img: data.gallery[0],
          name: data.name,
          currencySymbol: data.prices[0].currency.symbol,
        });
        return;
      }

      const findAttribute = (attributes, attributeId) =>
        Array.isArray(attributes)
          ? attributes.find((attr) => attr.id === attributeId)?.items || []
          : [];

      const selectedSize = findAttribute(data.attributes, "Size")[0]
        ?.displayValue;
      const selectedColor = findAttribute(data.attributes, "Color")[0]?.value;
      const selectedCapacity = findAttribute(data.attributes, "Capacity")[0]
        ?.displayValue;

      const newItem = {
        id: data.id,
        quantity: 1,
        price: data.prices[0].amount,
        img: data.gallery[0],
        name: data.name,
        currencySymbol: data.prices[0].currency.symbol,
        ...(selectedSize && { size: selectedSize }),
        ...(selectedColor && { color: selectedColor }),
        ...(selectedCapacity && { capacity: selectedCapacity }),
        availableSizes: findAttribute(data.attributes, "Size"),
        availableColors: findAttribute(data.attributes, "Color"),
        availableCapacities: findAttribute(data.attributes, "Capacity"),
      };

      addToCart(newItem);
    };

    return (
      <div
        data-testid={`product-${data.id}`}
        className={`${
          data.inStock ? "" : "out-of-stock"
        } w-[386px] h-[444px] group relative flex flex-col justify-center items-center customShadow`}
      >
        <button
          disabled={!data.inStock}
          onClick={handleAddToCart}
          className={`${
            data.inStock ? "" : "group-hover:hidden"
          } z-10 hidden group-hover:flex w-[52px] h-[52px] top-[304px] left-[287px] absolute bg-[#5ECE7B] rounded-full justify-center items-center`}
        >
          <img src="white-cart.svg" alt="Cart" />
        </button>
        <a href={`/${data.category}/${data.id}`}>
          <img
            className="w-[354px] h-[330px] object-contain"
            src={data.gallery[0]}
            alt={data.name}
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
