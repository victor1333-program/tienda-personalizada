"use client";

import { useState } from "react";

export default function RecoverPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleRecoverPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return alert("Por favor, ingresa tu correo electrónico.");

    setLoading(true);
    setSuccessMessage("");

    try {
      const res = await fetch("/api/auth/recover-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setSuccessMessage("✅ Si el correo existe, recibirás instrucciones para recuperar tu contraseña.");
      } else {
        const data = await res.json();
        alert(`❌ Error: ${data.error}`);
      }
    } catch {
      alert("❌ Error al enviar la solicitud. Inténtalo nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">🔑 Recuperar Contraseña</h2>
        {successMessage && (
          <p className="text-green-600 text-center mb-4">{successMessage}</p>
        )}
        <form onSubmit={handleRecoverPassword} className="space-y-4">
          <input
            type="email"
            placeholder="✉️ Ingresa tu correo"
            className="w-full border px-3 py-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-500 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Enviando..." : "Recuperar Contraseña"}
          </button>
        </form>
      </div>
    </div>
  );
}
