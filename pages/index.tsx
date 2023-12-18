import { useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import { modalState } from '@/atoms/globalAtom';
import { Movie } from '@/types/global';
import { requests } from '@/utils/requests';

import MovieRow from '@/components/MovieRow';
import Banner from '@/components/Banner';
import { ModalVideoPlayer } from '@/components/UI';
import Layout from '@/components/Layout';

interface Props {
  netflixOriginals: Movie[];
  trendingNow: Movie[];
  topRated: Movie[];
  actionMovies: Movie[];
  comedyMovies: Movie[];
  horrorMovies: Movie[];
  romanceMovies: Movie[];
  documentaries: Movie[];
}

export default function Home({
  actionMovies,
  comedyMovies,
  documentaries,
  horrorMovies,
  romanceMovies,
  topRated,
  trendingNow,
}: Props) {
  const [randomMovie, setRandomMovie] = useState<Movie | null>(null);
  const showModal = useRecoilValue(modalState);

  useEffect(() => {
    setRandomMovie(trendingNow[Math.floor(Math.random() * trendingNow.length)]);
  }, [trendingNow]);

  return (
    <Layout title="Home - Netflix" description="Generated by create next app">
      <Banner movie={randomMovie} />
      <section className="flex flex-col md:space-y-10">
        <MovieRow title="Trending Now" movies={trendingNow} />
        <MovieRow title="Top Rated" movies={topRated} />
        <MovieRow title="Action Thrillers" movies={actionMovies} />
        <MovieRow title="Comedies" movies={comedyMovies} />
        <MovieRow title="Scary Movies" movies={horrorMovies} />
        <MovieRow title="Romance Movies" movies={romanceMovies} />
        <MovieRow title="Documentaries" movies={documentaries} />
      </section>
      {showModal && <ModalVideoPlayer />}
    </Layout>
  );
}

export const getServerSideProps = async () => {
  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
  ]);

  return {
    props: {
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results.map((item: Object) => ({
        ...item,
        media_type: 'movie',
      })),
      comedyMovies: comedyMovies.results.map((item: Object) => ({
        ...item,
        media_type: 'movie',
      })),
      horrorMovies: horrorMovies.results.map((item: Object) => ({
        ...item,
        media_type: 'movie',
      })),
      romanceMovies: romanceMovies.results.map((item: Object) => ({
        ...item,
        media_type: 'movie',
      })),
      documentaries: documentaries.results.map((item: Object) => ({
        ...item,
        media_type: 'movie',
      })),
    },
  };
};
