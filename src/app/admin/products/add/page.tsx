"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AddProductPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [formData, setFormData] = useState(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("productForm") || "{}") || {
        name: "",
        description: "",
        price: "",
        stock: "",
        categoryId: "",
        images: [],
        colors: [],
        sizes: [],
        material: "",
        weight: "",
        dimensions: "",
        isActive: true,
        isCustomizable: false,
        allowImageUpload: false,
        customTextFields: ["", "", ""],
        variants: [],
      };
    }
    return {};
  });

  // Guardar datos en localStorage para evitar perderlos
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("productForm", JSON.stringify(formData));
    }
  }, [formData]);

  // Cargar categorías
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("❌ Error al cargar categorías:", error);
      }
    }
    fetchCategories();
  }, []);

  // Manejo de cambios en los inputs
  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Vista previa de imagen
  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setFormData((prev) => ({
        ...prev,
        images: [file],
      }));
    }
  };

  // Validaciones antes de enviar
  const validateForm = () => {
    if (!formData.name || !formData.price || !formData.stock) {
      alert("❌ Debes completar los campos obligatorios.");
      return false;
    }
    if (Number(formData.price) <= 0) {
      alert("❌ El precio debe ser mayor que 0.");
      return false;
    }
    if (Number(formData.stock) < 0) {
      alert("❌ El stock no puede ser negativo.");
      return false;
    }
    return true;
  };

  // Enviar formulario
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setLoading(true);

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Error al agregar el producto");

      localStorage.removeItem("productForm"); // Limpiar localStorage después de guardar
      router.push("/admin/products");
    } catch (error) {
      console.error("❌ Error al agregar producto:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Agregar Producto</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Nombre */}
        <div>
          <label className="block text-gray-700">Nombre *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Descripción */}
        <div>
          <label className="block text-gray-700">Descripción</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Precio */}
        <div>
          <label className="block text-gray-700">Precio *</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
            min="0.01"
          />
        </div>

        {/* Stock */}
        <div>
          <label className="block text-gray-700">Stock *</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
            min="0"
          />
        </div>

        {/* Categoría */}
        <div>
          <label className="block text-gray-700">Categoría *</label>
          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Seleccionar categoría</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Imagen */}
        <div>
          <label className="block text-gray-700">Imagen</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border p-2 rounded"
          />
          {imagePreview && (
            <img src={imagePreview} alt="Vista previa" className="mt-2 w-32 h-32 object-cover" />
          )}
        </div>

        {/* Activo */}
        <div className="col-span-2 flex items-center gap-2">
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
          />
          <label className="text-gray-700">Producto Activo</label>
        </div>

        {/* Botón de Enviar */}
        <div className="col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-500"
            disabled={loading}
          >
            {loading ? "Guardando..." : "Agregar Producto"}
          </button>
        </div>
      </form>
    </div>
  );
}
