import cloudinary from 'cloudinary';
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export async function getAllPosters() {
  // Get Images from Cloudinary inserted into the event_posters Folder
  const response = await cloudinary.v2.api.resources({
    type: 'upload',
    prefix: 'posters',
  });
  console.log(response);
  const posterData = response.resources.map((image, key) => ({
    id: key,
    ...image,
  }));
  return posterData;
  // console.log(posterData);
}

export async function uploadPosters(req, res) {
  let result = await cloudinary.uploader.upload(req.body.image, {
    public_id: `${Date.now()}`,
    resource_type: 'auto', // jpeg, png
  });
  res.json({
    public_id: result.public_id,
    url: result.secure_url,
  });
}
