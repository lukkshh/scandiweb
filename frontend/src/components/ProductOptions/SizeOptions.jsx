import React from "react";

class SizeOptions extends React.Component {
  render() {
    if (
      !this.props.data.attributes ||
      this.props.data.attributes.length === 0
    ) {
      return;
    }

    if (
      !this.props.data.attributes.some(
        (attributeSet) => attributeSet.id === "Size"
      )
    ) {
      return;
    }

    const sizes = this.props.data.attributes
      .find((attributeSet) => attributeSet.id === "Size")
      .items.map((item) => item.value);

    return (
      <>
        <p className="uppercase mt-4 text-lg font-bold">Size:</p>
        <div className="flex space-x-2">
          {sizes.map((size) => (
            <div className="relative" key={size}>
              <input
                className="cursor-pointer appearance-none h-[45px] w-[63px] border-2 border-[#1D1F22] rounded-sm checked:bg-[#1D1F22] focus:outline-none"
                type="radio"
                name="Size"
                value={size}
                id={`size${size}`}
                onChange={() => this.props.handleSizeChange(size)}
              />
              <label
                className={`${
                  this.props.selectedSize === size ? "text-white" : "text-black"
                } cursor-pointer font-roboto absolute left-1/2 translate-x-[-50%] top-3`}
                htmlFor={`size${size}`}
              >
                {size}
              </label>
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default SizeOptions;
