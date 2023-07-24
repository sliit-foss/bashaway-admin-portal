import { useRouter } from "next/router";
import { memo, useState } from "react";
import { Tooltip } from "flowbite-react";
import { HiOutlineMenu } from "react-icons/hi";
import { IoIosClose } from "react-icons/io";
import { MdAnimation } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import { toggleBackgroundAnimation } from "@store/ui";

const Navbar = () => {
  const [burgerNav, setBurgerNav] = useState(false);

  const router = useRouter();

  const navItems =
    router.asPath !== "/login"
      ? [
          {
            name: "Dashboard",
            path: "/"
          },
          {
            name: "Questions",
            path: "/questions"
          },
          {
            name: "Users",
            path: "/users"
          },
          {
            name: "Profile",
            path: "/profile"
          },
          {
            name: "Logout",
            path: "/logout"
          }
        ]
      : [];

  const burgerNavController = () => {
    document.querySelector("html").style.overflowY = !burgerNav ? "hidden" : "auto";
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

  return (
    <>
      <div
        className={`w-full flex flex-col md:flex-row justify-between items-center bg-black/70 p-5 fixed top-0 z-50 backdrop-blur-[5px] pr-6`}
      >
        <div className="w-full md:w-4/12 pl-2">
          <img src="/assets/images/bashaway-logo.png" className="w-5/12 lg:w-4/12" />
        </div>
        <div className="hidden lg:flex justify-end w-full md:w-1/2 xl:w-10/12">
          {navItems.map((item) => (
            <div key={`desktop-${item.path}`}>
              <span
                className={twMerge(
                  "px-2 ml-4 hover:text-primary transition duration-300 cursor-pointer",
                  item.path === router.asPath ? "text-primary" : "text-nav-links-unselected"
                )}
                onClick={() => handleRouteChange(item.path)}
              >
                {item.name}
              </span>
            </div>
          ))}
          <AnimationToggle classes="text-white hover:text-primary" />
        </div>
        <AnimationToggle
          wrapperclasses="fixed top-4 right-16 lg:hidden"
          classes="h-[1.85rem] w-[1.85rem] text-white hover:text-primary"
        />
        <HiOutlineMenu
          className="fixed top-0 h-8 w-8 text-white hover:text-primary right-1 lg:hidden mt-4 lg:mt-4 mr-4 lg:mr-2 cursor-pointer transition duration-300"
          onClick={burgerNavController}
        />
      </div>
      {router.asPath !== "/login" && (
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
                <img src="/assets/images/bashaway-logo.png" className="w-56 h-10" />
              </div>
              <div className="h-full max-h-[200px] flex flex-col justify-between">
                {navItems.map((item) => (
                  <div className="w-full flex flex-col justify-center items-center" key={`mobile-${item.path}`}>
                    <span
                      className={twMerge(
                        "w-full hover:text-primary text-center transition duration-300 cursor-pointer",
                        item.path === router.asPath ? "text-primary" : "text-white"
                      )}
                      onClick={() => handleRouteChange(item.path)}
                    >
                      {" "}
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </li>
          </ul>
        </nav>
      )}
      <div className="hidden lg:flex w-full h-[0.25px] bg bg-nav-links-unselected opacity-20"></div>
    </>
  );
};

const AnimationToggle = ({ wrapperclasses = "", classes = "" }) => {
  const dispatch = useDispatch();
  const { backgroundAnimation } = useSelector((state) => state.ui);

  return (
    <div className={wrapperclasses}>
      <Tooltip content={backgroundAnimation ? "Disable animation" : "Enable animation"}>
        <MdAnimation
          className={twMerge(
            `w-6 h-6 ml-5 cursor-pointer transition duration-300 ${
              backgroundAnimation ? "text-primary hover:text-white" : "text-white hover:text-primary"
            }`,
            classes
          )}
          onClick={() => {
            dispatch(toggleBackgroundAnimation(!backgroundAnimation));
            if (process.browser) {
              window.localStorage.setItem("backgroundAnimation", !backgroundAnimation);
            }
          }}
        />
      </Tooltip>
    </div>
  );
};

export default memo(Navbar);
