import { ControlledModifiedTextAreaProps } from "@/interfaces/controlledElements.interface";
import { Controller, FieldValues } from "react-hook-form";
import ModifiedTextArea from "../shared/ModifiedTextArea";

const ControlledModifiedTextArea = <TFormValue extends FieldValues>({
  name,
  placeholder,
  control,
  rules,
  error,
  rows,
  required,
}: ControlledModifiedTextAreaProps<TFormValue>) => {
  return (
    <div>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <div>
            <ModifiedTextArea
              id={name}
              value={field.value}
              onChange={field.onChange}
              placeholder={placeholder}
              rows={rows}
              required={required}
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

export default ControlledModifiedTextArea;
