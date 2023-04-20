import ReactPlayer from 'react-player/lazy';
import { useState } from 'react';
import { BiVolumeMute, BiVolumeFull } from 'react-icons/bi';
import {
  HiOutlinePlus,
  HiOutlineCheck,
  HiOutlineHandThumbUp,
  HiHandThumbUp,
} from 'react-icons/hi2';
import { useRecoilState } from 'recoil';
import { bookmarkMovieState, likedMovieState } from '@/atoms/modalAtom';
import { InformationCircleIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

interface Props {
  movieId: string;
  trailer: string;
  mediaType: string;
}

const VideoPlayer: React.FC<Props> = ({ movieId, trailer, mediaType }) => {
  const [muted, setMuted] = useState(false);
  const [bookmarkMovie, setBookmarkMovie] = useRecoilState(bookmarkMovieState);
  const [likedMovie, setLikedMovie] = useRecoilState(likedMovieState);
  const hasAddToBookmark = bookmarkMovie.includes(movieId);
  const hasLikedMovie = likedMovie.includes(movieId);

  const handleBookmark = () => {
    if (hasAddToBookmark) {
      setBookmarkMovie((prev) => prev.filter((item) => item !== movieId));
    } else {
      setBookmarkMovie((prev) => [...prev, movieId]);
    }
  };

  const handleLike = () => {
    if (hasLikedMovie) {
      setLikedMovie((prev) => prev.filter((item) => item !== movieId));
    } else {
      setLikedMovie((prev) => [...prev, movieId]);
    }
  };

  console.log({ trailer });

  return (
    <div className="relative pt-[56.25%] bg-black/60">
      {trailer ? (
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${trailer}`}
          width="100%"
          height="100%"
          style={{ position: 'absolute', top: '0', left: '0' }}
          muted={muted}
        />
      ) : (
        <div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4">
          <p className="text-sm md:text-lg text-gray-400">Trailer unavalaible</p>
        </div>
      )}
      <div className="absolute bottom-10 flex w-full items-center justify-between px-10">
        <div className="flex space-x-4 items-center">
          <Link
            href={`/${mediaType}/${movieId}`}
            className="bannerButton bg-[gray]/70"
          >
            More Info
            <InformationCircleIcon className="h-5 w-5 md:h-8 md:w-8" />
          </Link>
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
        </div>
        <button onClick={() => setMuted((prev) => !prev)}>
          {muted ? (
            <BiVolumeMute className="h-6 w-6" />
          ) : (
            <BiVolumeFull className="h-6 w-6" />
          )}
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;
