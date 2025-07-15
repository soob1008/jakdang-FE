import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { User } from "lucide-react";
import Logout from "@/feature/admin/Logout";

async function Header() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <header className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between h-14 px-4 lg:px-6 bg-white border-b border-gray-200">
      <Logo />
      {session ? (
        <div className="flex items-center gap-4">
          <Link
            href="/profile"
            className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-primary transition-colors"
          >
            <User className="w-4 h-4" />
            My
          </Link>
          <Logout />
        </div>
      ) : (
        <Link
          href="/auth/login"
          className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-primary transition-colors"
        >
          <User className="w-4 h-4" />
          Login
        </Link>
      )}
    </header>
  );
}

function Logo() {
  return (
    <h1 className="flex">
      <Link href="/" className="flex items-center">
        <span className="relative flex items-center">
          <i className="w-7 h-7 lg:w-8 lg:h-8 bg-secondary rounded-full" />
          <i className="relative left-[-10px] lg:left-[-12px] w-7 h-7 lg:w-8 lg:h-8 bg-primary rounded-full" />
        </span>
        <span className="relative left-[-4px] lg:left-[-5px] text-lg lg:text-xl font-bold">
          작당
        </span>
      </Link>
    </h1>
  );
}

export { Header };
