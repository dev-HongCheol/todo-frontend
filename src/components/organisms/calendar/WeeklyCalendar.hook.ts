import { calendarStore, taskStore } from '@/libs/zustand';
import { format, add, parse, isValid } from 'date-fns';
import React, {
  ChangeEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { ClassNames, SelectSingleEventHandler } from 'react-day-picker';
import styles from 'react-day-picker/dist/style.module.css';
import { usePopper } from 'react-popper';

const useWeeklyCalendar = () => {
  const { selectedDate, setSelectedDate } = calendarStore((state) => state);
  const { setFilter } = taskStore((state) => state);
  const [inputValue, setInputValue] = useState<string>('');
  const [isPopperOpen, setIsPopperOpen] = useState(false);
  const [selected, setSelected] = useState<Date>(new Date(selectedDate));
  const popperRef = useRef<HTMLDivElement>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);

  const popper = usePopper(popperRef.current, popperElement, {
    placement: 'bottom-end',
  });

  useEffect(() => {
    const dateStr = format(selected, 'yyyy-MM-dd');
    setSelectedDate(dateStr);
    setFilter({ period: dateStr });
  }, [selected, setFilter, setSelectedDate]);

  useEffect(() => {
    setSelected(new Date(selectedDate));
  }, [selectedDate]);

  const handleChangeWeek = (type: 'previous' | 'next') => {
    setSelected((pre) => add(pre, { weeks: type === 'next' ? 1 : -1 }));
  };
  const classNames: ClassNames = {
    ...styles,
    root: `${styles.root} rdp-root`,
    table: `${styles.table} rdp-table`,
    month: `${styles.month} rdp-month`,
    head: `${styles.head} rdp-head`,
    day_today: `${styles.day_today} rdp-day-today`,
    head_cell: `${styles.head_cell} rdp-head-cell`,
    button: `${styles.button} rdp-button`,
    day_selected: `${styles.day_selected} rdp-day-selected`,
    day_outside: `${styles.day_outside} rdp-day-outside`,
    caption: `${styles.caption} rdp-caption`,
    caption_label: `${styles.caption_label} rdp-caption-label`,
    nav: `${styles.nav} rdp-nav`,
    day: `${styles.day} rdp-day`,
    cell: `${styles.cell} rdp-cell`,
  };

  const handleDaySelect: SelectSingleEventHandler = (
    date,
    _selectedDay,
    _activeModifiers,
    event,
  ) => {
    event.stopPropagation();

    if (date) {
      setInputValue(format(date, 'y-MM-dd'));
      setIsPopperOpen(false);
      setSelected(date);
    } else {
      setInputValue('');
    }
  };

  const handleDocumentClick = useCallback(
    (event: CustomEvent<MouseEvent>) => {
      if (!popperElement || !event.target) return;
      if (
        popperElement.contains(event.target as Element) ||
        event.target === popperElement
      ) {
        return;
      }
      setIsPopperOpen(false);
    },
    [popperElement],
  );

  useEffect(() => {
    if (!popperElement) return;
    document.addEventListener('mousedown', handleDocumentClick as EventListener);
    return () => {
      document.removeEventListener('mousedown', handleDocumentClick as EventListener);
    };
  }, [handleDocumentClick, popperElement]);

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputValue(e.currentTarget.value);
    const date = parse(e.currentTarget.value, 'y-MMMM-dd', new Date());

    if (isValid(date)) {
      setSelected(date);
    }
  };

  const handleButtonClick = () => {
    setIsPopperOpen(true);
  };
  return {
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
  };
};

export default useWeeklyCalendar;
