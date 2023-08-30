import { DashboardCard } from "@/components/dashboard";
import { useTitle } from "@/hooks";
import { Building, Folder, UserGroup, Users, Users2 } from "@/icons";
import { useGetQuestionSubmissionsQuery, useGetRegistrationInfoQuery } from "@/store/api";
import { AnimatedSwitcher, Filters, NoRecords, Pagination, Sorts } from "@sliit-foss/bashaway-ui/components";


const Dashboard = () => {

  const { data: registrationInfo, isLoading } = useGetRegistrationInfoQuery();
  const { data: submissionInfo } = useGetQuestionSubmissionsQuery();

  useTitle("Dashboard | Bashaway");

  return (
    <div className="w-full min-h-[60vh] flex flex-col gap-12 justify-between items-center">
      <div className="w-full h-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 justify-start items-center gap-5">
        <DashboardCard
          icon={Building}
          title="Universities"
          value={12}
        />
        <DashboardCard
          icon={Users}
          title="Teams"
          value={12}
        />
        <DashboardCard
          icon={Users2}
          title="Individuals"
          value={12}
        />
        <DashboardCard
          icon={Folder}
          title="Submissions"
          value={12}
        />
        <DashboardCard
          className="col-span-2 md:col-span-1"
          icon={UserGroup}
          title="Teams Submitted"
          value={12}
        />
      </div>
    </div>
  );
};

export default Dashboard;
