// components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative border-t bg-gray-50 py-10 text-sm text-gray-500 z-10">
      <div className="container mx-auto px-4 flex flex-col items-center gap-4 text-center">
        <p className="font-medium text-gray-600">당당한 작가들의 공간, 작당</p>

        <div className="flex gap-4 flex-wrap justify-center">
          <Link href="/term/service" className="hover:underline">
            이용약관
          </Link>
          <Link href="/term/privacy" className="hover:underline">
            개인정보 처리방침
          </Link>
        </div>

        <p className="text-xs text-gray-400 mt-2">
          © 2025 작당. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
