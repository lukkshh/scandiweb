import React from "react";
import withRouter from "../utils/withRouter";
import parse from "html-react-parser";
import addToCart from "../utils/addToCart";
import { gql } from "@apollo/client";
import withGraphQl from "../utils/withGraphQL";

const GET_PRODUCT = gql`
  query GetProduct($id: String!) {
    product(id: $id) {
      id
      name
      inStock
      gallery
      description
      category
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
      prices {
        currency {
          label
          symbol
        }
        amount
      }
    }
  }
`;

class PDP extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImg: props.data.product.gallery[0],
      selectedSize: "",
      selectedColor: "",
    };
  }

  handleSizeChange = (value) => {
    this.setState({ selectedSize: value });
  };

  handleColorChange = (value) => {
    this.setState({ selectedColor: value });
  };

  handleAddToCart = () => {
    const { data } = this.props;
    const { selectedSize, selectedColor } = this.state;

    const item = {
      id: this.props.params.id,
      img: data.product.gallery[0],
      name: data.product.name,
      quantity: 1,
      size: selectedSize,
      color: selectedColor,
      price: data.product.prices[0].amount,
      currencySymbol: data.product.prices[0].currency.symbol,
    };

    addToCart(item);
  };

  renderSizeOptions() {
    const sizes = ["XS", "S", "M", "L"];

    return sizes.map((size) => (
      <div className="relative" key={size}>
        <input
          className="cursor-pointer appearance-none h-[45px] w-[63px] border-2 border-[#1D1F22] rounded-sm checked:bg-[#1D1F22] focus:outline-none"
          type="radio"
          name="Size"
          value={size}
          id={`size${size}`}
          onChange={() => this.handleSizeChange(size)}
        />
        <label
          className={`${
            this.state.selectedSize === size ? "text-white" : "text-black"
          } cursor-pointer font-roboto absolute left-1/2 translate-x-[-50%] top-3`}
          htmlFor={`size${size}`}
        >
          {size}
        </label>
      </div>
    ));
  }

  renderColorOptions() {
    const colors = ["#D3D2D5", "#2B2B2B", "#0F6450"];
    return colors.map((color) => (
      <input
        key={color}
        className="cursor-pointer appearance-none h-9 w-9 border-2 checked:border-[#5ECE7B] rounded-sm focus:outline-none"
        type="radio"
        name="color"
        value={color}
        style={{ backgroundColor: color }}
        onChange={() => this.handleColorChange(color)}
      />
    ));
  }

  handleImgChange = (img) => {
    this.setState({ currentImg: img });
  };

  handlePrevImage = () => {
    const { data } = this.props;
    const { currentImg } = this.state;

    let imgCount = data.product.gallery.indexOf(currentImg);

    imgCount =
      (imgCount - 1 + data.product.gallery.length) %
      data.product.gallery.length;

    this.handleImgChange(data.product.gallery[imgCount]);
  };

  handleNextImage = () => {
    const { data } = this.props;
    const { currentImg } = this.state;

    let imgCount = data.product.gallery.indexOf(currentImg);

    imgCount = (imgCount + 1) % data.product.gallery.length;

    this.handleImgChange(data.product.gallery[imgCount]);
  };

  render() {
    const { data } = this.props;
    const { currentImg, selectedSize, selectedColor } = this.state;

    return (
      <section className="flex m-[140px]">
        <div className="flex space-x-12" data-testid="product-gallery">
          <div className="space-y-8 max-h-[478px] overflow-y-auto no-scrollbar">
            {data.product.gallery.map((img, key) => (
              <img
                onClick={() => this.handleImgChange(img)}
                key={key}
                className="cursor-pointer object-contain w-20 h-20"
                src={img}
                alt={`gallery-img-${key}`}
              />
            ))}
          </div>
          <div className="relative">
            <div className="absolute top-1/2 translate-y-[-50%] w-full flex justify-between">
              <button
                onClick={() => this.handlePrevImage()}
                className="w-[31.7px] h-[31.7px] flex justify-center items-center bg-[#000000BA]"
              >
                <img src="/CaretLeft.svg" alt="" />
              </button>
              <button
                onClick={() => {
                  this.handleNextImage();
                }}
                className="w-[31.7px] h-[31.7px] flex justify-center items-center bg-[#000000BA]"
              >
                <img src="/CaretRight.svg" alt="" />
              </button>
            </div>
            <img
              className="w-[575px] h-[478px] object-contain"
              src={currentImg}
              alt="main-img"
            />
          </div>
        </div>
        <div className="ml-[200px]">
          <p className="font-semibold text-3xl">{data.product.name}</p>
          <p className="uppercase mt-4 text-lg font-bold">Size:</p>
          <div className="flex space-x-2">{this.renderSizeOptions()}</div>
          <p className="uppercase mt-4 text-lg font-bold">Color:</p>
          <div className="space-x-2">{this.renderColorOptions()}</div>
          <p className="uppercase mt-4 text-lg font-bold">Price:</p>
          <p className="uppercase mt-4 text-2xl font-bold">
            {data.product.prices[0].currency.symbol}
            {data.product.prices[0].amount}
          </p>
          <button
            data-testid="add-to-cart"
            disabled={!data.product.inStock || !selectedSize || !selectedColor}
            onClick={this.handleAddToCart}
            className="bg-[#5ECE7B] font-semibold mt-6 disabled:bg-[#99dbab] w-[292px] h-[43px] text-white uppercase"
          >
            Add To Cart
          </button>
          <div
            className="pr-[150px] mt-6 max-w-[900px]"
            data-testid="product-description"
          >
            {parse(data.product.description || "")}
          </div>
        </div>
      </section>
    );
  }
}

export default withRouter(withGraphQl(PDP, GET_PRODUCT));
