import React from "react";

class CapacityOptions extends React.Component {
  render() {
    if (
      !this.props.data.attributes.some(
        (attributeSet) => attributeSet.id === "Capacity"
      )
    ) {
      return;
    }

    const capacities = this.props.data.attributes
      .find((attributeSet) => attributeSet.id === "Capacity")
      .items.map((item) => item.value);

    return (
      <>
        <p className="uppercase mt-4 text-lg font-bold">Capacity:</p>
        <div
          data-testid="product-attribute-capacity"
          className="flex space-x-2"
        >
          {capacities.map((capacity) => (
            <div className="relative" key={capacity}>
              <input
                data-testid={
                  this.props.selectedCapacity === capacity
                    ? `product-attribute-capacity-${capacity}-selected`
                    : `product-attribute-capacity-${capacity}`
                }
                className="cursor-pointer appearance-none h-[45px] w-[63px] border-2 border-[#1D1F22] rounded-sm checked:bg-[#1D1F22] focus:outline-none"
                type="radio"
                name="capacity"
                value={capacity}
                id={`capacity${capacity}`}
                onChange={() => this.props.handleCapacityChange(capacity)}
              />
              <label
                className={`${
                  this.props.selectedCapacity === capacity
                    ? "text-white"
                    : "text-black"
                } cursor-pointer font-roboto absolute left-1/2 translate-x-[-50%] top-3`}
                htmlFor={`capacity${capacity}`}
                style={{ pointerEvents: "none" }}
              >
                {capacity}
              </label>
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default CapacityOptions;
