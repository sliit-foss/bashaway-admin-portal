import { useMemo } from "react";
import { DashboardCard, RegistrationChart } from "@/components/dashboard";
import { useTitle } from "@/hooks";
import { Building, Folder, UserGroup, Users, Users2 } from "@/icons";
import { useGetQuestionSubmissionsQuery, useGetRegistrationInfoQuery, useGetTeamSubmissionsQuery } from "@/store/api";
import { Title } from "@sliit-foss/bashaway-ui/typography";

const Dashboard = () => {
  const { data: { data: registrationInfo } = {} } = useGetRegistrationInfoQuery();
  const { data: { data: questionSubmissionInfo } = {} } = useGetQuestionSubmissionsQuery();
  const { data: { data: teamSubmissionInfo } = {} } = useGetTeamSubmissionsQuery();

  useTitle("Dashboard | Bashaway");

  const totalSubmissions = useMemo(
    () => questionSubmissionInfo?.reduce((acc, curr) => acc + curr.submission_count, 0),
    [questionSubmissionInfo]
  );

  return (
    <div className="w-full min-h-[60vh] flex flex-col gap-7 items-start">
      <div className="w-full h-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 justify-start items-start gap-5">
        <DashboardCard icon={Building} title="Universities" value={registrationInfo?.university_counts?.length} />
        <DashboardCard icon={Users} title="Teams" value={registrationInfo?.total_registrations} />
        <DashboardCard icon={Users2} title="Individuals" value={registrationInfo?.total_members} />
        <DashboardCard icon={Folder} title="Submissions" value={totalSubmissions} />
        <DashboardCard
          className="col-span-2 md:col-span-1"
          icon={UserGroup}
          title="Teams Submitted"
          value={teamSubmissionInfo?.length}
        />
      </div>
      <Title>Statistics</Title>
      <RegistrationChart />
    </div>
  );
};

export default Dashboard;
