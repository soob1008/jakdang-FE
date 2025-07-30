"use client";

export default function PagePreview() {
  return (
    <aside className="sticky top-10 h-fit px-4 flex flex-col items-center justify-center">
      <article className="w-[280px] h-[560px] rounded-[2rem] border border-gray-200 shadow-[0_0_20px_rgba(0,0,0,0.08)] overflow-hidden bg-[#FDCDB0]">
        <div className="flex flex-col items-center justify-center mt-12">
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-gray-400 text-3xl">
            👤
          </div>
          <div className="mt-2 font-bold text-black text-base">soob108</div>
          <div className="text-sm text-black/60">test</div>
        </div>

        {/* SNS 카드 */}
        <div className="mt-8 px-6">
          <div className="flex items-center justify-between bg-[#FEE7D1] rounded-lg p-2 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-black">Instagram</span>
            </div>
            <button className="text-gray-600">⋯</button>
          </div>
        </div>
      </article>
    </aside>
  );
}
