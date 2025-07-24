import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
interface ThemeOptionProps {
  id: string;
  label: string;
  bg: string;
  fieldName: string;
}

export default function DesignOptionItem({
  id,
  fieldName,
  label,
  bg,
}: ThemeOptionProps) {
  const { register } = useFormContext();

  return (
    <>
      <input
        type="radio"
        value={id}
        id={id}
        {...register(fieldName)}
        className="peer sr-only"
      />
      <label
        htmlFor={id}
        className={cn(
          "flex items-center justify-center border rounded-xl h-36 cursor-pointer transition-all",
          bg,
          "peer-checked:ring-2 peer-checked:ring-ring peer-checked:border-ring"
        )}
      >
        {label}
      </label>
    </>
  );
}
