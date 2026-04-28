"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Leaf, Menu } from "lucide-react";
import { checkApiHealth } from "@/lib/api";

const links = [
  { href: "/", label: "Home" },
  { href: "/predict", label: "Predict" },
  { href: "/model-stats", label: "Model Stats" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isApiLive, setIsApiLive] = useState<boolean | null>(null);

  useEffect(() => {
    let mounted = true;
    const check = async () => {
      const live = await checkApiHealth();
      if (mounted) setIsApiLive(live);
    };
    check();
    const interval = setInterval(check, 30000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-white/70 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 md:px-8">
        <Link href="/" className="group flex items-center gap-2 text-slate-900" onClick={() => setIsOpen(false)}>
          <span className="rounded-lg border border-emerald-200 bg-emerald-50 p-1.5 transition group-hover:scale-105">
            <Leaf className="h-4 w-4 text-emerald-600" />
          </span>
          <span className="text-lg font-semibold tracking-tight">AgriAdvisor</span>
          {isApiLive !== null && (
            <div 
              className={`flex items-center gap-1.5 ml-2 rounded-full px-2 py-0.5 border ${
                isApiLive 
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700" 
                  : "border-red-200 bg-red-50 text-red-700"
              }`}
              title={isApiLive ? "API is live" : "API is offline"}
            >
              <div className="relative flex h-2 w-2">
                {isApiLive && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                )}
                <span className={`relative inline-flex rounded-full h-2 w-2 ${isApiLive ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
              </div>
              <span className="text-[10px] font-medium uppercase tracking-wider hidden sm:inline-block">
                {isApiLive ? "API Live" : "Offline"}
              </span>
            </div>
          )}
        </Link>
        <nav className="glass-surface hidden md:flex items-center gap-1 p-1">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-2xl px-3 py-1.5 text-sm transition ${
                  active
                    ? "bg-emerald-100 font-medium text-emerald-700"
                    : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <button 
          className="md:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 py-2 flex flex-col gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="py-2 px-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-green-800"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
