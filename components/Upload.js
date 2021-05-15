import { useState } from 'react';
import { API_URL } from '@/config/index';
import styles from '@/styles/Form.module.css';

const Upload = ({ imageUploaded }) => {
  const [fileInputState, setFileInputState] = useState('');
  const [previewSource, setPreviewSource] = useState('');
  const [selectedFile, setSelectedFile] = useState();
  const [successMsg, setSuccessMsg] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      uploadImage(reader.result);
    };
    reader.onerror = () => {
      console.error('AHHHHHHHH!!');
      setErrMsg('something went wrong!');
    };
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
    setSelectedFile(file);
    setFileInputState(e.target.value);
  };

  const uploadImage = async (base64EncodedImage) => {
    try {
      await fetch(`${API_URL}/api/posters/upload`, {
        method: 'POST',
        body: JSON.stringify({ data: base64EncodedImage }),
        headers: { 'Content-Type': 'application/json' },
      });
      setFileInputState('');
      setPreviewSource('');
      imageUploaded();
      setSuccessMsg('Image uploaded successfully');
    } catch (err) {
      console.error(err);
      setErrMsg('Something went wrong!');
    }
  };
  return (
    <div className={styles.form}>
      <h1>Upload Event Image</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.file}>
          <input type='file' onChange={handleFileChange} />
        </div>
        <input type='submit' value='Upload' className='btn' />
      </form>
      {previewSource && (
        <img src={previewSource} alt='chosen' style={{ height: '300px' }} />
      )}
    </div>
  );
};

export default Upload;
