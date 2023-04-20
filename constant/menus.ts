import {
  HiOutlineFilm,
  HiOutlineHeart,
  HiOutlineHome,
  HiOutlineTv,
} from 'react-icons/hi2';

export const menus = [
  {
    id: 1,
    name: 'Home',
    path: '/',
    icon: HiOutlineHome,
  },
  {
    id: 2,
    name: 'Tv Shows',
    path: '/tvShow',
    icon: HiOutlineTv,
  },
  {
    id: 3,
    name: 'Movies',
    path: '/movies',
    icon: HiOutlineFilm,
  },
  {
    id: 4,
    name: 'My List',
    path: '/my-list',
    icon: HiOutlineHeart,
  },
];
