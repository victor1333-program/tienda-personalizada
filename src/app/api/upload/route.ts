import { NextResponse } from "next/server";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: Request) {
  try {
    const data = await req.formData();
    const file = data.get("file");

    if (!(file instanceof Blob)) {
      return NextResponse.json({ error: "No file uploaded or invalid format" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await new Promise<cloudinary.UploadApiResponse>((resolve, reject) => {
      const uploadStream = cloudinary.v2.uploader.upload_stream(
        { resource_type: "auto" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result as cloudinary.UploadApiResponse);
        }
      );
      uploadStream.end(buffer);
    });

    return NextResponse.json(uploadResult);
  } catch (error) {
    console.error("❌ Error uploading file:", error);
    return NextResponse.json({ error: "Error uploading file" }, { status: 500 });
  }
}
