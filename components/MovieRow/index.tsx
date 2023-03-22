import Thumbnail from '@/components/Thumbnail';
import { Slider } from '@/components/UI';
import { Movie } from '@/types/global';

const MovieRow: React.FC<{ title: string; movies: Movie[] }> = ({
  title,
  movies,
}) => {
  return (
    <Slider title={title}>
      {movies.map((movie) => (
        <Thumbnail key={movie.id} {...movie} />
      ))}
    </Slider>
  );
};

export default MovieRow;
