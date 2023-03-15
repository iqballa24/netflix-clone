import { Movie } from '@/types/global';
import Image from 'next/image';
import React from 'react';

const Thumbnail: React.FC<Movie> = ({ ...movie }) => {
  const { poster_path, backdrop_path, title, original_title } = movie;

  return (
    <div className="relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105">
      <Image
        alt={title || original_title || ''}
        src={`https://image.tmdb.org/t/p/w500${backdrop_path || poster_path}`}
        className="rounded-sm object-cover md:rounded"
        fill
        priority
        sizes='100%'
      />
    </div>
  );
};

export default Thumbnail;
