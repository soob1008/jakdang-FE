import { Button } from "@/components/ui/button";

export default function UserInfo() {
  return (
    <section className="flex justify-between items-center pb-4 border-b border-gray-200">
      <b className="block text-base lg:text-lg">1008sb@gmail.com</b>
      <Button variant="outline-primary" size="sm">
        내 페이지
      </Button>
    </section>
  );
}
