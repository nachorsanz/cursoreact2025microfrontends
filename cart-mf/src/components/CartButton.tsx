interface CartButtonProps {
  itemCount: number;
  onClick?: () => void;
  variant?: "default" | "minimal" | "floating";
}

export default function CartButton({ itemCount, onClick, variant = "default" }: CartButtonProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "minimal":
        return "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50";
      case "floating":
        return "bg-blue-600 text-white shadow-lg hover:bg-blue-700 fixed bottom-4 right-4 z-50 rounded-full w-16 h-16 flex items-center justify-center";
      default:
        return "bg-blue-600 text-white hover:bg-blue-700";
    }
  };

  const baseStyles = variant === "floating" ? "" : "px-4 py-2 rounded-lg font-medium transition-all duration-200";

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${getVariantStyles()} relative group`}
      title="Abrir carrito de compras"
    >
      <div className="flex items-center space-x-2">
        <span className="text-lg">🛒</span>
        {variant !== "floating" && <span className="hidden sm:inline">Carrito</span>}
      </div>

      {/* Badge del contador */}
      {itemCount > 0 && (
        <span
          className={`absolute flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full ${
            variant === "floating" ? "-top-1 -right-1" : "-top-2 -right-2"
          } animate-pulse`}
        >
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      )}

      {/* Efecto hover */}
      <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-200"></div>

      {/* Indicador de microfrontend */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">🎯 Cart MF</div>
      </div>
    </button>
  );
}
