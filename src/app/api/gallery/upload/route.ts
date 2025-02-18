import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { uploadToCloudinary } from "@/lib/cloudinary";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const categoryId = formData.get("categoryId") as string;
    const file = formData.get("file") as File;

    console.log("📥 Datos recibidos en API:", { title, categoryId, file });

    if (!title || !categoryId || !file) {
      console.error("❌ Datos faltantes en la API");
      return NextResponse.json({ error: "Faltan datos en la solicitud" }, { status: 400 });
    }

    // 🔹 Subir imagen a Cloudinary
    const cloudinaryResponse = await uploadToCloudinary(file);
    console.log("📸 Imagen subida con éxito:", cloudinaryResponse);

    if (!cloudinaryResponse || !cloudinaryResponse.secure_url) {
      console.error("❌ Error al obtener URL de Cloudinary");
      return NextResponse.json({ error: "Error al obtener URL de Cloudinary" }, { status: 500 });
    }

    // 🔹 Guardar en la base de datos
    const newImage = await prisma.galleryImage.create({
      data: {
        title,
        imageUrl: cloudinaryResponse.secure_url,
        categoryId,
      },
    });

    console.log("✅ Imagen guardada en la base de datos:", newImage);
    return NextResponse.json(newImage);

  } catch (error) {
    console.error("❌ Error en la API de subida:", error);
    return NextResponse.json({ error: "Error al subir la imagen" }, { status: 500 });
  }
}
