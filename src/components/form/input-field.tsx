import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CircleAlert } from "lucide-react";
import { Textarea } from "../ui/textarea";

export function InputField({
  name,
  label,
  type,
  placeholder = "",
  value,
  onChange,
  error,
  ...props
}: {
  name: string;
  label?: string;
  type: string;
  value?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  placeholder?: string;
  error: string[] | string | undefined | null;
}) {
  return (
    <div>
      {label && <Label htmlFor={name}>{label}</Label>}
      {type !== "textarea" && (
        <Input
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          {...props}
        />
      )}
      {type === "textarea" && (
        <Textarea
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          {...props}
        />
      )}
      {error && (
        <div className="text-red-500 p-1 pt-2 flex items-center">
          <CircleAlert className="mr-2 size-5" />
          {error}
        </div>
      )}
    </div>
  );
}
