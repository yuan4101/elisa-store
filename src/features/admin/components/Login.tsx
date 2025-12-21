"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useNotification } from "@/features/notification/hooks/useNotification";
import { NotificationType } from "@/features/notification/types/notification";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { showNotification } = useNotification();

  const handleLogin = async (formEvent: React.FormEvent) => {
    formEvent.preventDefault();

    const response = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (response.ok) {
      showNotification({
        message: "Inicio de sesión con éxito",
        type: NotificationType.Success,
      });
      router.push("/admin/stock");
    } else {
      showNotification({
        message: "Contraseña incorrecta",
        type: NotificationType.Error,
      });
    }
  };

  return (
    <div className="flex items-center justify-center container flex-grow ">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-xl w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Acceso Administrador
        </h2>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
        >
          Ingresar
        </button>
      </form>
    </div>
  );
}
