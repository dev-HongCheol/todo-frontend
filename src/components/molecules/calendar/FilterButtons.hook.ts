import { calendarStore, taskStore } from '@/libs/zustand';
import { format } from 'date-fns';
import React, { useCallback, useEffect, useState } from 'react';

const useFilterButtons = () => {
  const { selectedDate, setSelectedDate } = calendarStore((state) => state);
  const { setFilter } = taskStore(useCallback((state) => state, []));
  const [isToday, setIsToday] = useState(true);
  const getToday = () => new Date();

  // today버튼 이벤트. 오늘 날짜 선택
  const handleTodayToggle = (isActive: boolean) => {
    if (isActive) setSelectedDate(format(getToday(), 'yyyy-MM-dd'));
  };

  // completed 버튼 선택 여부에 따른 filter 설정
  const handleCompletedToggle = (isActive: boolean) => {
    setFilter({ isCompleted: isActive ? 'done' : 'all' });
  };

  // 선택된 날짜 변경에 따른 오늘 여부 체크
  useEffect(() => {
    const _isToday = format(getToday(), 'yyyy-MM-dd') === selectedDate;
    setIsToday(_isToday);
  }, [selectedDate]);

  return { isToday, handleTodayToggle, handleCompletedToggle };
};

export default useFilterButtons;
