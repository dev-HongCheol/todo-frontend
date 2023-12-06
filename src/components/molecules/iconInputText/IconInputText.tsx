import InputText from '@/components/atoms/inputText/InputText';
import Image from 'next/image';
import React from 'react';
import { IconInputTextProps } from './IconInputText.types';

const IconInputText = (props: IconInputTextProps) => {
  return (
    <div className="flex items-center">
      <Image src={props.iconsrc} alt={props.alt} className="absolute ml-2" />
      <InputText {...props} className="pl-10" />
    </div>
  );
};

export default IconInputText;
