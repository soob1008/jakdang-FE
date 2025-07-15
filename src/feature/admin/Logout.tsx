"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Logout() {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error(`로그아웃에 실패했습니다: ${error.message}`);
      return;
    }

    router.push("/auth/login");
    router.refresh();
  };

  return (
    <button
      type="button"
      className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
      onClick={handleLogout}
    >
      로그아웃
    </button>
  );
}
