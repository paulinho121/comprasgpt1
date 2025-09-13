"use client";
import { uploadExcelToSupabase } from "@/lib/parseExcel";
import { useState } from "react";

export default function UploadButton() {
  const [loading, setLoading] = useState(false);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.[0]) return;
    setLoading(true);
    await uploadExcelToSupabase(e.target.files[0]);
    setLoading(false);
    alert('Planilha enviada com sucesso!');
  }

  return (
    <div className="p-4 bg-white rounded-2xl shadow">
      <input type="file" accept=".xlsx,.csv" onChange={handleFile} />
      {loading && <p className="text-sm text-gray-500 mt-2">Carregando...</p>}
    </div>
  );
}
