import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';
import { API_URL } from '@/config/index';

export default function HomePage({ posters }) {
  // This will log the responses on the client side
  // console.log(posters);

  return (
    <div>
      <Layout>
        <h1>Upcoming Events</h1>

        {posters.length === 0 && <h3>No Event Posters Created</h3>}

        {posters.map((poster) => (
          <EventItem key={poster.id} poster={poster} />
        ))}
      </Layout>
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/posters/cloudinary`);
  const posters = await res.json();

  //This will log the responses on the server side
  // console.log(posters);
  return {
    props: { posters },
    revalidate: 1,
  };
}
