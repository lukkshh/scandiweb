import React from "react";

class SizeOptions extends React.Component {
  generateUniqueNumber() {
    return Date.now() + Math.floor(Math.random() * 1000);
  }

  render() {
    if (!this.props.sizes.size) {
      return;
    }
    const availableSizes = this.props.sizes.availableSizes;
    const selectedSize = this.props.sizes.size;

    return (
      <>
        <p>Size:</p>
        <div className="flex space-x-2">
          {availableSizes.map((sizeOption, index) => (
            <div className="relative" key={index}>
              <input
                data-testid={
                  selectedSize === sizeOption.value
                    ? `cart-item-attribute-size-${sizeOption.value}-selected`
                    : `cart-item-attribute-size-${sizeOption.value}`
                }
                className={`appearance-none h-6 w-6 border-2 border-[#1D1F22] rounded-sm ${
                  selectedSize === sizeOption.value
                    ? "bg-[#1D1F22]"
                    : "bg-white"
                } focus:outline-none`}
                type="radio"
                defaultChecked={selectedSize === sizeOption.value}
                name={`size-${this.generateUniqueNumber()}`}
                disabled
              />
              <label
                className={`${
                  selectedSize === sizeOption.value
                    ? "text-white"
                    : "text-black"
                } text-[14px] top-[2px] font-roboto absolute left-1/2 translate-x-[-50%]`}
              >
                {sizeOption.displayValue}
              </label>
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default SizeOptions;
