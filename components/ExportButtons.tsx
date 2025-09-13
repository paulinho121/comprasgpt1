"use client";

import { supabase } from "@/lib/supabaseClient";
import { FileDown, FileSpreadsheet } from "lucide-react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function ExportButtons() {
  async function fetchProdutos() {
    const { data, error } = await supabase
      .from("produtos")
      .select("codigo, descricao, disponivel, a_caminho, nivel_minimo");

    if (error) {
      console.error(error);
      return [];
    }
    return data || [];
  }

  async function exportExcel() {
    const produtos = await fetchProdutos();
    const ws = XLSX.utils.json_to_sheet(produtos);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Produtos");
    XLSX.writeFile(wb, "relatorio_produtos.xlsx");
  }

  async function exportPDF() {
    const produtos = await fetchProdutos();
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Relatório de Produtos", 14, 15);
    autoTable(doc, {
      startY: 25,
      head: [["Código", "Descrição", "Disponível", "A Caminho", "Nível Mínimo"]],
      body: produtos.map((p: any) => [
        p.codigo, p.descricao, p.disponivel, p.a_caminho, p.nivel_minimo,
      ]),
    });
    doc.save("relatorio_produtos.pdf");
  }

  return (
    <div className="flex gap-4 mt-4">
      <button onClick={exportExcel} className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600">
        <FileSpreadsheet size={18} /> Exportar Excel
      </button>
      <button onClick={exportPDF} className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600">
        <FileDown size={18} /> Exportar PDF
      </button>
    </div>
  );
}
