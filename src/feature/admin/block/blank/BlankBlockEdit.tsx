"use client";

import { useFormContext } from "react-hook-form";

export default function BlankBlockEdit({ index }: { index: number }) {
  const { watch, setValue } = useFormContext();
  const namePrefix = `blocks_draft.${index}.data`;
  const height = watch(`${namePrefix}.height`) ?? 80; // fallback

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    // 숫자만 허용 (빈 문자열은 0 처리)
    if (/^\d*$/.test(input)) {
      const numeric = parseInt(input, 10);
      if (!isNaN(numeric) && numeric <= 200) {
        setValue(`${namePrefix}.height`, numeric, { shouldDirty: true });
      } else if (input === "") {
        setValue(`${namePrefix}.height`, 0, { shouldDirty: true });
      }
    }
  };

  return (
    <div className="w-full border border-dashed border-gray-300 rounded-md bg-gray-50 px-4 py-6 text-sm text-gray-500 flex flex-col items-center gap-2">
      <label className="flex items-center gap-2">
        높이:
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={height}
          onChange={handleChange}
          className="w-20 h-8 px-2 py-1 border border-gray-300 rounded text-center text-sm"
        />
        px
      </label>
    </div>
  );
}
