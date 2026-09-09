import { ProductList } from "../components/products";

export function ProductsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 border-b border-gray-200 pb-5">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">
            Loja
          </p>

          <div className="mt-1">
            <h1 className="text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
              Produtos
            </h1>

            <p className="mt-1 max-w-xl text-sm text-gray-500">
              Tecnologia, workspace e soluções digitais.
            </p>
          </div>
        </div>

        <ProductList />
      </div>
    </main>
  );
}
