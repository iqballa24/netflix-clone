import { Genre } from '@/types/global';
import React from 'react';

interface Props {
  vote_average: number|string;
  release_date: number;
  overview: string;
  genres: Genre[];
  language: string;
  vote: number;
}

const VideoDescription: React.FC<Props> = ({
  vote_average,
  release_date,
  overview,
  genres,
  language,
  vote,
}) => {
  return (
    <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
      <div className="space-y-6 text-lg">
        <div className="flex items-center space-x-2 text-sm">
          <p className="font-semibold text-green-400">{vote_average}% Match</p>
          <p className="font-light">{release_date}</p>
          <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
            HD
          </div>
        </div>
        <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
          <p className="w-5/6">{overview}</p>
          <div className="flex flex-col space-y-3 text-sm">
            <div>
              <span className="text-[gray]">Genres:</span>{' '}
              {genres.map((genre) => genre.name).join(', ')}
            </div>
            <div>
              <span className="text-[gray]">Original language:</span> {language}
            </div>
            <div>
              <span className="text-[gray]">Total votes:</span> {vote}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDescription;
