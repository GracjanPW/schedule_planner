import { cn } from "@/lib/utils";
import { CircleCheck, Loader2, TriangleAlert } from "lucide-react";
import { useFormStatus } from "react-dom";

export function FormStatus({
  message,
}: {
  message?: {
    type: string;
    text: string;
  };
}) {
  const { type, text } = message || {};
  const status = useFormStatus();

  if (status.pending)
    return (
      <div>
        <Loader2 className="animate-spin" /> Loading...
      </div>
    );
  if (!message) return null;
  return (
    <div
      className={cn(
        "text-white font-bold p-4 rounded-md flex",
        type === "error"
          ? "bg-red-100 text-red-500 border-red-500 border"
          : "bg-green-100 text-green-500 border-green-500 border",
      )}
    >
      {type === "error" ? (
        <TriangleAlert className="mr-2" />
      ) : (
        <CircleCheck className="mr-2" />
      )}
      {text}
    </div>
  );
}
