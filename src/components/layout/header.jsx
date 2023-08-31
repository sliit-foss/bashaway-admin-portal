import { useState } from "react";
import { RxCross1, RxHamburgerMenu } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { accessRequestLink } from "@/constants";
import { useBreakpoint } from "@/hooks";
import { whitelistedPaths } from "@/hooks/auth";
import { BashawayAdmin } from "@/icons";
import { authApi, useAuthUserQuery, useLogoutMutation } from "@/store/api";
import { AnimatedSwitcher, Button, Skeleton } from "@sliit-foss/bashaway-ui/components";
import { Bashaway, FOSS, Times } from "@sliit-foss/bashaway-ui/icons";

const internalNavLinks = [
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
  }
];

const mobileNavIconStyles =
  "block xl:hidden absolute right-8 lg:right-24 h-[1.65rem] w-[1.65rem] cursor-pointer hover:text-black/70 transition-all duration-medium";

const buttonStyles = "mt-1.5 xl:mt-0 px-8 xl:px-[1.15rem] pb-2.5 xl:pb-[0.4rem] min-w-[12rem] xl:min-w-[6rem]";

const Header = ({ className }) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const breakpoints = useBreakpoint();

  const navigate = useNavigate();

  const location = useLocation();

  const dispatch = useDispatch();

  const [logout] = useLogoutMutation();

  const { data, isLoading, isError } = useAuthUserQuery();

  const onNavItemClick = (section) => {
    if (!breakpoints["xl"]) setMobileNavOpen(false);
    navigate(section.path);
  };

  const onLogoutClick = async () => {
    logout();
    localStorage.clear();
    dispatch(authApi.util.resetApiState());
    if (!breakpoints["xl"]) setMobileNavOpen(false);
    navigate("/login");
  };

  return (
    <header
      className={twMerge(
        `w-full min-h-[70px] xs:min-h-[90px] backdrop-blur-md fixed z-[200] transition-all duration-long border-b`,
        className,
        mobileNavOpen && !breakpoints["xl"] ? "h-screen bg-white" : "h-[70px] xs:h-[90px] bg-white/80"
      )}
    >
      <div className="w-full max-w-body mx-auto flex justify-between py-3.5 xs:py-6 px-8 lg:px-24">
        <div
          className={twMerge(
            "grid place-content-start grid-flow-col items-center space-x-[20px] sm:space-x-[30px] transition-all duration-medium",
            !breakpoints["xl"] ? (mobileNavOpen ? "opacity-0" : "opacity-100 pointer-events-none") : ""
          )}
        >
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Home"
            className="hidden xsm:flex gap-2"
          >
            <Bashaway width={160} className="w-[160px] sm:w-[185px]" />
            <BashawayAdmin className="hidden sm:block" />
          </Link>
          <Times height="15px" width="15px" className="hidden xsm:block opacity-20" />
          <FOSS className="transform scale-[0.85] -translate-x-1" />
        </div>
        <div className={twMerge("absolute inset-0 xl:relative")}>
          <div className="w-full min-h-[70px] xs:min-h-[90px] xl:!min-h-0 flex justify-end items-center px-8 lg:px-24 relative z-50">
            <AnimatedSwitcher
              show={!mobileNavOpen && !breakpoints["xl"]}
              className="flex justify-center items-center h-full w-full"
              component={
                <RxHamburgerMenu className={twMerge(mobileNavIconStyles)} onClick={setMobileNavOpen.bind(this, true)} />
              }
              alternateComponent={
                <RxCross1 className={twMerge(mobileNavIconStyles)} onClick={setMobileNavOpen.bind(this, false)} />
              }
            />
          </div>
          <div
            className={twMerge(
              `h-full xl:bg-transparent xl:h-auto flex flex-col xl:flex-row justify-center items-center gap-[1.575rem] cursor-pointer font-semibold text-2xl xl:text-base`,
              !breakpoints["xl"] ? "transition-all duration-medium" : "",
              mobileNavOpen && !breakpoints["xl"]
                ? "opacity-100 delay-150 pb-[70px] xs:pb-[90px]"
                : "opacity-0 pointer-events-none xl:opacity-100 xl:pointer-events-auto"
            )}
          >
            {!whitelistedPaths.includes(location.pathname.split("/")[1]) &&
              internalNavLinks.map((section, index) => (
                <span
                  key={index}
                  onClick={() => onNavItemClick(section)}
                  className="hover:text-black/70 transition-all duration-medium"
                >
                  {section.name}
                </span>
              ))}
            {!data && isLoading ? (
              <Skeleton containerClassName="w-48 xl:w-24 h-[2.2rem]" className="rounded-full" />
            ) : isError ? (
              <Button to={accessRequestLink} className={buttonStyles}>
                Request Account
              </Button>
            ) : (
              <Button onClick={onLogoutClick} className={buttonStyles}>
                Logout
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
