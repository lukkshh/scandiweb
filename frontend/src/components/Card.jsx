import React from "react";

class Card extends React.Component {
  render() {
    const { data } = this.props;

    // console.log(data);

    return (
      <div
        className={` ${
          data.inStock ? "" : "out-of-stock"
        } w-[386px] h-[444px] group relative flex flex-col justify-center items-center customShadow`}
      >
        <button
          disabled={!data.inStock}
          onClick={() => console.log("Clicked")}
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
