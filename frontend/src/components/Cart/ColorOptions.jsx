import React from "react";

class ColorOptions extends React.Component {
  generateUniqueNumber() {
    return Date.now() + Math.floor(Math.random() * 1000);
  }

  render() {
    if (!this.props.colors.color) {
      return;
    }

    const availableColors = this.props.colors.availableColors;
    const selectedColor = this.props.colors.color;

    return (
      <>
        <p>Color:</p>
        <div className="flex space-x-2">
          {availableColors.map((colorOption, index) => (
            <div key={index}>
              <input
                data-testid={
                  selectedColor === colorOption.value
                    ? `cart-item-attribute-color-${colorOption.value}-selected`
                    : `cart-item-attribute-color-${colorOption.value}`
                }
                className="appearance-none h-4 w-4 border-2 checked:border-[#5ECE7B] rounded-sm focus:outline-none"
                type="radio"
                disabled
                defaultChecked={selectedColor === colorOption.value}
                name={`color-${this.generateUniqueNumber()}`}
                style={{ backgroundColor: colorOption.value }}
              />
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default ColorOptions;
