import { Link, useLocation } from "react-router-dom";
import { useState, type ReactNode } from "react";
import { BookOpen, GraduationCap, Menu, X } from "lucide-react";

const navLinks = [
  { path: "/", it: "Home", ar: "الرئيسية" },
  { path: "/grammar", it: "Grammatica", ar: "القواعد" },
  { path: "/listening", it: "Ascolto", ar: "الاستماع" },
  { path: "/reading", it: "Lettura", ar: "القراءة" },
  { path: "/writing", it: "Scrittura", ar: "الكتابة" },
  { path: "/quizzes", it: "Verifiche", ar: "الاختبارات" },
];

export default function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#16324F] text-white shadow-lg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between gap-4">
            <Link to="/" className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 text-[#16324F] shadow-md">
                <BookOpen className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className="truncate text-base font-bold sm:text-lg">Imparare la lingua italiana</div>
                <div className="truncate text-[11px] text-white/70 sm:text-xs" dir="rtl">موقع تعليمي لتعلّم اللغة الإيطالية</div>
              </div>
            </Link>

            <div className="hidden items-center gap-1 md:flex">
              {navLinks.map((link) => {
                const active = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`rounded-xl px-3 py-2 transition-all ${active ? "bg-white/15 text-white shadow-sm" : "text-white/80 hover:bg-white/10 hover:text-white"}`}
                  >
                    <span className="block text-[13px] font-semibold">{link.it}</span>
                    <span className="block text-[11px] text-white/65" dir="rtl">{link.ar}</span>
                  </Link>
                );
              })}
            </div>

            <button type="button" className="rounded-xl p-2 transition-colors hover:bg-white/10 md:hidden" onClick={() => setMobileOpen((prev) => !prev)} aria-label="Menu">
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="border-t border-white/10 bg-[#16324F] md:hidden">
            <div className="px-4 py-3">
              {navLinks.map((link) => {
                const active = location.pathname === link.path;
                return (
                  <Link key={link.path} to={link.path} onClick={() => setMobileOpen(false)} className={`mb-2 block rounded-xl px-4 py-3 transition-colors last:mb-0 ${active ? "bg-white/15 text-white" : "text-white/80 hover:bg-white/10 hover:text-white"}`}>
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-semibold">{link.it}</span>
                      <span className="text-xs text-white/70" dir="rtl">{link.ar}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </nav>

      <main className="flex-1">{children}</main>

      <footer className="mt-12 bg-[#16324F] text-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-amber-400" />
                <span className="font-bold">Imparare la lingua italiana</span>
              </div>
              <p className="text-sm leading-6 text-white/75">Piattaforma didattica per studenti dei livelli A1 e A2.</p>
              <p className="mt-2 text-sm leading-6 text-white/60" dir="rtl">منصة تعليمية موجّهة للمتعلمين في مستويي A1 و A2.</p>
            </div>
            <div>
              <h3 className="mb-3 font-semibold">Sezioni principali</h3>
              <div className="space-y-2 text-sm text-white/75">
                <p>Grammatica</p>
                <p>Ascolto</p>
                <p>Lettura</p>
                <p>Scrittura</p>
                <p>Verifiche</p>
              </div>
            </div>
            <div>
              <h3 className="mb-3 font-semibold">Livelli</h3>
              <div className="space-y-2 text-sm text-white/75">
                <p>A1 — livello iniziale</p>
                <p>A2 — livello elementare</p>
                <p dir="rtl">محتوى تدريجي في القواعد والفهم والإنتاج</p>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-white/10 pt-4 text-center text-xs text-white/55">© 2026 Imparare la lingua italiana — Tutti i diritti riservati</div>
        </div>
      </footer>
    </div>
  );
}
