import cloudinary from 'cloudinary';
const faunadb = require('faunadb');

const secret = process.env.NEXT_PUBLIC_FAUNADB_SECRET_KEY;
const q = faunadb.query;
const client = new faunadb.Client({ secret });

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export default async (req, res) => {
  if (req.method === 'POST') {
    try {
      const fileStr = req.body.data;

      const public_id = `${Date.now()}`;

      const uploadResponse = await cloudinary.v2.uploader.upload(fileStr, {
        tags: 'guest_speaker',
        resource_type: 'auto',
        public_id,
      });

      const cloudinaryTransforms = {
        transformation: [
          {
            overlay: public_id,
            width: 250,
            height: 250,
            radius: 250,
            x: -450,
            y: -57,
          },
          {
            overlay: {
              text: 'Eugene Musebe',
              font_family: 'Arial',
              font_size: 24,
            },
            x: -450,
            y: 100,
            effect: 'colorize',
            color: '#fff',
          },
        ],
      };

      const transformedImg = await cloudinary.url(
        'events_underlay.png',
        cloudinaryTransforms
      );

      //take the transformed image url and save in FaunaDB
      client
        .query(
          q.Create(q.Collection('transformations'), {
            data: {
              url: transformedImg,
            },
          })
        )
        .then((ret) => console.log(ret));

      console.log(uploadResponse, cloudinaryTransforms, transformedImg);

      res.json({ msg: 'yaya' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ err: 'Something went wrong' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `method ${req.method} is not allowed` });
  }
};
