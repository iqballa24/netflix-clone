import Image from 'next/image';
import { memo } from 'react';
import { FaPlay } from 'react-icons/fa';
import { Movie } from '@/types/global';
import { BASE_URL } from '@/constant/movie';
import { InformationCircleIcon } from '@heroicons/react/24/solid';
import { useRecoilState } from 'recoil';
import { modalState, movieState } from '@/atoms/modalAtom';
import shortenText from '@/utils/shortenText';
import Link from 'next/link';

const Banner: React.FC<{ movie: Movie | null }> = ({ movie }) => {
  const setShowModal = useRecoilState(modalState)[1];
  const setCurrentMovie = useRecoilState(movieState)[1];
  const overviewShorten = shortenText({ maxLen: 300, text: movie?.overview! });

  const detailMovieHandler = () => {
    setShowModal(true);
    setCurrentMovie(movie);
  };

  return (
    <div className="flex flex-col space-y-3 py-16 md:space-y-6 lg:h-[65vh] lg:justify-end lg:pb-0">
      <div className="absolute top-0 left-0 -z-10 h-[95vh] min-w-full">
        <Image
          alt={movie?.name || movie?.original_title || ''}
          src={`${BASE_URL}${movie?.backdrop_path || movie?.poster_path}`}
          fill
          priority
          className="object-cover"
          sizes="100%"
        />
      </div>
      <h2 className="text-2xl text-white font-bold md:text-4xl lg:text-7xl">
        {movie?.title || movie?.original_title || movie?.name}
      </h2>
      <p className="max-w-xs text-shadow-md text-xs text-white md:max-w-lg md:text-lg lg:max-w-2xl lg:text-xl text-clip ">
        {overviewShorten !== ''
          ? overviewShorten
          : "We don't have an overview translated in English."}
      </p>
      <div className="flex space-x-3">
        <button
          className="bannerButton bg-white text-black"
          onClick={detailMovieHandler}
        >
          <FaPlay className="h-4 w-4 text-black md:h-7 md:w-7" /> Trailer
        </button>
        <Link
          href={`/${movie?.media_type === 'tv' ? 'tv' : 'movie'}/${movie?.id}`}
          className="bannerButton bg-[gray]/70"
        >
          More Info <InformationCircleIcon className="h-5 w-5 md:h-8 md:w-8" />
        </Link>
      </div>
    </div>
  );
};

export default memo(Banner);
