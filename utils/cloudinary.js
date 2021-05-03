import cloudinary from 'cloudinary';
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function getAllPosters() {
  // Get Images from Cloudinary inserted into the event_posters Folder
  const response = await cloudinary.v2.api.resources({
    type: 'upload',
    prefix: 'posters',
  });
  //   console.log(response);
  const posterData = response.resources.map((image, key) => ({
    id: key,
    ...image,
  }));
  return posterData;
  // console.log(posterData);
}

export async function postEventPoster(file) {
  console.log({ cloud_file: file });
  const poster = await cloudinary.v2.uploader.upload(file, {
    upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
  });

  return poster;
}

// http://localhost:3000/api/posters/cloudinary
