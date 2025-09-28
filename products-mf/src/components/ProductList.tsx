import { useState, useMemo, useEffect } from "react";
import ProductCard from "./ProductCard";
import { Product, ProductFilters } from "../types";
import { mockProducts, categories } from "../data/mockProducts";

interface ProductListProps {
  onAddToCart?: (productId: string) => void;
  onViewDetails?: (productId: string) => void;
  category?: string;
  initialFilters?: ProductFilters;
}

export default function ProductList({ onAddToCart, onViewDetails, category, initialFilters = {} }: ProductListProps) {
  const [products] = useState<Product[]>(mockProducts);
  const [filters, setFilters] = useState<ProductFilters>({
    category: category || "Todos",
    priceRange: [0, 5000],
    inStockOnly: false,
    minRating: 0,
    search: "",
    ...initialFilters,
  });
  const [sortBy, setSortBy] = useState<"name" | "price" | "rating" | "newest">("newest");
  const [view, setView] = useState<"grid" | "list">("grid");

  // Efecto para actualizar filtro de categoría cuando cambie la prop
  useEffect(() => {
    if (category && category !== filters.category) {
      setFilters((prev) => ({ ...prev, category }));
    }
  }, [category, filters.category]);

  // Filtrar y ordenar productos
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      // Filtro de categoría
      const categoryMatch = filters.category === "Todos" || product.category === filters.category;

      // Filtro de precio
      const priceMatch =
        product.price >= (filters.priceRange?.[0] || 0) && product.price <= (filters.priceRange?.[1] || 5000);

      // Filtro de stock
      const stockMatch = !filters.inStockOnly || product.inStock;

      // Filtro de rating
      const ratingMatch = product.rating >= (filters.minRating || 0);

      // Filtro de búsqueda
      const searchMatch =
        !filters.search ||
        product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        product.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        product.tags.some((tag) => tag.toLowerCase().includes(filters.search!.toLowerCase()));

      return categoryMatch && priceMatch && stockMatch && ratingMatch && searchMatch;
    });

    // Ordenar productos
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "price":
          return a.price - b.price;
        case "rating":
          return b.rating - a.rating;
        case "newest":
        default:
          return parseInt(b.id) - parseInt(a.id);
      }
    });

    return filtered;
  }, [products, filters, sortBy]);

  const handleFilterChange = (newFilters: Partial<ProductFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleClearFilters = () => {
    setFilters({
      category: "Todos",
      priceRange: [0, 5000],
      inStockOnly: false,
      minRating: 0,
      search: "",
    });
  };

  const productStats = useMemo(() => {
    return {
      total: products.length,
      inStock: products.filter((p) => p.inStock).length,
      onSale: products.filter((p) => p.isOnSale).length,
      categories: [...new Set(products.map((p) => p.category))].length,
    };
  }, [products]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">🛍️ Catálogo de Productos</h1>
            <p className="text-gray-600 mt-2">
              {filteredAndSortedProducts.length} de {products.length} productos
            </p>
          </div>

          {/* Vista toggle */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setView("grid")}
              className={`p-2 rounded-lg ${
                view === "grid" ? "bg-blue-100 text-blue-600" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <span className="text-lg">▦</span>
            </button>
            <button
              onClick={() => setView("list")}
              className={`p-2 rounded-lg ${
                view === "list" ? "bg-blue-100 text-blue-600" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <span className="text-lg">☰</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{productStats.total}</div>
            <div className="text-sm text-gray-600">Total Productos</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{productStats.inStock}</div>
            <div className="text-sm text-gray-600">En Stock</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{productStats.onSale}</div>
            <div className="text-sm text-gray-600">En Oferta</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{productStats.categories}</div>
            <div className="text-sm text-gray-600">Categorías</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filtros Sidebar */}
        <div className="w-full lg:w-64 bg-white rounded-lg border border-gray-200 p-6 h-fit">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Filtros</h3>
            <button onClick={handleClearFilters} className="text-sm text-blue-600 hover:text-blue-800">
              Limpiar
            </button>
          </div>

          {/* Búsqueda */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">🔍 Buscar</label>
            <input
              type="text"
              value={filters.search || ""}
              onChange={(e) => handleFilterChange({ search: e.target.value })}
              placeholder="Buscar productos..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Categorías */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">📂 Categoría</label>
            <select
              value={filters.category || "Todos"}
              onChange={(e) => handleFilterChange({ category: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Rango de precios */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              💰 Precio: ${filters.priceRange?.[0]} - ${filters.priceRange?.[1]}
            </label>
            <div className="space-y-2">
              <input
                type="range"
                min="0"
                max="5000"
                value={filters.priceRange?.[1] || 5000}
                onChange={(e) =>
                  handleFilterChange({
                    priceRange: [filters.priceRange?.[0] || 0, parseInt(e.target.value)],
                  })
                }
                className="w-full"
              />
            </div>
          </div>

          {/* Rating mínimo */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">⭐ Rating Mínimo</label>
            <select
              value={filters.minRating || 0}
              onChange={(e) => handleFilterChange({ minRating: parseFloat(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value={0}>Cualquier rating</option>
              <option value={4}>4+ estrellas</option>
              <option value={4.5}>4.5+ estrellas</option>
            </select>
          </div>

          {/* Solo en stock */}
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={filters.inStockOnly || false}
                onChange={(e) => handleFilterChange({ inStockOnly: e.target.checked })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">Solo en stock</span>
            </label>
          </div>
        </div>

        {/* Lista de productos */}
        <div className="flex-1">
          {/* Ordenamiento */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-gray-700">Ordenar por:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="newest">Más Recientes</option>
                <option value="name">Nombre A-Z</option>
                <option value="price">Precio: Menor a Mayor</option>
                <option value="rating">Rating: Mayor a Menor</option>
              </select>
            </div>
          </div>

          {/* Grid de productos */}
          {filteredAndSortedProducts.length > 0 ? (
            <div
              className={`grid gap-6 ${view === "grid" ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"}`}
            >
              {filteredAndSortedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                  onViewDetails={onViewDetails}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No se encontraron productos</h3>
              <p className="text-gray-600 mb-4">Intenta ajustar los filtros para ver más productos</p>
              <button
                onClick={handleClearFilters}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                Limpiar Filtros
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Indicador de microfrontend */}
      <div className="mt-8 bg-purple-100 border border-purple-200 rounded-lg p-4">
        <div className="text-center">
          <p className="text-purple-800 font-medium">🎯 Products Microfrontend - Puerto 5002</p>
          <p className="text-purple-700 text-sm">
            Mostrando {filteredAndSortedProducts.length} productos con filtros activos
          </p>
        </div>
      </div>
    </div>
  );
}
