import React from 'react';
import { useRecoilState } from 'recoil';
import { modalState, movieState } from '@/atoms/modalAtom';
import { BASE_URL } from '@/constant/movie';
import { Movie } from '@/types/global';
import BannerDescription from '@/components/Detail/Banner/BannerDescription';
import BannerPoster from '@/components/Detail/Banner/BannerPoster';

interface Props {
  movie: Movie;
}

const BannerDetail: React.FC<Props> = ({ movie }) => {
  const setShowModal = useRecoilState(modalState)[1];
  const setCurrentMovie = useRecoilState(movieState)[1];

  const detailMovieHandler = () => {
    setShowModal(true);
    setCurrentMovie(movie);
  };

  console.log(movie);

  const overview =
    movie?.overview !== ''
      ? movie?.overview
      : "We don't have an overview translated in English.";

  const movieDescription = {
    id: movie.id.toString(),
    title: movie?.title || movie?.original_title || movie?.name,
    banner: `${BASE_URL}${movie.poster_path}`,
    genre: movie?.genres?.map((genre) => genre.name).join(', '),
    overview: overview,
    language: movie.original_language,
    vote: movie.vote_count,
    release_date: movie.release_date ?? '',
    handlePlay: detailMovieHandler,
    tagline: movie.tagline,
    status: movie.status
  };

  return (
    <div className="flex flex-col space-y-3 py-[7rem] lg:h-screen">
      <BannerPoster
        alt={movie?.name || movie?.original_title || ''}
        poster={`${BASE_URL}${movie?.backdrop_path || movie?.poster_path}`}
      />
      <BannerDescription
        {...movieDescription}
        handlePlay={detailMovieHandler}
      />
    </div>
  );
};

export default BannerDetail;
