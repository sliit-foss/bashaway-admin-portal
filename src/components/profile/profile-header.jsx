import { Mail } from "lucide-react";
import { isEmpty } from "lodash";
import { AnimatedSwitcher, Badge, Skeleton } from "@sliit-foss/bashaway-ui/components";

const ProfileHeader = ({ team }) => {
  return (
    <AnimatedSwitcher
      show={!isEmpty(team)}
      className="w-full flex flex-col justify-center items-center"
      component={
        <>
          <span className="text-[30px] lg:text-[32px] text-center font-bold lg:text-start tracking-[-2px] mt-12 lg:mt-0">
            {team?.name}
          </span>
          <Badge className="normal-case border flex justify-center items-center gap-1.5 card-red-badge my-4">
            {team?.email}
            <Mail className="translate-y-[-0.025rem]" size={14} />
          </Badge>
        </>
      }
      alternateComponent={
        <>
          <Skeleton className="w-64 h-[1.8rem] mt-[52px] lg:mt-2" />
          <div className="self-center flex items-center gap-1.5 border-2 border-black/5 px-4 py-1 my-4 sm:mt-[1.32rem] rounded-full z-50">
            <Skeleton className="w-32 h-3 rounded-lg" />
            <Mail className="translate-y-[-0.025rem] opacity-40" size={14} />
          </div>
        </>
      }
    />
  );
};

export default ProfileHeader;
