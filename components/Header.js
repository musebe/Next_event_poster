import Link from 'next/link';
import styles from '@/styles/Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href='/'>
          <a>Poster Generator</a>
        </Link>
      </div>

      <nav>
        <ul>
          <li>
            <Link href='/posters'>
              <a>Posters</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
