import { useState } from "react";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { twMerge } from "tailwind-merge";

const Input = ({ ...props }) => {
  const [localType, setLocalType] = useState(props.type || "text");
  const suffixIconStyle = `w-[1.8rem] h-[1.8rem] ${
    props.theme === "light" ? "text-black" : "text-gray-100 hover:text-gray-400 transition duration-300"
  } cursor-pointer`;
  return (
    <div className={`${props.wrapperclasses || ""} w-full relative`}>
      <input
        {...props}
        className={twMerge(
          `w-full h-14 sm:h-16 bg-transparent border-[1px] focus:border-primary outline-none rounded-md ${
            props.theme === "light" ? "text-black hover:text-black" : "text-gray-100 hover:text-white"
          } p-4 text-base font-normal transition duration-300 dark ${props.className}`,
          props.className
        )}
        type={localType}
      />
      {props.type === "password" && (
        <div
          className={`w-fit h-full absolute right-3 top-0 flex justify-center items-center ${
            props.className.includes("hidden") || props.className.includes("opacity-0") ? "hidden opacity-0" : ""
          }`}
        >
          {localType === "password" ? (
            <BsFillEyeFill className={suffixIconStyle} onClick={() => setLocalType("text")} />
          ) : (
            <BsFillEyeSlashFill className={suffixIconStyle} onClick={() => setLocalType("password")} />
          )}
        </div>
      )}
    </div>
  );
};

export default Input;
