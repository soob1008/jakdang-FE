export default function Works() {
  return (
    <section className="mt-20">
      <h2 className="font-bold text-lg mb-3">작품들</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[1, 2, 3, 4].map((item) => (
          <div key={item}>
            <div className="bg-gray-300 aspect-square" />
            <div className="mt-2 text-sm font-semibold">랑과 나의 사막</div>
            <p className="text-xs text-gray-500">
              사막에서 만난 새로운 만남과 이별을 담은 우리들의 이야기
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
