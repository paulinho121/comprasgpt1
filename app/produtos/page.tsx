import Navbar from "@/components/Navbar";
import ProductTable from "@/components/ProductTable";

export default function ProdutosPage() {
  return (
    <div>
      <Navbar/>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Produtos</h1>
        <ProductTable/>
      </div>
    </div>
  );
}
