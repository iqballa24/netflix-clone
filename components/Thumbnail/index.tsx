import Image from 'next/image';
import React from 'react';
import { useRecoilState } from 'recoil';
import { modalState, movieState } from '@/atoms/globalAtoms';
import { Movie } from '@/types/global';

const Thumbnail: React.FC<Movie> = ({ ...movie }) => {
  const { poster_path, backdrop_path, title, original_title } = movie;
  const setShowModal = useRecoilState(modalState)[1];
  const setCurrentMovie = useRecoilState(movieState)[1];

  const detailMovieHandler = () => {
    setShowModal(true);
    setCurrentMovie(movie);
  };

  return (
    <div
      className="relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105"
      onClick={detailMovieHandler}
    >
      <Image
        alt={title || original_title || ''}
        src={`https://image.tmdb.org/t/p/w500${backdrop_path || poster_path}`}
        className="rounded-sm object-cover md:rounded"
        fill
        priority
        sizes="100%"
      />
    </div>
  );
};

export default Thumbnail;
