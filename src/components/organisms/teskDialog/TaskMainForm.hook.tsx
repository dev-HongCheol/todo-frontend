import { useClientTranslation } from '@/libs/i18n/useClientTranslation';
import { taskStore } from '@/libs/zustand';
import { AddTask, TASK_FORM_STEP, Task } from '@/types/task/task.type';
import React, { useEffect, useRef } from 'react';

export const useTaskMainForm = (
  title: string,
  description: string,
  handleSetFormValue: (name: keyof AddTask | keyof Task, value: any) => void,
  handleSetTaskFormStep: (taskFormStep: TASK_FORM_STEP) => void,
  setIsShowModal: (isShowModal: boolean) => void,
) => {
  const { t } = useClientTranslation('taskDialog');
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const { isEditMode } = taskStore((state) => state);

  const handleCloseDialog = () => {
    setIsShowModal(false);
  };

  useEffect(() => {
    if (titleRef.current) titleRef.current.value = title;
    if (descriptionRef.current) descriptionRef.current.value = description;
  }, []);

  const handleOnClickTaskStep = (taskFormStep: TASK_FORM_STEP) => {
    if (titleRef.current) handleSetFormValue('title', titleRef.current?.value);
    if (descriptionRef.current)
      handleSetFormValue('description', descriptionRef.current?.value);
    handleSetTaskFormStep(taskFormStep);
  };

  return {
    t,
    titleRef,
    descriptionRef,
    handleOnClickTaskStep,
    handleCloseDialog,
    isEditMode,
  };
};
