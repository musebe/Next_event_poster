import { useRef, useState } from 'react';

export default function ImageUploader({ defaultImage }) {
  const fileSelect = useRef(null);
  const [image, setImage] = useState(defaultImage);
  const [progress, setProgress] = useState(0);

  async function handleImageUpload() {
    if (fileSelect) {
      fileSelect.current.click();
    }
  }

  function handleFiles(files) {
    for (let i = 0; i < files.length; i++) {
      console.log(files[i]);
      uploadFile(files[i]);
    }
  }

  function uploadFile(file) {
    const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME}/upload`;
    const transformation = [
      // JSON.stringify({
      //   gravity: 'face',
      //   height: 400,
      //   width: 400,
      //   crop: 'crop',
      // }),
      // JSON.stringify({ radius: 'max' }),
      // JSON.stringify({ width: 200, crop: 'scale' }),
      JSON.stringify({
        overlay: 'poster_overlay',
        flags: 'relative',
        height: '1.0',
        width: '1.0',
      }),
    ];
    const xhr = new XMLHttpRequest();
    const fd = new FormData();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

    // Update progress (can be used to show progress indicator)
    xhr.upload.addEventListener('progress', (e) => {
      setProgress(Math.round((e.loaded * 100.0) / e.total));
      console.log(Math.round((e.loaded * 100.0) / e.total));
    });

    xhr.onreadystatechange = (e) => {
      if (xhr.readyState == 4 && xhr.status == 200) {
        const response = JSON.parse(xhr.responseText);
        setImage(response.eager[0].secure_url);
        console.log(response.eager[0].secure_url);
      }
    };
    fd.append('file', file);
    fd.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
    fd.append(
      'upload_preset',
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
    );
    //fd.append('tags', 'guest_speaker');
    fd.append(
      'eager',
      'w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35'
    );
    fd.append('public_id', 'sample_image');
    fd.append('signature', 'b99d64148c5be8125338b5b4359769aa693b01a7');
    fd.append('timestamp', '1620522881');
    xhr.send(fd);
  }
  // https://www.utctime.net/eat-time-now
  //www.liavaag.org/English/SHA-Generator

  // eager=w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35&public_id=sample_image&timestamp=1620522881&upload_preset=event_postersR6ZNhy8CtPLrFE4CvjOsBvkQTk

  https: return (
    <>
      {image ? (
        <img
          className='object-contain rounded-lg'
          src={image.replace('upload/', 'upload/w_600/')}
          style={{ height: 400, width: 600 }}
        />
      ) : (
        <div
          className='bg-gray-200 border-4 border-dashed border-gray-400 rounded-lg'
          style={{ height: 400, width: 460 }}
        >
          <form className='flex justify-center items-center h-full'>
            {progress === 0 ? (
              <div className='text-gray-700 text-center'>
                <button
                  className='bg-blue-600 hover:bg-blue-800 text-white font-bold px-4 py-2 rounded block m-auto'
                  onClick={handleImageUpload}
                  type='button'
                >
                  Browse
                </button>
              </div>
            ) : (
              <span className='text-gray-700'>{progress}%</span>
            )}

            <input
              ref={fileSelect}
              type='file'
              accept='image/*'
              style={{ display: 'none' }}
              onChange={(e) => handleFiles(e.target.files)}
            />
          </form>
        </div>
      )}
    </>
  );
}
