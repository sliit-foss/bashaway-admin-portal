import { twMerge } from "tailwind-merge";
import { Ghost } from "@sliit-foss/bashaway-ui/icons";

const GhostLegion = ({ ghostLegion, toggleGhostLegion, round }) => {
  return (
    <div
      className={twMerge(
        "group transition-all duration-medium rounded-full cursor-pointer flex justify-center items-center",
        ghostLegion ? "bg-[#f00]" : "bg-gray-200 hover:bg-[#f00]",
        round === 2 ? "w-12 h-12 opacity-100 p-2" : "w-0 h-0 opacity-0 p-0"
      )}
      onClick={toggleGhostLegion}
    >
      <Ghost
        className={twMerge(
          "transition-all duration-medium fill-current",
          ghostLegion ? "text-white" : "text-black group-hover:text-white",
          round === 2 ? "w-6 h-6 opacity-100" : "w-0 h-0 opacity-0"
        )}
      />
    </div>
  );
};

export default GhostLegion;
