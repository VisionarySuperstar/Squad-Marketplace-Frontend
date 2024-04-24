import React from 'react';

interface ButtonProps {
  name: string;
}

const GeneralButton: React.FC<ButtonProps> = ({name}) => {
  return (
    <button className='text-md rounded-xl border border-black pl-4 pr-4 pt-1 pb-1'>
       {name}
    </button>
  );
}

export default GeneralButton;