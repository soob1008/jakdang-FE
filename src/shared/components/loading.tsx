export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-4">
      <div className="flex space-x-2">
        <div className="h-2 w-2 bg-gray-800 rounded-full animate-bounce [animation-delay:-0.3s]" />
        <div className="h-2 w-2 bg-gray-800 rounded-full animate-bounce [animation-delay:-0.15s]" />
        <div className="h-2 w-2 bg-gray-800 rounded-full animate-bounce" />
      </div>
    </div>
  );
}
