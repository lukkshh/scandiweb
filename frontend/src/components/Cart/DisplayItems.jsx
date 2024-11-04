import React from "react";

import QuantityController from "./QuantityController";

import SizeOptions from "./SizeOptions";
import ColorOptions from "./ColorOptions";
import CapacityOptions from "./CapacityOptions";

class DisplayItems extends React.Component {
  render() {
    return (
      <div className="m-4 mt-8 max-h-[500px] space-y-10 no-scrollbar overflow-y-auto ">
        {this.props.cartItems.map((item, index) => (
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
                <SizeOptions sizes={item}></SizeOptions>
                <ColorOptions colors={item}></ColorOptions>
                <CapacityOptions capacities={item}></CapacityOptions>
              </div>
            </div>

            <QuantityController item={item}></QuantityController>

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
    );
  }
}

export default DisplayItems;
