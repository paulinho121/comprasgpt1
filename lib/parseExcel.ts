import * as XLSX from "xlsx";
import { supabase } from "./supabaseClient";

export async function uploadExcelToSupabase(file: File) {
  const data = await file.arrayBuffer();
  const workbook = XLSX.read(data);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const json = XLSX.utils.sheet_to_json(sheet);

  for (const row of json) {
    await supabase.from("produtos").upsert({
      codigo: row.codigo,
      descricao: row.descricao,
      disponivel: row.disponivel || 0,
      a_caminho: row.a_caminho || 0,
      nivel_minimo: row.nivel_minimo || 5,
    }, { onConflict: "codigo" });
  }
}
