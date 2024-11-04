import React from "react";

class CapacityOptions extends React.Component {
  generateUniqueNumber() {
    return Date.now() + Math.floor(Math.random() * 1000);
  }

  render() {
    if (!this.props.capacities.capacity) {
      return;
    }

    const availableCapacities = this.props.capacities.availableCapacities;
    const selectedCapacity = this.props.capacities.capacity;

    return (
      <>
        <p>Capacity:</p>
        <div className="flex space-x-2">
          {availableCapacities.map((capacityOption, index) => (
            <div className="relative" key={index}>
              <input
                data-testid={
                  selectedCapacity === capacityOption.value
                    ? `cart-item-attribute-capacity-${capacityOption.value}-selected`
                    : `cart-item-attribute-capacity-${capacityOption.value}`
                }
                className={`appearance-none h-6 w-14 border-2 border-[#1D1F22] rounded-sm ${
                  selectedCapacity === capacityOption.value
                    ? "bg-[#1D1F22]"
                    : "bg-white"
                } focus:outline-none`}
                type="radio"
                disabled
                defaultChecked={selectedCapacity === capacityOption.value}
                name={`capacity-${this.generateUniqueNumber()}`}
              />
              <label
                className={`${
                  selectedCapacity === capacityOption.value
                    ? "text-white"
                    : "text-black"
                } text-[14px] top-[2px] font-roboto absolute left-1/2 translate-x-[-50%]`}
              >
                {capacityOption.displayValue}
              </label>
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default CapacityOptions;
