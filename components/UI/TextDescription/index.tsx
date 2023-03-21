import React from 'react';

interface Props {
  title: string;
  text: string | number;
}

const TextDescription: React.FC<Props> = ({ title, text }) => {
  return (
    <p className='flex flex-col'>
      <span className="text-[gray]">{title}:</span>
      {text}
    </p>
  );
};

export default TextDescription;
