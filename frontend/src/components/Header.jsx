import React from "react";
import Cart from "./Cart/Cart";

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isCartOpen: JSON.parse(localStorage.getItem("isCartOpen")) || false,
    };
  }

  toggleCart = () => {
    this.setState((prevState) => {
      const newCartOpenState = !prevState.isCartOpen;

      localStorage.setItem("isCartOpen", JSON.stringify(newCartOpenState));

      return { isCartOpen: newCartOpenState };
    });
  };

  componentDidMount() {
    this.interval = setInterval(() => {
      const storedCartState = JSON.parse(localStorage.getItem("isCartOpen"));
      if (storedCartState !== this.state.isCartOpen) {
        this.setState({ isCartOpen: storedCartState });
      }
    }, 500);
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  render() {
    const { activeCategory } = this.props;

    const links = [
      { path: "/all", label: "ALL" },
      { path: "/clothes", label: "CLOTHES" },
      { path: "/tech", label: "TECH" },
    ];

    return (
      <header className="w-full h-20 flex items-center justify-around relative">
        {this.state.isCartOpen && (
          <div className="fixed top-20 inset-0 bg-[#39374838] z-40" />
        )}
        <ul className="flex list-none gap-5">
          {links.map((link) => (
            <li
              key={link.path}
              className={`flex h-20 justify-center items-center ${
                activeCategory === link.label.toLowerCase() ? "active" : ""
              }`}
            >
              <a
                className="text-[#1d1f22] p-1 no-underline"
                data-testid={
                  activeCategory === link.label.toLowerCase()
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
        <Cart isCartOpen={this.state.isCartOpen} toggleCart={this.toggleCart} />
      </header>
    );
  }
}

export default Header;
