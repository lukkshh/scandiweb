import React from "react";
import Cart from "./Cart";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCartOpen: false,
    };
  }
  toggleCart = () => {
    this.setState((prevState) => {
      const newCartOpenState = !prevState.isCartOpen;

      if (newCartOpenState) {
        document.body.classList.add("overflow-hidden");
      } else {
        document.body.classList.remove("overflow-hidden");
      }
      return { isCartOpen: newCartOpenState };
    });
  };

  render() {
    const currentPath = window.location.pathname;

    const links = [
      { path: "/", label: "WOMEN" },
      { path: "/men", label: "MEN" },
      { path: "/kids", label: "KIDS" },
    ];

    return (
      <header className="w-full h-20 flex items-center justify-around relative">
        {this.state.isCartOpen && (
          <div className="fixed top-20 inset-0 bg-[#39374838]  z-40" />
        )}
        <ul className="flex list-none gap-5">
          {links.map((link) => (
            <li
              key={link.path}
              className={`flex h-20 justify-center items-center ${
                currentPath === link.path ? "active" : ""
              }`}
            >
              <a
                className="text-[#1d1f22] p-1 no-underline"
                data-testid={
                  currentPath === link.path
                    ? "active-category-link"
                    : "category-link"
                }
                href={link.path}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <img className="mr-40" src="/a-logo.svg" alt="logo" />
        <Cart
          onCartToggle={this.toggleCart}
          isCartOpen={this.state.isCartOpen}
        />
      </header>
    );
  }
}

export default Header;
