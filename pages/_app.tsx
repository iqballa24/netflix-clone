import { AuthProvider } from '@/libs/hooks/useAuth';
import type { AppProps } from 'next/app';
import { Router } from 'next/router';
import { useEffect } from 'react';
import { RecoilRoot } from 'recoil';
import { Toaster } from 'react-hot-toast';
import NProgress from 'nprogress';

import '@/styles/globals.css';
import '@/styles/npprogress.css';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    Router.events.on('routeChangeStart', () => {
      NProgress.start();
    });

    Router.events.on('routeChangeComplete', () => {
      NProgress.done(false);
    });

    Router.events.on('routeChangeError', () => {
      NProgress.done(false);
    });
  }, []);

  return (
    <RecoilRoot>
      <AuthProvider>
        <Component {...pageProps} />
        <Toaster />
      </AuthProvider>
    </RecoilRoot>
  );
}
