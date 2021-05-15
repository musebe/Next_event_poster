import { getAllPosters} from '../../../utils/cloudinary';






async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const posterData = await getAllPosters();
      res.status(200).json(posterData);
    } catch (error) {
      res.status(500).json({ message: 'Getting images failed.' });
    }
  }
}

export default handler;


//  process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;