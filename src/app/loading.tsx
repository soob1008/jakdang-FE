import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-10 flex justify-center items-center h-screen bg-black/10">
      <Spinner className="w-14 h-14 text-gray-500" />
    </div>
  );
}
