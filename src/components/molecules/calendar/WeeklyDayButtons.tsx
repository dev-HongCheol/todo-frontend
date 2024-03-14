import { add, format } from 'date-fns';

import React from 'react';
import { twMerge } from 'tailwind-merge';

type WeeklyDayButtonsProps = {
  selectedDay: Date;
  setSelectedDay: React.Dispatch<React.SetStateAction<Date>>;
};

const WeeklyDayButtons = ({ selectedDay, setSelectedDay }: WeeklyDayButtonsProps) => {
  const weekArray = new Array(7).fill(1);
  const isWeekend = (date: Date) => {
    const dayOfWeek = Number(format(date, 'i'));
    return dayOfWeek === 6 || dayOfWeek === 7;
  };

  return (
    <div className="flex">
      {weekArray.map((_date, index) => {
        const day = add(selectedDay, { days: -3 + index });
        return (
          <div key={index} className="flex-auto text-center">
            <button
              className={twMerge(
                'mx-auto w-fit min-w-11 rounded-md bg-black/25 px-1 py-2 text-xs',
                selectedDay.getTime() === day.getTime() && 'bg-primary',
              )}
              onClick={() => setSelectedDay(day)}
            >
              <p className={`mb-2 ${isWeekend(day) && 'text-red-500'}`}>
                {format(day, 'EEE').toLocaleUpperCase()}
              </p>
              <p className="">{format(day, 'd')}</p>
            </button>
          </div>
        );
      })}
    </div>
  );
};

function WeeklyDayButtonsPropsSelectedDayEqual(
  prevWeeklyDayButtons: WeeklyDayButtonsProps,
  nextWeeklyDayButtons: WeeklyDayButtonsProps,
) {
  return prevWeeklyDayButtons.selectedDay === nextWeeklyDayButtons.selectedDay;
}

export default React.memo(WeeklyDayButtons, WeeklyDayButtonsPropsSelectedDayEqual);
