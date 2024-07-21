import React from 'react';
// import getWeek from 'date-fns/getWeek';
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from '@radix-ui/react-tooltip';

type ActivityPoint = {
  date: string;
  value: number;
};

interface HeatMapProps {
  data: ActivityPoint[];
  firstDay?: string;
  finishOnLastActiveDay?: boolean;
}

const HeatMap = (props: HeatMapProps) => {
  const { data, firstDay, finishOnLastActiveDay = false } = props;

  if (!data.length) {
    return <div>No data</div>;
  }

  const dataWithDatesParsed = data.map((d) => ({
    date: new Date(d.date),
    value: d.value,
  }));

  const sortedByDate = dataWithDatesParsed.sort((a, b) => {
    return a.date.getTime() - b.date.getTime();
  });

  const startDate = new Date(firstDay || sortedByDate[0].date);
  const endDate = finishOnLastActiveDay
    ? sortedByDate[sortedByDate.length - 1].date
    : new Date();

  let sparseData = [] as typeof sortedByDate;

  for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
    const value =
      sortedByDate.find((s) => s.date.getTime() === d.getTime())?.value || 0;
    sparseData.push({
      date: new Date(d),
      value,
    });
  }

  // const firstWeekNumber = getWeek(sparseData[0].date);
  // const lastWeekNumber = getWeek(sparseData[sparseData.length - 1].date);
  const range = Math.max(...sparseData.map((d) => d.value));
  const size = 20;
  const firstWeekDay = sparseData[0].date.getDay();
  const sparseDays = firstWeekDay === 0 ? 6 : firstWeekDay - 1;

  // Add empty days to the beginning of the week
  const emptyDays = Array.from(Array(sparseDays).keys()).map((d) => ({
    date: new Date(sparseData[0].date).setDate(d),
    value: 0,
  }));

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="heat-map grid grid-flow-col grid-rows-7 auto-cols-max gap-1 max-w-5xl">
      {weekDays.map((day) => (
        <div className="text-center text-xs text-gray-500 mr-2 mt-1" key={day}>
          {day}
        </div>
      ))}
      {emptyDays.map((d) => {
        return (
          <div
            key={d.date.toString()}
            className="border-transparent overflow-hidden"
          >
            <div style={{ width: size, height: size, opacity: 0 }} />
          </div>
        );
      })}
      {sparseData.map((d) => {
        return (
          <TooltipProvider key={d.date.toString()}>
            <Tooltip>
              <TooltipTrigger>
                <div className="rounded border border-blue-100 overflow-hidden">
                  <div
                    className="bg-blue-500"
                    style={{
                      width: size,
                      height: size,
                      opacity: d.value / range,
                    }}
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs text-gray-500 bg-white p-1 border opacity-1 rounded">
                  {d.date.toDateString()}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      })}
    </div>
  );
};

export default HeatMap;
