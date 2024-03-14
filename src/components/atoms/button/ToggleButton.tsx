import React, { ReactNode, useEffect, useState } from 'react';
import Button from './Button';

type ToggleButtonProps = {
  children: ReactNode;
  onClick?: (isActive: boolean) => void;
  isDefaultActive?: boolean;
  classname?: string;
  disabled?: boolean;
};

const ToggleButton = ({
  children,
  isDefaultActive = true,
  onClick,
  classname = '',
  disabled = false,
}: ToggleButtonProps) => {
  const [isActive, setIsActive] = useState(isDefaultActive);
  useEffect(() => {
    setIsActive(isDefaultActive);
  }, [isDefaultActive]);

  const handleToggleBtn = (isActive: boolean) => {
    setIsActive(!isActive);
    onClick && onClick(!isActive);
  };

  return (
    <Button
      variant={isActive ? 'contained' : 'outlined'}
      className={`${!isActive ? 'border-white/30' : ''} ${classname}`}
      onClick={() => handleToggleBtn(isActive)}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export default ToggleButton;
