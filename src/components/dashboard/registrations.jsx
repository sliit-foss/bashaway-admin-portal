import { memo } from "react";
import { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  Title,
  Tooltip
} from "chart.js";
import { default as isEqual } from "lodash/isEqual";
import { useBreakpoint } from "@/hooks";
import { useGetRegistrationInfoQuery } from "@/store/api";
import { Body2 } from "@sliit-foss/bashaway-ui/typography";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend, Filler);

const RegistrationChart = ({ round }) => {
  const { data: { data: registrationInfo } = {} } = useGetRegistrationInfoQuery({ round });

  const { md, lg } = useBreakpoint();

  const universityScale = {
    title: {
      display: lg,
      text: "Universities",
      font: {
        size: 16,
        weight: 600
      }
    },
    ticks: { callback: () => "●" }
  };

  const data = useMemo(() => {
    const labels = [],
      data = [],
      colors = [];
    registrationInfo?.university_counts?.forEach((university) => {
      labels.push(university.name);
      data.push(university.count);
      colors.push("#ffcccc");
    });
    return { labels, data, colors };
  }, [registrationInfo]);

  return (
    <div className="w-full border rounded-[20px] p-5 flex flex-col gap-3">
      <Body2 className="font-medium">Registrations per university</Body2>
      <Bar
        data={{
          labels: data.labels,
          datasets: [
            {
              label: "Registrations",
              backgroundColor: data.colors,
              data: data.data,
              borderRadius: 5
            }
          ]
        }}
        width={lg ? 1920 : window.innerWidth * 0.75}
        height={430}
        options={{
          responsive: md,
          indexAxis: lg ? "x" : "y",
          ticks: {
            precision: 0
          },
          scales: {
            x: lg ? universityScale : undefined,
            y: lg ? undefined : universityScale
          },
          plugins: {
            legend: {
              display: false
            }
          }
        }}
      />
    </div>
  );
};

export default memo(RegistrationChart, (prevProps, currentProps) => isEqual(prevProps, currentProps));
