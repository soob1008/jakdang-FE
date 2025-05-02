"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

interface LinkButtonProps {
  label: string;
  href?: string;
}

export default function LinkButton({ href = "/", label }: LinkButtonProps) {
  return (
    <Link
      href={href}
      className="flex items-center justify-center bg-primary w-full text-white font-bold h-14 rounded-md px-6 has-[>svg]:px-4"
    >
      {label}
    </Link>
  );
}
