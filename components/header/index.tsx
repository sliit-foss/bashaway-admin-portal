import React from "react";

export function Header() {
  return (
    <div className="w-full flex flex-row min-h-[5em] sticky bg-black justify-center items-center text-white">
      <img
        src="https://bashaway.sliitfoss.org/assets/bashaway-logo.svg"
        alt="bashaway"
        className="ml-10"
      />
      <div className="ml-4 rounded-[30px] bg-blue-900 px-3 py-2">
        Admin Panel
      </div>
      <div className="flex-grow"></div>
    </div>
  );
}
