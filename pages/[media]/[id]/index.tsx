import { useRecoilValue } from 'recoil';
import { Movie } from '@/types/global';
import { GetServerSideProps } from 'next';
import { modalState } from '@/atoms/modalAtom';

import { ModalVideoPlayer } from '@/components/UI';
import Layout from '@/components/Layout';
import BannerDetail from '@/components/Detail/Banner';

const Detail = ({ movie }: { movie: Movie }) => {
  const showModal = useRecoilValue(modalState);

  return (
    <Layout
      title={movie.name || movie.original_title}
      description={movie.overview}
    >
      <BannerDetail movie={movie} />
      {showModal && <ModalVideoPlayer />}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id, media } = context.query;

  const res = await fetch(
    `https://api.themoviedb.org/3/${media}/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&append_to_response=videos`
  ).then((response) => response.json());

  return {
    props: { movie: res },
  };
};

export default Detail;
