import { Product } from "../types";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (productId: string) => void;
  onViewDetails?: (productId: string) => void;
}

export default function ProductCard({ product, onAddToCart, onViewDetails }: ProductCardProps) {
  const handleAddToCart = () => {
    onAddToCart?.(product.id);
  };

  const handleViewDetails = () => {
    onViewDetails?.(product.id);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="text-yellow-400">
          ★
        </span>,
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="text-yellow-400">
          ☆
        </span>,
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="text-gray-300">
          ★
        </span>,
      );
    }

    return stars;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 group">
      {/* Imagen del producto */}
      <div className="relative bg-gradient-to-br from-blue-50 to-purple-50 h-48 flex items-center justify-center">
        <div className="text-6xl group-hover:scale-110 transition-transform duration-300">{product.image}</div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.isOnSale && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">-{product.discount}%</span>
          )}
          {!product.inStock && (
            <span className="bg-gray-500 text-white text-xs font-bold px-2 py-1 rounded-full">Agotado</span>
          )}
        </div>

        {/* Tags */}
        <div className="absolute top-3 right-3">
          {product.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="bg-white/80 backdrop-blur-sm text-gray-700 text-xs px-2 py-1 rounded-full mb-1 block"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Contenido */}
      <div className="p-4">
        {/* Categoría */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full font-medium">
            {product.category}
          </span>
          <div className="flex items-center space-x-1">
            {renderStars(product.rating)}
            <span className="text-xs text-gray-500 ml-1">({product.reviewCount})</span>
          </div>
        </div>

        {/* Nombre del producto */}
        <h3 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>

        {/* Descripción */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>

        {/* Precio */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gray-900">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
            )}
          </div>
        </div>

        {/* Acciones */}
        <div className="flex space-x-2">
          <button
            onClick={handleViewDetails}
            className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm"
          >
            Ver Detalles
          </button>

          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`flex-1 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              product.inStock
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {product.inStock ? "🛒 Agregar" : "Sin Stock"}
          </button>
        </div>
      </div>

      {/* Indicador de microfrontend */}
      <div className="bg-purple-100 border-t border-purple-200 px-4 py-2">
        <div className="text-xs text-purple-800 text-center">🎯 Products MF - ID: {product.id}</div>
      </div>
    </div>
  );
}
