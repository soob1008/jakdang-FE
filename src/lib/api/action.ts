// lib/handleAction.ts
import { toast } from "sonner";

export async function handleAction<T>(
  action: () => Promise<T>,
  {
    successMessage,
    errorMessage = "문제가 발생했습니다.",
    onSuccess,
    onError,
  }: {
    successMessage?: string;
    errorMessage?: string;
    onSuccess?: (result: T) => void;
    onError?: (error: unknown) => void;
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
    if (errorMessage) {
      toast.error(errorMessage);
    }
    onError?.(err);
    return null;
  }
}

// lib/api/handleServerAction.ts

export async function handleServerAction<T>(
  action: () => Promise<T>,
  {
    onSuccess,
    onError,
  }: {
    onSuccess?: (result: T) => void;
    onError?: (error: unknown) => void;
  } = {}
): Promise<T | null> {
  try {
    const result = await action();
    onSuccess?.(result);
    return result;
  } catch (err) {
    console.error("handleServerAction error:", err);
    onError?.(err);
    return null;
  }
}
