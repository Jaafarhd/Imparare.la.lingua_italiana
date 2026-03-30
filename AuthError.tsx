import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function AuthError() {
  const [searchParams] = useSearchParams();
  const [countdown, setCountdown] = useState(3);
  const errorMessage = searchParams.get("msg") || "Autenticazione non valida o scaduta";

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = "/";
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 p-6 text-center">
      <div className="max-w-md space-y-6">
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-red-500/20 blur-xl" />
              <AlertCircle className="relative h-12 w-12 text-red-500" strokeWidth={1.5} />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Errore di autenticazione</h1>
          <p className="text-base text-slate-600">{errorMessage}</p>
          <p className="text-sm text-slate-500" dir="rtl">حدث خطأ في تسجيل الدخول</p>
          <div className="pt-2">
            <p className="text-sm text-slate-500">
              {countdown > 0 ? <>Ritorno automatico alla pagina principale tra <span className="text-base font-semibold text-blue-600">{countdown}</span> secondi</> : "Reindirizzamento in corso..."}
            </p>
          </div>
        </div>
        <div className="flex justify-center pt-2">
          <Button onClick={() => (window.location.href = "/")} className="px-6">Torna alla home</Button>
        </div>
      </div>
    </div>
  );
}
