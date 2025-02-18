// src/lib/gallery-api.ts
// 🔹 Función para obtener las imágenes de la galería
export async function fetchGallery() {
  try {
    const res = await fetch("/api/gallery");
    if (!res.ok) throw new Error("Error al obtener imágenes");
    return await res.json();
  } catch (error) {
    console.error("❌ Error cargando la galería:", error);
    return [];
  }
}

// 🔹 Función para obtener las categorías disponibles
export async function fetchCategories() {
  try {
    const res = await fetch("/api/categories");
    if (!res.ok) throw new Error("Error al obtener categorías");
    return await res.json();
  } catch (error) {
    console.error("❌ Error cargando categorías:", error);
    return [];
  }
}

// 🔹 Función para actualizar una imagen existente
export async function updateImage(imageId: string, title: string, categoryId: string) {
  try {
    const response = await fetch(`/api/gallery/${imageId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, categoryId }),
    });

    if (!response.ok) {
      throw new Error("Error al actualizar la imagen");
    }

    return await response.json();
  } catch (error) {
    console.error("❌ Error al actualizar la imagen:", error);
    throw error;
  }
}

// 🔹 Función para eliminar una imagen
export async function deleteImage(imageId: string) {
  try {
    const response = await fetch(`/api/gallery/${imageId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Error al eliminar la imagen");
    }

    return await response.json();
  } catch (error) {
    console.error("❌ Error al eliminar la imagen:", error);
    throw error;
  }
}

// 🔹 Función para subir una nueva imagen
export async function uploadImage(title: string, categoryId: string, file: File) {
  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("categoryId", categoryId);
    formData.append("file", file);

    const response = await fetch("/api/gallery/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Error al subir la imagen");
    }

    return await response.json();
  } catch (error) {
    console.error("❌ Error al subir la imagen:", error);
    throw error;
  }
}
