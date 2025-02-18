export async function uploadToCloudinary(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", process.env.CLOUDINARY_UPLOAD_PRESET || "default_preset");
  
  console.log("🔍 CLOUDINARY_UPLOAD_PRESET:", process.env.CLOUDINARY_UPLOAD_PRESET);
  console.log("📤 Enviando imagen a Cloudinary...", formData);

  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`, {
      method: "POST",
      body: formData,
    });

    const responseData = await response.json();
    console.log("📸 Respuesta de Cloudinary:", responseData);

    if (!response.ok) {
      throw new Error(responseData.error?.message || "Error desconocido en Cloudinary");
    }

    return responseData;
  } catch (error) {
    console.error("❌ Error subiendo a Cloudinary:", error);
    throw error;
  }
}
