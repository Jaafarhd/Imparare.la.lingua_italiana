import { useEffect } from "react";
import { client } from "../lib/api";

export default function AuthCallback() {
  useEffect(() => {
    client.auth.login();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="text-center">
        <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600" />
        <p className="font-medium text-slate-700">Accesso in corso...</p>
        <p className="mt-2 text-sm text-slate-500" dir="rtl">جارٍ إتمام تسجيل الدخول...</p>
      </div>
    </div>
  );
}
