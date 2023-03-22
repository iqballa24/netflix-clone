import { useRecoilValue } from 'recoil';
import { Cast, Movie, Review } from '@/types/global';
import { GetServerSideProps } from 'next';
import { modalState } from '@/atoms/modalAtom';

import { ModalVideoPlayer, Slider } from '@/components/UI';
import Layout from '@/components/Layout';
import BannerDetail from '@/components/Detail/Banner';
import Image from 'next/image';
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import { Stack } from '@mui/system';
import { format } from 'date-fns';
import Reviews from '@/components/Reviews';

const Detail = ({
  movie,
  reviews,
  cast,
}: {
  movie: Movie;
  reviews: Review[];
  cast: Cast[];
}) => {
  const showModal = useRecoilValue(modalState);

  console.log(reviews);

  return (
    <Layout
      title={movie.name || movie.original_title}
      description={movie.overview}
    >
      <BannerDetail movie={movie} />
      <Slider title="Cast movie">
        {cast.map((item) => (
          <div key={item.id} className="pt-5 relative flex flex-col gap-5">
            <div className="relative h-[200px] min-w-[140px] cursor-pointer md:h-[240px] md:min-w-[180px] overflow-hidden rounded-md">
              <Image
                alt={item.name || item.original_name}
                src={`https://image.tmdb.org/t/p/w500${item.profile_path}`}
                className="object-cover hover:scale-110 transition duration-200 ease-out rounded"
                fill
                sizes="100%"
              />
            </div>
            <div className="space-y-2">
              <h3 key={item.id} className="text-base md:text-lg">
                {item.name}
              </h3>
              <p className="text-sm md:text-base">{item.character}</p>
            </div>
          </div>
        ))}
      </Slider>
      <Reviews data={reviews} />
      {showModal && <ModalVideoPlayer />}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id, media } = context.query;

  const [detailMovie, reviews, credits] = await Promise.all([
    fetch(
      `https://api.themoviedb.org/3/${media}/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&append_to_response=videos`
    ).then((response) => response.json()),
    fetch(
      `https://api.themoviedb.org/3/${media}/${id}/reviews?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
    ).then((response) => response.json()),
    fetch(
      `https://api.themoviedb.org/3/${media}/${id}/credits?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
    ).then((response) => response.json()),
  ]);

  return {
    props: { movie: detailMovie, reviews: reviews.results, cast: credits.cast },
  };
};

export default Detail;
