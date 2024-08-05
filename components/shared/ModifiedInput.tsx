import { Input } from "@/components/ui/input";
import { ModifiedInputProps } from "@/interfaces/elements.interface";
import { cn } from "@/lib/utils";

const ModifiedInput = ({
  placeholder,
  type,
  id,
  classNames,
  inputRef,
  value,
  onChange,
  onValueChange,
  isRequired,
}: ModifiedInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);

    if (onValueChange) {
      onValueChange(e);
    }
  };

  return (
    <Input
      id={id}
      ref={inputRef}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      className={cn("h-12 w-full", classNames)}
      required={isRequired}
    />
  );
};
export default ModifiedInput;
