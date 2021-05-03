import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/EventItem.module.css';

export default function EventItem({ poster }) {
  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <Image
          src={poster.url ? poster.url : '/images/event-default.png'}
          width={900}
          height={500}
        />
      </div>
    </div>
  );
}
