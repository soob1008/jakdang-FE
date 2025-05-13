"use client";

import Link from "next/link";

interface LinkButtonProps {
  label: string;
  href?: string;
  className?: string;
}

export function LinkButton({ href = "/", label, className }: LinkButtonProps) {
  return (
    <Link
      href={href}
      className={`flex items-center justify-center bg-primary w-full text-white font-bold h-14 rounded-md px-6 has-[>svg]:px-4 ${className}`}
    >
      {label}
    </Link>
  );
}
