import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

import { prisma } from '@/lib/prisma';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: Request) {
  const data = await req.formData();
  const file = data.get('file') as File;
  const namaFoto = data.get('namaFoto') as string;
  const userId = parseInt(data.get('UserId') as string);

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  try {
    const upload = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: 'gocapje/assets/logos/',
            public_id: namaFoto || undefined, // pakai namaFoto jika ada
            overwrite: true, // replace jika nama sama
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        )
        .end(buffer);
    });

    const uploaded = upload as any;

    // Simpan ke database
    const saved = await prisma.photo.create({
      data: {
        name: namaFoto,
        path: uploaded.public_id,
      },
    });

    return NextResponse.json({
      url: (upload as any).secure_url, 
      data : (upload as any).folder + (upload as any).public_id,
      path : (upload as any).public_id,
      db : saved,

    });
  } catch (err) {
    console.error('Upload failed:', err);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}


// VERSI 2
// // app/api/upload/route.ts
// import { NextResponse } from 'next/server';
// import { v2 as cloudinary } from 'cloudinary';
// import { IncomingForm } from 'formidable';
// import fs from 'fs';

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
//   api_key: process.env.CLOUDINARY_API_KEY!,
//   api_secret: process.env.CLOUDINARY_API_SECRET!,
// });

// export async function POST(req: Request) {
//   const data = await req.formData();
//   const file = data.get('file') as File;

//   const bytes = await file.arrayBuffer();
//   const buffer = Buffer.from(bytes);

//   // Upload to Cloudinary using buffer
//   try {
//     const upload = await new Promise((resolve, reject) => {
//       cloudinary.uploader
//         .upload_stream({ folder: 'uploads' }, (error, result) => {
//           if (error) return reject(error);
//           resolve(result);
//         })
//         .end(buffer);
//     });

//     return NextResponse.json({ url: (upload as any).secure_url });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
//   }
// }


// VERSI 1
// import { NextRequest, NextResponse } from 'next/server';
// import { v2 as cloudinary } from 'cloudinary';
// import formidable from 'formidable';
// import fs from 'fs';

// cloudinary.config({
//   secure: true, // optional, forces https
// });

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export async function POST(req: NextRequest) {
//   const form = formidable({ multiples: false });

//   const data = await new Promise<{ file: formidable.File }>((resolve, reject) => {
//     form.parse(req as any, (err, fields, files) => {
//       if (err) return reject(err);
//       resolve(files as { file: formidable.File });
//     });
//   });

//   const file = data.file;

//   const result = await cloudinary.uploader.upload(file.filepath, {
//     folder: 'uploads',
//   });

//   return NextResponse.json({ url: result.secure_url });
// }