"use client";

import { Home, Package, Upload } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-emerald-400 rounded-full flex items-center justify-center font-bold text-white">MC</div>
        <div>
          <h1 className="text-xl font-bold">Sistema de Gestão de Compras</h1>
          <p className="text-sm text-gray-500">Controle inteligente de estoque</p>
        </div>
      </div>
      <div className="flex gap-6">
        <Link href="/dashboard" className="flex items-center gap-2 hover:text-blue-500">
          <Home size={20}/> Dashboard
        </Link>
        <Link href="/produtos" className="flex items-center gap-2 hover:text-blue-500">
          <Package size={20}/> Produtos
        </Link>
        <Link href="/upload" className="flex items-center gap-2 hover:text-blue-500">
          <Upload size={20}/> Upload
        </Link>
      </div>
    </nav>
  );
}
