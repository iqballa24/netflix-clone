import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { modalState, movieState } from '@/atoms/modalAtom';
import { Modal } from '@mui/material';
import { Element, Genre } from '@/types/global';
import { HiXCircle } from 'react-icons/hi2';
import VideoPlayer from '@/components/UI/Modal/ModalVideoPlayer/VideoPlayer';
import VideoDescription from '@/components/UI/Modal/ModalVideoPlayer/VideoDescription';

const ModalVideoPlayer = () => {
  const movie = useRecoilValue(movieState);
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [trailer, setTrailer] = useState('');
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    if (!movie) return;

    async function fetchMovie() {
      const res = await fetch(
        `https://api.themoviedb.org/3/${
          movie?.media_type === 'tv' ? 'tv' : 'movie'
        }/${movie?.id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`
      )
        .then((response) => response.json())
        .catch((err) => console.log(err));

      if (res?.videos) {
        const trailerIndex = res.videos.results.findIndex(
          (elem: Element) => elem.type === 'Trailer'
        );
        setTrailer(res.videos?.results[trailerIndex]?.key);
      }
      if (res?.genres) {
        setGenres(res.genres);
      }
    }

    fetchMovie();
  }, [movie]);

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <Modal
      open={showModal}
      onClose={handleClose}
      className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-transparent"
    >
      <>
        <button
          onClick={handleClose}
          className="absolute right-5 top-5 !z-40 h-12 w-12 border-none"
        >
          <HiXCircle className="h-8 w-8 hover:text-red-500 transition" />
        </button>
        <VideoPlayer movieId={movie?.id} trailer={trailer} />
        <VideoDescription
          vote_average={(movie!.vote_average * 10).toFixed(2)}
          release_date={movie?.release_date || movie?.first_air_date}
          genres={genres}
          language={movie?.original_language}
          overview={movie?.overview}
          vote={movie?.vote_count}
        />
      </>
    </Modal>
  );
};

export default ModalVideoPlayer;
