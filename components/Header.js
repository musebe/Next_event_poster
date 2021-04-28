import { useState } from 'react';
import Link from 'next/link';
import { BsCardImage } from 'react-icons/bs';
import Modal from '@/components/Modal';
import styles from '@/styles/Header.module.css';
import ImageUpload from '@/components/ImageUpload';

export default function Header() {
  const [showModal, setShowModal] = useState(false);

  const imageUploaded = async (e) => {
    //  const res = await fetch(`${API_URL}/events/${evt.id}`);
    //  const data = await res.json();
    //  setImagePreview(data.image.formats.thumbnail.url);
    console.log('uploaded');
    //  setShowModal(false);
  };

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
          <li>
            <button
              onClick={() => setShowModal(true)}
              className='btn-secondary btn-icon'
            >
              <BsCardImage /> New Poster
            </button>
          </li>
        </ul>
      </nav>

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <ImageUpload imageUploaded={imageUploaded} />
      </Modal>
    </header>
  );
}
