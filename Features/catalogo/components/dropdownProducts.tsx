import { useState } from 'react';
import Product from '../../../app/types/product'
import ProductCard from './productCard';

interface DropdownProductsProps {
  products: Product[];
  title?: string;
}

export default function DropdownProducts ({products, title}: DropdownProductsProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="mb-6">
      {/* Barra desplegable */}
      <div 
        className="flex items-center justify-between p-4 bg-[var(--color-card-bg)] rounded-t-2xl cursor-pointer hover:bg-[var(--color-card-hover)] transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h2 className="text-lg font-semibold text-[var(--color-text)]">
          {title}
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-[var(--color-text-secondary)]">
            {isExpanded ? 'Ocultar' : 'Mostrar'}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 text-[var(--color-navbar-bg)] transition-transform duration-300 ${
              isExpanded ? 'rotate-180' : 'rotate-0'
            }`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </div>

      {/* Contenido desplegable */}
      <div className={`overflow-hidden transition-all duration-300 ${
        isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="p-4 bg-[var(--color-card-bg)] rounded-b-2xl">
          {products.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-2 gap-y-5">
              {products.map((product, index) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-[var(--color-text-secondary)]">
              No hay productos para mostrar
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

