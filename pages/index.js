import Link from 'next/link';
import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';
import { API_URL } from '@/config/index';

export default function HomePage({ posters }) {
  // This will log the responses on the client side
  // console.log(posters);

  return (
    <div>
      <Layout>
        <h1>Upcoming Events Posters</h1>

        {posters.length === 0 && <h3>No Event Posters Created</h3>}

        {posters.map((poster) => (
          <EventItem key={poster.ts} poster={poster} />
        ))}
        {posters.length > 0 && (
          <Link href='/posters'>
            <a className='btn-secondary'>View All Event Posters</a>
          </Link>
        )}
      </Layout>
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/getTransformations`);
  const posters = await res.json();

  //This will log the responses on the server side
  console.log(posters);

  return {
    props: { posters: posters.slice(0, 10) },
    revalidate: 1,
  };
}
