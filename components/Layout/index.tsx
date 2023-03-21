import Header from '@/components/Header';
import Head from 'next/head';

interface Props {
  title: string;
  description: string;
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ title, description, children }) => {
  return (
    <div className="relative h-screen bg-gradient-to-b lg:h-[140vh]">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
        {children}
      </main>
    </div>
  );
};

export default Layout;