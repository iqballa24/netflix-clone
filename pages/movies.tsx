import Layout from '@/components/Layout';
import { requests_movies } from '@/utils/requests';
import { Movie } from '@/types/global';
import Banner from '@/components/Banner';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { modalState } from '@/atoms/modalAtom';
import { ModalVideoPlayer } from '@/components/UI';
import MovieRow from '@/components/MovieRow';

interface Props {
  nowPlaying: Movie[];
  popular: Movie[];
  topRated: Movie[];
  upComing: Movie[];
}

const Movies = ({ nowPlaying, popular, topRated, upComing }: Props) => {
  const [randomMovie, setRandomMovie] = useState<Movie | null>(null);
  const showModal = useRecoilValue(modalState);

  useEffect(() => {
    setRandomMovie(nowPlaying[Math.floor(Math.random() * nowPlaying.length)]);
  }, [nowPlaying]);

  return (
    <Layout title="Movies - Netflix" description="Generated by create next app">
      <Banner movie={randomMovie} />
      <section className="flex flex-col md:space-y-24">
        <MovieRow title="Now Playing" movies={nowPlaying} />
        <MovieRow title="Popular" movies={popular} />
        <MovieRow title="Top Rated" movies={topRated} />
        <MovieRow title="Up Coming" movies={upComing} />
      </section>
      {showModal && <ModalVideoPlayer />}
    </Layout>
  );
};

export const getServerSideProps = async () => {
  const [nowPlaying, popular, topRated, upComing] = await Promise.all([
    fetch(requests_movies.fetchNowPlaying).then((res) => res.json()),
    fetch(requests_movies.fetchPopular).then((res) => res.json()),
    fetch(requests_movies.fetchTopRated).then((res) => res.json()),
    fetch(requests_movies.fetchUpComing).then((res) => res.json()),
  ]);

  return {
    props: {
      nowPlaying: nowPlaying.results,
      popular: popular.results,
      topRated: topRated.results,
      upComing: upComing.results,
    },
  };
};

export default Movies;
