import { format } from 'date-fns';
import InputText from '@/components/atoms/inputText/InputText';
import NextIcon from '@/images/icons/arrow-left.svg';
import PreviousIcon from '@/images/icons/back-button.svg';
import React from 'react';
import { DayPicker } from 'react-day-picker';
import WeeklyDayButtons from '@/components/molecules/calendar/WeeklyDayButtons';
import './data/calendarPicker.css';
import useWeeklyCalendar from './WeeklyCalendar.hook';

const WeeklyCalendar = () => {
  const {
    popper,
    popperRef,
    handleChangeWeek,
    handleButtonClick,
    inputValue,
    handleInputChange,
    isPopperOpen,
    setPopperElement,
    selected,
    setSelected,
    handleDaySelect,
    classNames,
  } = useWeeklyCalendar();
  return (
    <div className="weekly-calendar bg-dark py-2">
      <div className="mx-auto mb-4 flex items-center justify-between" ref={popperRef}>
        <div className="flex-none">
          <button onClick={() => handleChangeWeek('previous')}>
            <PreviousIcon />
          </button>
        </div>
        <div className="relative flex-none text-center" onClick={handleButtonClick}>
          <p>{format(new Date(), 'MMMM')}</p>
          <p className="text-xs font-extralight">{format(new Date(), 'yyyy')}</p>
          <InputText
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            className="hidden"
          />
          {isPopperOpen && (
            <div
              tabIndex={-1}
              style={popper.styles.popper}
              className="dialog-sheet"
              {...popper.attributes.popper}
              ref={setPopperElement}
              role="dialog"
              aria-label="DayPicker calendar"
            >
              <DayPicker
                initialFocus={isPopperOpen}
                mode="single"
                defaultMonth={selected}
                selected={selected}
                onSelect={handleDaySelect}
                classNames={classNames}
              />
            </div>
          )}
        </div>
        <div className="flex-none">
          <button onClick={() => handleChangeWeek('next')}>
            <NextIcon />
          </button>
        </div>
      </div>
      <WeeklyDayButtons selectedDay={selected} setSelectedDay={setSelected} />
    </div>
  );
};

export default WeeklyCalendar;
