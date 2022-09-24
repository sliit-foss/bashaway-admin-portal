import { TiThMenu } from "react-icons/ti";
import { IoIosClose } from "react-icons/io";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const initialNavItems = [
  {
    name: "Dashboard",
    path: "/",
  },
  {
    name: "Questions",
    path: "/questions",
  },
];

const Header = () => {
  const [burgerNav, setBurgerNav] = useState(false);
  const [navItems, setNavItems] = useState(initialNavItems);

  const router = useRouter();

  const burgerNavController = () => {
    document.querySelector("html").style.overflowY = !burgerNav
      ? "hidden"
      : "auto";
    setBurgerNav(!burgerNav);
  };

  const handleRouteChange = (path) => {
    if (path === "/logout") {
      localStorage.clear();
      router.push("/login");
    } else {
      router.push(path);
    }
  };

  useEffect(() => {
    const isLogged = localStorage.getItem("token");
    if (isLogged && !navItems.find((item) => item.name === "Profile")) {
      setNavItems([
        ...initialNavItems,
        {
          name: "Profile",
          path: "/profile",
        },
        {
          name: "Logout",
          path: "/logout",
        },
      ]);
    }
  }, []);

  return (
    <div>
      <div
        className={`w-full flex flex-col md:flex-row justify-between items-center bg-black/70 p-5 fixed top-0 z-50 backdrop-blur-[5px] pr-6`}
      >
        <div className="w-full md:w-4/12 pl-2">
          <img
            src="/assets/images/bashaway-logo.png"
            className="w-5/12 lg:w-4/12"
          />
        </div>
        <div className="hidden lg:flex justify-end w-full md:w-1/2 xl:w-10/12">
          {navItems.map((item) => {
            return (
              <div key={`desktop-${item.path}`}>
                <span
                  className="px-2 ml-4 text-nav-links-unselected hover:text-primary transition duration-300 cursor-pointer"
                  onClick={() => {
                    handleRouteChange(item.path);
                  }}
                >
                  {item.name}
                </span>
              </div>
            );
          })}
        </div>
        <TiThMenu
          className="fixed top-0 h-8 w-8 text-white right-1 lg:hidden mt-4 lg:mt-4 mr-4 lg:mr-2 cursor-pointer"
          onClick={burgerNavController}
        />
      </div>
      <div>
        <nav
          className={`h-full w-full flex items-center fixed top-0 left-0 z-50 ${
            burgerNav ? "pointer-events-auto" : "pointer-events-none opacity-0"
          } bg-black/50 backdrop-blur-2xl transition duration-300`}
        >
          <IoIosClose
            className="fixed top-0 right-0 z-[60] h-14 w-14 text-white mt-2 mr-2 lg:hidden cursor-pointer"
            onClick={burgerNavController}
          />
          <ul className=" mr-auto w-full h-full flex-col flex items-center uppercase justify-center p-8 lg:hidden">
            <li className="h-full flex flex-col justify-center py-20">
              <div className="w-full mb-12">
                <img
                  src="/assets/images/bashaway-logo.png"
                  className="w-56 h-10"
                />
              </div>
              <div className="h-full max-h-[200px] flex flex-col justify-between">
                {navItems.map((item) => {
                  return (
                    <div
                      className="w-full flex flex-col justify-center items-center"
                      key={`mobile-${item.path}`}
                    >
                      <span
                        className="w-full text-white hover:text-primary text-center transition duration-300 cursor-pointer"
                        onClick={() => {
                          handleRouteChange(item.path);
                        }}
                      >
                        {item.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </li>
          </ul>
        </nav>
      </div>
      <div className="hidden lg:flex w-full h-[0.25px] bg bg-nav-links-unselected opacity-20"></div>
    </div>
  );
};

export default Header;
