import { Metadata } from 'next';
import Link from 'next/link';
import ErrorIcon from '@mui/icons-material/Error';

export const metadata: Metadata = {
  title: '404 - Página no encontrada | Elisa & CO',
  description: 'La página que buscas no existe en nuestro sitio.',
  robots: 'noindex, nofollow', // Evita indexación
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-6 bg-gray-50">
      <div className="animate-bounce"> {/* Animación sutil */}
        <ErrorIcon></ErrorIcon>
      </div>
      <h1 className="text-5xl font-bold text-gray-800">¡Ups!</h1>
      <p className="text-xl text-center text-gray-600 max-w-md">
        La página que buscas no existe o fue movida.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-pink-500 text-white rounded-lg shadow-lg hover:bg-pink-600 transition-colors"
      >
        ← Volver al catálogo
      </Link>
    </div>
  );
}