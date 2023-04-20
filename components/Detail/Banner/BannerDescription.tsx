import React from 'react';
import Image from 'next/image';
import { FaPlay, FaStar } from 'react-icons/fa';
import {
  HiOutlineCheck,
  HiOutlinePlus,
  HiHandThumbUp,
  HiOutlineHandThumbUp,
} from 'react-icons/hi2';
import { bookmarkMovieState, likedMovieState } from '@/atoms/modalAtom';
import { useRecoilState } from 'recoil';
import { BadgeStar, TextDescription } from '@/components/UI';

interface Props {
  id: string;
  title: string;
  banner: string;
  overview: string;
  genre: string;
  language: string;
  vote: number;
  vote_average: number | string;
  release_date: string;
  handlePlay: () => void;
  tagline: string;
  status: string;
}

const BannerDescription: React.FC<Props> = ({
  id,
  title,
  banner,
  overview,
  genre,
  language,
  vote,
  vote_average,
  release_date,
  handlePlay,
  tagline,
  status,
}) => {
  const [bookmarkMovie, setBookmarkMovie] = useRecoilState(bookmarkMovieState);
  const [likedMovie, setLikedMovie] = useRecoilState(likedMovieState);
  const hasAddToBookmark = bookmarkMovie.includes(id);
  const hasLikedMovie = likedMovie.includes(id);

  const handleBookmark = () => {
    if (hasAddToBookmark) {
      setBookmarkMovie((prev) => prev.filter((item) => item !== id));
    } else {
      setBookmarkMovie((prev) => [...prev, id]);
    }
  };

  const handleLike = () => {
    if (hasLikedMovie) {
      setLikedMovie((prev) => prev.filter((item) => item !== id));
    } else {
      setLikedMovie((prev) => [...prev, id]);
    }
  };

  return (
    <div className="w-full h-full flex flex-col md:flex-row items-center gap-8 lg:gap-16">
      <Image
        alt=""
        src={banner}
        width={350}
        height={450}
        priority
        className="object-cover rounded-lg"
        sizes="100%"
      />
      <div className="flex flex-col space-y-6 py-16">
        <div className="space-y-2">
          <h2 className="text-2xl text-white font-bold sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          <BadgeStar value={vote_average} />
          <TextDescription title="Genres" text={genre} />
        </div>
        <h3 className="text-xl font-medium italic text-[gray]">{tagline}</h3>
        <div className="space-y-2">
          <h3 className="text-xl font-bold">Overview</h3>
          <p className="text-shadow-md text-base text-white md:max-w-lg md:text-lg lg:max-w-2xl lg:text-xl xl:max-w-4xl">
            {overview}
          </p>
        </div>
        <div className="flex space-x-4 items-center">
          <button className="modalButton" onClick={handleBookmark}>
            {hasAddToBookmark ? (
              <HiOutlineCheck className="h-7 w-7" />
            ) : (
              <HiOutlinePlus className="h-7 w-7" />
            )}
          </button>
          <button className="modalButton" onClick={handleLike}>
            {hasLikedMovie ? (
              <HiHandThumbUp className="h-7 w-7 text-green-500" />
            ) : (
              <HiOutlineHandThumbUp className="h-7 w-7" />
            )}
          </button>
          <button
            className="bg-transparent text-white flex flex-row items-center gap-3"
            onClick={handlePlay}
          >
            <FaPlay className="h-4 w-4 md:h-7 md:w-7" /> Play Trailer
          </button>
        </div>
        <div className="grid grid-cols-2 gap-5">
          <TextDescription title="Original language" text={language} />
          <TextDescription title="Release date" text={release_date} />
          <TextDescription title="Total votes" text={vote} />
          <TextDescription title="Status" text={status} />
        </div>
      </div>
    </div>
  );
};

export default React.memo(BannerDescription);
