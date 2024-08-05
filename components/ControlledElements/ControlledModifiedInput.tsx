import { ControlledModifiedInputProps } from "@/interfaces/controlledElements.interface";
import { Controller, FieldValues } from "react-hook-form";
import ModifiedInput from "@/components/shared/ModifiedInput";
import { cn } from "@/lib/utils";

const ControlledModifiedInput = <TFormValue extends FieldValues>({
  name,
  label,
  placeholder,
  type,
  control,
  rules,
  error,
  isRequired,
  classNames,
  labelClassNames,
  onValueChange,
}: ControlledModifiedInputProps<TFormValue>) => {
  return (
    <div>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <div>
            <ModifiedInput
              id={name}
              type={type}
              value={field.value}
              onChange={field.onChange}
              isRequired={isRequired}
              classNames={cn("w-full", classNames)}
              onValueChange={onValueChange}
              placeholder={placeholder}
              label={label}
              labelClassNames={labelClassNames}
            />
            {error && (
              <p className="text-[10px] mt-1 font-light text-kaiglo_critical-base">
                {error.message}
              </p>
            )}
          </div>
        )}
      />
    </div>
  );
};
export default ControlledModifiedInput;
