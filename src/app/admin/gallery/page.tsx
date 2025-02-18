"use client";

import { useEffect, useState, FormEvent } from "react";
import Image from "next/image";
import { fetchCategories, fetchGallery, uploadImage } from "@/lib/gallery-api";

interface Category {
  id: string;
  name: string;
}

interface GalleryImage {
  id: string;
  title: string;
  imageUrl: string;
  categoryId: string;
  categoryName?: string;
}

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  // 🔹 Cargar imágenes y categorías al montar el componente
  async function loadData() {
    try {
      const categoriesData: Category[] = await fetchCategories();
      const galleryData: GalleryImage[] = await fetchGallery();

      console.log("📥 Datos de la galería recibidos:", galleryData);
      console.log("📥 Categorías disponibles:", categoriesData);

      // 🔄 Asignar el nombre de la categoría a cada imagen
      const galleryWithCategoryNames = galleryData.map((img) => ({
        ...img,
        categoryName: categoriesData.find((cat) => cat.id === img.categoryId)?.name || "Sin categoría",
      }));

      setCategories(categoriesData);
      setImages(galleryWithCategoryNames);
    } catch {
      console.error("❌ Error al cargar datos.");
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  // 🔹 Filtrar imágenes por búsqueda y categoría
  const filteredImages = images.filter(
    (img) =>
      img.categoryName?.toLowerCase().includes(selectedCategory.toLowerCase()) &&
      img.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 🔹 Manejar carga de imagen
  async function handleUpload(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedFile || !title || !selectedCategory) {
      alert("Debe seleccionar un archivo, ingresar un título y elegir una categoría.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("categoryId", selectedCategory);
    formData.append("file", selectedFile);

    try {
      const response = await uploadImage(title, selectedCategory, selectedFile);

      if (!response.ok) {
        throw new Error();
      }

      alert("✅ Imagen subida con éxito");
      await loadData();
      setTitle("");
      setSelectedCategory("");
      setSelectedFile(null);
    } catch {
      alert("❌ Error al subir la imagen");
    }
  }

  return (
    <main className="container mx-auto px-4">
      <h1 className="text-2xl font-bold my-6">🖼️ Galería de Imágenes</h1>

      {/* 🔹 Controles */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="🔍 Buscar imágenes..."
          className="border px-3 py-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="border px-3 py-2"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">📌 Filtrar por categoría</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <button
          onClick={() => setViewMode(viewMode === "grid" ? "table" : "grid")}
          className="bg-gray-500 text-white px-3 py-2 rounded"
        >
          {viewMode === "grid" ? "📊 Tabla" : "🔲 Grid"}
        </button>
      </div>

      {/* 🔹 Formulario de subida */}
      <div className="bg-gray-100 p-4 rounded-md mb-6">
        <h2 className="text-lg font-semibold mb-2">➕ Agregar Imagen</h2>
        <form onSubmit={handleUpload}>
          <input
            type="file"
            accept="image/*"
            className="mb-2"
            onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
          />
          <input
            type="text"
            placeholder="📌 Título de la imagen"
            className="border px-3 py-2 mb-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <select
            className="border px-3 py-2 mb-2"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">📂 Selecciona una categoría</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            📤 Subir Imagen
          </button>
        </form>
      </div>

      {/* 🔹 Vista de galería */}
      <div className="grid grid-cols-3 gap-4">
        {filteredImages.map((img) => (
          <div key={img.id} className="bg-white p-2 rounded shadow-md">
            <Image
              src={img.imageUrl}
              alt={img.title}
              width={150}
              height={150}
              className="rounded mx-auto"
            />
            <p className="text-center font-bold">{img.title}</p>
            <p className="text-center text-sm text-gray-600">📂 {img.categoryName}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
