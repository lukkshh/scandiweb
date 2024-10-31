import React from "react";

class Header extends React.Component {
  render() {
    const currentPath = window.location.pathname;

    const links = [
      { path: "/", label: "WOMEN" },
      { path: "/men", label: "MEN" },
      { path: "/kids", label: "KIDS" },
    ];

    return (
      <header className="w-full h-20 flex items-center justify-around">
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
        <img src="/cart.svg" alt="cart" />
      </header>
    );
  }
}

export default Header;
