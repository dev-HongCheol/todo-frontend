import ToggleButton from '@/components/atoms/button/ToggleButton';
import React from 'react';
import useFilterButtons from './FilterButtons.hook';

const FilterButtons = () => {
  const { isToday, handleTodayToggle, handleCompletedToggle } = useFilterButtons();
  return (
    <div className="mt-4 flex gap-14 rounded border border-none bg-dark px-3 py-5">
      <div className="basis-1/2">
        <ToggleButton
          disabled={isToday}
          isDefaultActive={isToday}
          onClick={handleTodayToggle}
          classname="w-full"
        >
          Today
        </ToggleButton>
      </div>
      <div className="basis-1/2">
        <ToggleButton
          isDefaultActive={false}
          onClick={handleCompletedToggle}
          classname="w-full"
        >
          Completed
        </ToggleButton>
      </div>
    </div>
  );
};

export default React.memo(FilterButtons);
