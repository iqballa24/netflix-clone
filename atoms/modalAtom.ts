import { DocumentData } from 'firebase/firestore';
import { recoilPersist } from 'recoil-persist';
import { atom } from 'recoil';
import { Movie } from '@/types/global';

const { persistAtom } = recoilPersist();

export const modalState = atom({
  key: 'modalState',
  default: false,
});

export const movieState = atom<Movie | DocumentData | null>({
  key: 'movieState',
  default: null,
});

export const bookmarkMovieState = atom<string[]>({
  key: 'bookmarkMovie',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const likedMovieState = atom<string[]>({
  key: 'likedMovie',
  default: [],
  effects_UNSTABLE: [persistAtom],
});
