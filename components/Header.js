import { useState } from 'react';
import Link from 'next/link';
import { BsCardImage } from 'react-icons/bs';
import Modal from '@/components/Modal';
import styles from '@/styles/Header.module.css';
//import ImageUpload from '@/components/ImageUpload';
import Upload from '@/components/Upload';

export default function Header() {
  const [showModal, setShowModal] = useState(false);

  const imageUploaded = async (e) => {
    console.log('uploaded');
    setShowModal(false);
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
        <Upload imageUploaded={imageUploaded} />
      </Modal>
    </header>
  );
}
