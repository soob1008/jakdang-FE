"use client";

import { useLogout } from "../auth/hooks/useLogout";

export default function Logout() {
  const { mutate: logout } = useLogout();

  return (
    <button
      type="button"
      className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
      onClick={() => logout()}
    >
      로그아웃
    </button>
  );
}
