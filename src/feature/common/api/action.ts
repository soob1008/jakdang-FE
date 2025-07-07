// lib/handleAction.ts
import { toast } from "sonner";

export async function handleAction<T>(
  action: () => Promise<T>,
  {
    successMessage,
    errorMessage = "문제가 발생했습니다.",
    onSuccess,
  }: {
    successMessage?: string;
    errorMessage?: string;
    onSuccess?: (result: T) => void;
  } = {}
): Promise<T | null> {
  try {
    const result = await action();

    if (successMessage) {
      toast.success(successMessage);
    }

    onSuccess?.(result);
    return result;
  } catch (err: unknown) {
    console.error("handleAction error:", err);
    toast.error(errorMessage);
    return null;
  }
}
