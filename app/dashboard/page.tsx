"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabaseClient";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from "recharts";
import { Package, AlertTriangle, TrendingUp, ShoppingCart } from "lucide-react";
import ExportButtons from "@/components/ExportButtons";

export default function Dashboard() {
  const [totalProdutos, setTotalProdutos] = useState(0);
  const [estoqueCritico, setEstoqueCritico] = useState(0);
  const [estoqueBaixo, setEstoqueBaixo] = useState(0);
  const [sugestoes, setSugestoes] = useState(0);
  const [statusData, setStatusData] = useState<any[]>([]);
  const [top10, setTop10] = useState<any[]>([]);

  useEffect(() => { fetchResumo(); }, []);

  async function fetchResumo() {
    const { data, error } = await supabase.from("produtos").select("disponivel, nivel_minimo, descricao, codigo");
    if (error) { console.error(error); return; }

    if (data) {
      const total = data.length;
      let critico = 0; let baixo = 0; let ok = 0; let atencao = 0;

      data.forEach((p) => {
        if (p.disponivel <= 0) critico++;
        else if (p.disponivel < p.nivel_minimo / 2) atencao++;
        else if (p.disponivel < p.nivel_minimo) baixo++;
        else ok++;
      });

      setTotalProdutos(total);
      setEstoqueCritico(critico);
      setEstoqueBaixo(baixo);
      setSugestoes(baixo + critico);

      setStatusData([
        { name: "Crítico", value: critico, color: "#ef4444" },
        { name: "Atenção", value: atencao, color: "#facc15" },
        { name: "Baixo", value: baixo, color: "#f97316" },
        { name: "OK", value: ok, color: "#22c55e" },
      ]);

      const sorted = [...data].sort((a, b) => a.disponivel - b.disponivel).slice(0, 10);
      setTop10(sorted.map((p) => ({ name: p.descricao || p.codigo, value: p.disponivel })));
    }
  }

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-600 mt-1">Visão geral do status do estoque e sugestões de compra</p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
          <div className="p-4 bg-white rounded-2xl shadow flex flex-col items-start gap-2">
            <div className="flex justify-between w-full items-center"><h2 className="text-lg font-medium">Total de Produtos</h2></div>
            <p className="text-3xl font-bold text-blue-600">{totalProdutos}</p>
          </div>
          <div className="p-4 bg-white rounded-2xl shadow flex flex-col items-start gap-2">
            <div className="flex justify-between w-full items-center"><h2 className="text-lg font-medium">Estoque Crítico</h2></div>
            <p className="text-3xl font-bold text-red-600">{estoqueCritico}</p>
          </div>
          <div className="p-4 bg-white rounded-2xl shadow flex flex-col items-start gap-2">
            <div className="flex justify-between w-full items-center"><h2 className="text-lg font-medium">Estoque Baixo</h2></div>
            <p className="text-3xl font-bold text-orange-600">{estoqueBaixo}</p>
          </div>
          <div className="p-4 bg-white rounded-2xl shadow flex flex-col items-start gap-2">
            <div className="flex justify-between w-full items-center"><h2 className="text-lg font-medium">Sugestões de Compra</h2></div>
            <p className="text-3xl font-bold text-blue-600">{sugestoes}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="p-6 bg-white rounded-2xl shadow">
            <h2 className="text-lg font-semibold mb-4">Distribuição por Status</h2>
            <p className="text-sm text-gray-500 mb-2">Status atual do estoque por categoria</p>
            <div style={{ width: '100%', height: 250 }}>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={statusData} dataKey="value" outerRadius={80} label>
                    {statusData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex gap-4 mt-4 justify-center">
              {statusData.map((s, i) => (
                <div key={i} className="flex items-center gap-1 text-sm">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color }}></span>
                  {s.name}: {s.value}
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 bg-white rounded-2xl shadow">
            <h2 className="text-lg font-semibold mb-4">Top 10 - Menor Estoque</h2>
            <p className="text-sm text-gray-500 mb-2">Produtos com menor quantidade em estoque</p>
            <div style={{ width: '100%', height: 250 }}>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={top10}>
                  <XAxis dataKey="name" hide />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#06b6d4" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <ExportButtons />

      </div>
    </div>
  );
}
