import ReactPlayer from 'react-player/lazy';
import { useState } from 'react';
import { FaPlay } from 'react-icons/fa';
import { BiVolumeMute, BiVolumeFull } from 'react-icons/bi';
import {
  HiOutlinePlus,
  HiOutlineCheck,
  HiOutlineHandThumbUp,
  HiHandThumbUp,
} from 'react-icons/hi2';
import { useRecoilState } from 'recoil';
import { bookmarkMovieState, likedMovieState } from '@/atoms/modalAtom';

interface Props {
  movieId: string;
  trailer: string;
}

const VideoPlayer: React.FC<Props> = ({ movieId, trailer }) => {
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

  return (
    <div className="relative pt-[56.25%]">
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${trailer}`}
        width="100%"
        height="100%"
        style={{ position: 'absolute', top: '0', left: '0' }}
        playing
        muted={muted}
      />
      <div className="absolute bottom-10 flex w-full items-center justify-between px-10">
        <div className="flex space-x-4">
          <button className="flex items-center gap-x-2 rounded bg-white px-8 text-xl font-bold text-black transition hover:bg-[#e6e6e6]">
            <FaPlay className="h-7 w-7 text-black" />
            Play
          </button>
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
