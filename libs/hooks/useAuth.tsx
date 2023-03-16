/* eslint-disable react-hooks/exhaustive-deps */
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
} from 'firebase/auth';

import { useRouter } from 'next/router';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { auth } from '@/libs/firebase/config';

interface IAuth {
  user: User | null;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<IAuth>({
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  logout: async () => {},
  loading: false,
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [initialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  // Persisting the user
  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // Logged in...
          setUser(user);
          setLoading(false);
          router.push('/');
        } else {
          // Not logged in...
          setUser(null);
          setLoading(true);
          router.push('/auth');
        }

        setInitialLoading(false);
      }),
    [auth]
  );

  const signUp = useCallback(
    async (email: string, password: string, username: string) => {
      setLoading(true);

      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          setUser(userCredential.user);
          updateProfile(userCredential.user, {
            displayName: username,
          });
          router.push('/');
          setLoading(false);
        })
        .catch((err) => {
          alert(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    []
  );

  const signIn = useCallback(async (email: string, password: string) => {
    setLoading(true);

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        router.push('/');
        setLoading(false);
      })
      .catch((err) => {
        alert(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const logout = async () => {
    setLoading(true);

    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((err) => {
        alert(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const memoedValue = useMemo(
    () => ({ user, signUp, signIn, loading, logout }),
    [user, signUp, signIn, loading]
  );

  return (
    <AuthContext.Provider value={memoedValue}>
      {!initialLoading && children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
