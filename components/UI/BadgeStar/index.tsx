import React from 'react';
import { FaStar } from 'react-icons/fa';

const BadgeStar: React.FC<{ value: number | string }> = ({ value }) => {
  return (
    <p className="flex text-lg md:text-xl items-center gap-2 text-yellow-400">
      <FaStar /> {value}
    </p>
  );
};

export default BadgeStar;
