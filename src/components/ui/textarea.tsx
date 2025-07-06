import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({
  className,

  ...props
}: React.ComponentProps<"textarea">) {
  const { maxLength, value } = props;
  // If maxLength is not provided, default to 0
  return (
    <div className="flex flex-col space-y-1">
      <textarea
        data-slot="textarea"
        className={cn(
          "border-input placeholder:text-xs placeholder:text-gray-300 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        {...props}
      />
      {maxLength && (
        <div className="text-xs text-gray-500 mt-1 self-end">
          {typeof value === "string" ? value.length : 0}/{maxLength}
        </div>
      )}
    </div>
  );
}

export { Textarea };
