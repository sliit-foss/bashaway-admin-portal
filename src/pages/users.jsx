import { useState } from "react";
import { Plus } from "lucide-react";
import { User, UserDialog, UserGridSkeleton } from "@/components/users";
import { userFilters } from "@/filters";
import { useTitle } from "@/hooks";
import { store } from "@/store";
import { useGetAllUsersQuery, useLazyGetAllUsersQuery, userApi } from "@/store/api";
import { toggleAddUserDialog } from "@/store/reducers/ui/user";
import { AnimatedSwitcher, Button, Filters, NoRecords, Pagination } from "@sliit-foss/bashaway-ui/components";
import { computeFilterQuery } from "@sliit-foss/bashaway-ui/utils";

const gridStyles = "w-full h-full grid grid-cols-1 lg:grid-cols-2 justify-start items-center gap-5";

const onAddClick = () => store.dispatch(toggleAddUserDialog(true));

const Users = () => {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState(computeFilterQuery(userFilters));

  const { data: users, isFetching, isError } = useGetAllUsersQuery({ filters, page });

  const [trigger] = useLazyGetAllUsersQuery();

  const refresh = () => {
    store.dispatch(userApi.util.resetApiState());
    trigger({ filters, page });
  };

  useTitle("Users | Bashaway");

  return (
    <>
      <Filters
        filters={userFilters}
        setFilterQuery={setFilters}
        action={
          <Button className="w-full py-4" onClick={onAddClick}>
            <Plus strokeWidth="2.5" />
            Add User
          </Button>
        }
        styles={{
          root: "md:grid grid-cols-5 self-center mb-8 [&>div:nth-child(2)]:col-span-2 [&>div:nth-child(3)]:col-span-2 [&>div:nth-child(4)]:col-span-2",
          filter: "md:w-auto"
        }}
      />
      <div className="w-full min-h-[60vh] flex flex-col gap-12 justify-between items-center">
        <AnimatedSwitcher
          show={isFetching || isError}
          component={<UserGridSkeleton className={gridStyles} />}
          alternateComponent={
            users?.data?.docs?.length ? (
              <div className={gridStyles}>
                {users?.data?.docs?.map((user) => (
                  <User key={`user-${user._id}`} user={user} />
                ))}
              </div>
            ) : (
              <NoRecords text="No users found in the system yet" className="mt-12" />
            )
          }
        />
        <div className="w-full flex justify-center items-center mt-6 mb-2">
          <Pagination
            currentPage={page}
            onPageChange={(newPage) => setPage(newPage)}
            totalPages={users?.data?.totalPages}
          />
        </div>
      </div>
      <UserDialog refresh={refresh} />
    </>
  );
};

export default Users;
