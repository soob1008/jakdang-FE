import Link from "next/link";

export function GuestCallToAction() {
  return (
    <div className="fixed bottom-14 left-1/2 z-11 w-[80%] -translate-x-1/2 transform rounded-full bg-white px-6 py-3 text-center text-sm shadow-lg">
      <Link href="/auth/login" className="whitespace-nowrap text-sm font-medium">
        나만의 작가 페이지를 무료로 시작하세요.
      </Link>
    </div>
  );
}
