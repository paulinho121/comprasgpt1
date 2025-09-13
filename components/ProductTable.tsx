"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function ProductTable() {
  const [produtos, setProdutos] = useState<any[]>([]);

  useEffect(() => { fetchProdutos(); }, []);

  async function fetchProdutos() {
    const { data, error } = await supabase
      .from("produtos")
      .select("id, codigo, descricao, disponivel, a_caminho, nivel_minimo");
    if (!error && data) setProdutos(data);
  }

  return (
    <div className="p-4 bg-white rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Lista de Produtos</h2>
      <table className="w-full table-auto">
        <thead>
          <tr className="border-b bg-gray-100">
            <th className="p-2 text-left">Código</th>
            <th className="p-2 text-left">Descrição</th>
            <th className="p-2 text-left">Disponível</th>
            <th className="p-2 text-left">A Caminho</th>
            <th className="p-2 text-left">Nível Mínimo</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((p) => (
            <tr key={p.id} className="border-b hover:bg-gray-50">
              <td className="p-2">{p.codigo}</td>
              <td className="p-2">{p.descricao}</td>
              <td className="p-2">{p.disponivel}</td>
              <td className="p-2">{p.a_caminho}</td>
              <td className="p-2">{p.nivel_minimo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
