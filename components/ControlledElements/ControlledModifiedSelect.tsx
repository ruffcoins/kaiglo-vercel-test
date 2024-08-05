import { ControlledModifiedSelectProps } from "@/interfaces/controlledElements.interface";
import { Controller, FieldValues } from "react-hook-form";
import ModifiedSelect from "../shared/ModifiedSelect";

const ControlledModifiedSelect = <TFormValue extends FieldValues>({
  name,
  placeholder,
  control,
  rules,
  error,
  options,
  onChange,
}: ControlledModifiedSelectProps<TFormValue>) => {
  return (
    <div>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <div>
            <ModifiedSelect
              options={options}
              selectedValue={field.value}
              onChange={field.onChange}
              placeholder={placeholder}
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
export default ControlledModifiedSelect;
