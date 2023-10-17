import { useMemo } from "react";
import { DashboardCard, GhostLegion, RegistrationChart } from "@/components/dashboard";
import { useTitle } from "@/hooks";
import { Building, Folder, UserGroup, Users, Users2 } from "@/icons";
import { useGetQuestionSubmissionsQuery, useGetRegistrationInfoQuery, useGetTeamSubmissionsQuery } from "@/store/api";
import { TwinSwitch } from "@sliit-foss/bashaway-ui/components";
import { useGhostLegion, useRound } from "@sliit-foss/bashaway-ui/hooks";
import { Title } from "@sliit-foss/bashaway-ui/typography";

const Dashboard = () => {
  const { rounds, round, roundKey, onRoundChange } = useRound();

  const { ghostLegion, toggleGhostLegion } = useGhostLegion();

  const { data: { data: registrationInfo } = {}, isFetching: isRegistrationInfoFetching } = useGetRegistrationInfoQuery({ round, ghostLegion });
  const { data: { data: questionSubmissionInfo } = {}, isFetching: isQuestionSubmissionsFetching } = useGetQuestionSubmissionsQuery({ round, ghostLegion });
  const { data: { data: teamSubmissionInfo } = {}, isFetching: isTeamSubmissionsFetching } = useGetTeamSubmissionsQuery({ round, ghostLegion });

  useTitle("Dashboard | Bashaway");

  const totalSubmissions = useMemo(
    () => questionSubmissionInfo?.reduce((acc, curr) => acc + curr.submission_count, 0),
    [questionSubmissionInfo]
  );

  return (
    <div className="w-full min-h-[60vh] flex flex-col gap-7 items-start">
      <div className="w-full flex justify-center items-center gap-4 mb-3">
        <TwinSwitch values={rounds} className="" onChange={onRoundChange} selectedValue={roundKey} />
        <GhostLegion ghostLegion={ghostLegion} toggleGhostLegion={toggleGhostLegion} round={round} />
      </div>
      <div className="w-full h-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 justify-start items-start gap-5">
        <DashboardCard icon={Building} title="Universities" value={registrationInfo?.university_counts?.length} loading={isRegistrationInfoFetching}/>
        <DashboardCard icon={Users} title="Teams" value={registrationInfo?.total_registrations} loading={isRegistrationInfoFetching}/>
        <DashboardCard icon={Users2} title="Individuals" value={registrationInfo?.total_members} loading={isRegistrationInfoFetching}/>
        <DashboardCard icon={Folder} title="Submissions" value={totalSubmissions} loading={isQuestionSubmissionsFetching}/>
        <DashboardCard
          className="col-span-2 md:col-span-1"
          icon={UserGroup}
          title="Teams Submitted"
          value={teamSubmissionInfo?.length}
          loading={isTeamSubmissionsFetching}
        />
      </div>
      <Title>Statistics</Title>
      <RegistrationChart round={round} ghostLegion={ghostLegion} />
    </div>
  );
};

export default Dashboard;
