'use client';
import React from 'react';
import FilterButtons from '@/components/molecules/calendar/FilterButtons';
import WeeklyCalendar from '@/components/organisms/calendar/WeeklyCalendar';
import useTodayTaskPage from '../tasks/TodayTaskPage.hook';
import TaskListSkeleton from '@/components/organisms/taskList/TaskList.skeleton';
import TodayTaskNone from '@/components/molecules/todayTaskNone/TodayTaskNone';
import TaskList from '@/components/organisms/taskList/TaskList';

const CalendarTempl = () => {
  const { tasks, isLoading, isTodayNone } = useTodayTaskPage();
  return (
    <>
      <WeeklyCalendar />
      <FilterButtons />
      {isLoading || !tasks ? (
        <TaskListSkeleton />
      ) : isTodayNone && tasks.length === 0 ? (
        <TodayTaskNone />
      ) : (
        <TaskList tasks={tasks} />
      )}
    </>
  );
};

export default CalendarTempl;
