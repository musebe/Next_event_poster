import { useState } from 'react';
import { API_URL } from '@/config/index';
import styles from '@/styles/Form.module.css';

export default function ImageUpload({ imageUploaded }) {
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log('submitting Image');
    const formData = new FormData();
    formData.append('files', image);

    const res = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      imageUploaded();
    }
  }
   
  

  const handleFileChange = (e) => {
    //console.log(e.target.files);
    setImage(e.target.files[0]);
  };
  return (
    <div className={styles.form}>
      <h1>Upload Guest Speaker Photo</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.file}>
          <input type='file' onChange={handleFileChange} />
        </div>
        <input type='submit' value='Upload' className='btn' />
      </form>
    </div>
  );
}
