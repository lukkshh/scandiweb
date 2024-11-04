import React from "react";

class ColorOptions extends React.Component {
  render() {
    if (
      !this.props.data.attributes ||
      this.props.data.attributes.length === 0
    ) {
      return;
    }

    if (
      !this.props.data.attributes.some(
        (attributeSet) => attributeSet.id === "Color"
      )
    ) {
      return;
    }

    const colors = this.props.data.attributes
      .find((attributeSet) => attributeSet.id === "Color")
      .items.map((item) => item.value);

    console.log(colors);

    return (
      <>
        <p className="uppercase mt-4 text-lg font-bold">Color:</p>
        <div className="space-x-2">
          {colors.map((color) => (
            <input
              key={color}
              className="cursor-pointer appearance-none h-9 w-9 border-2 checked:border-[#5ECE7B] rounded-sm focus:outline-none"
              type="radio"
              name="color"
              value={color}
              style={{ backgroundColor: color }}
              onChange={() => this.props.handleColorChange(color)}
            />
          ))}
        </div>
      </>
    );
  }
}

export default ColorOptions;
