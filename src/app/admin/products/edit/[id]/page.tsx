// src/app/admin/products/edit/[id]/page.tsx
"use client";

import { useState, ChangeEvent } from "react";

export default function EditProductPage() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: 0,
    isActive: false,
  });

  // Manejo de cambios en los inputs
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement;

    const { name, value, type } = target;
    const checked = type === "checkbox" ? target.checked : undefined;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div>
      <h1>Editar Producto</h1>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
      />
      <label>
        Activo:
        <input
          type="checkbox"
          name="isActive"
          checked={formData.isActive}
          onChange={handleChange}
        />
      </label>
    </div>
  );
}
