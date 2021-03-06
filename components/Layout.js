import Head from 'next/head';
import { useRouter } from 'next/router';
import Footer from './Footer';
import Header from './Header';
import Showcase from './Showcase';
import styles from '@/styles/Layout.module.css';
export default function Layout({ title, keywords, description, children }) {
    const router = useRouter();

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
      </Head>
      <Header />
      {router.pathname === '/' && <Showcase />}

      <div className={styles.container}>{children}</div>
      <Footer />
    </div>
  );
}

Layout.defaultProps = {
  title: 'Events Posters | Create Your Events Posters',
  description: ' Create Your Events Posters Using Cloudinary And Next.js',
  keywords: 'cloudinary, Next.js, Posters',
};
