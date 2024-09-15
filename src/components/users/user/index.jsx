import { GraduationCap, Power, Settings } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { store } from "@/store";
import { useUpdateUserMutation, userApi } from "@/store/api";
import { useAuthUserQuery } from "@/store/api";
import { IconButton, Metric, toast } from "@sliit-foss/bashaway-ui/components";
import { Body2, Callout } from "@sliit-foss/bashaway-ui/typography";

export { default as UserGridSkeleton } from "./skeleton";

export const User = ({ user }) => {
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const { data: { data: authUser } = {} } = useAuthUserQuery();

  const toggleActiveStatus = () => {
    updateUser({
      id: user._id,
      data: {
        is_active: !user.is_active
      }
    })
      .unwrap()
      .then(() => {
        toast({ title: user.is_active ? `User deactivated successfully` : `User activated successfully` });
        Object.values(store.getState().userApi.queries).forEach(
          ({ data: { data } = {}, endpointName, originalArgs }) => {
            if (endpointName == "getAllUsers" && data?.docs?.find((u) => u._id === user._id)) {
              store.dispatch(
                userApi.util.upsertQueryData("getAllUsers", originalArgs, {
                  data: {
                    ...data,
                    docs: data.docs.map((u) => {
                      if (u._id === user._id) return { ...u, is_active: !user.is_active };
                      return u;
                    })
                  }
                })
              );
            }
          }
        );
      });
  };

  return (
    <div className="group h-full w-full animated-border text-border from-black/20 to-border p-5 rounded-3xl">
      <div
        className={twMerge(
          "w-full h-full flex flex-col md:flex-row p-5 gap-2 rounded-2xl transition-all text-black duration-medium",
          user.role === "ADMIN" ? "bg-red-50/90 card-red-title" : "bg-gray-100/80"
        )}
      >
        <div className="flex flex-col gap-2">
          <Body2 className="font-bold font-inter transition-all duration-medium text-start">{user.name}</Body2>
          <Callout className="lg:text-[18px] text-start">{user.email}</Callout>
          <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-3 text-sm sm:text-base items-center text-black/40">
            {user.role !== "ADMIN" ? (
              <>
                <Metric
                  metric={<GraduationCap size={16} />}
                  styles={{
                    root: "h-full",
                    metric: "w-auto flex h-full flex justify-center items-center text-black",
                    animate: "w-full"
                  }}
                  value={user.university}
                />
                <Metric
                  metric="Score"
                  styles={{
                    metric: "text-black"
                  }}
                  value={(user.score ?? 0)?.toString().padStart(2, "0")}
                />
              </>
            ) : (
              <Metric
                metric={<Settings size={16} />}
                styles={{
                  root: "h-full card-red-body",
                  metric: "w-auto flex h-full flex justify-center items-center text-black card-red-title",
                  animate: "w-full"
                }}
                value="ADMIN"
              />
            )}
          </div>
        </div>
        <div className="ml-auto flex items-center">
          {authUser?.role == "ADMIN" && (
            <IconButton
              className={twMerge(
                "ml-auto self-center mt-2 md:mt-0",
                user.is_active ? "text-green-400 hover:text-red-500" : "text-red-500 hover:text-green-400"
              )}
              variant="secondary"
              icon={<Power size={16} />}
              label={user.is_active ? "Deactivate" : "Activate"}
              onClick={toggleActiveStatus}
              loading={isLoading}
              loaderProps={{ width: 16, height: 16 }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default User;
