import { Control, FieldError, FieldValues, Path } from "react-hook-form";

export interface Rule {
  required?: string | boolean;
  min?: string | number;
  max?: string | number;
}

/********** CONTROLLED MODIFIED INPUT ***********/
export interface ControlledModifiedInputProps<
  TFieldValues extends FieldValues,
> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  placeholder?: string;
  label?: string;
  type?: string;
  error?: FieldError;
  rules?: Rule;
  inputRef?: React.ForwardedRef<HTMLInputElement>;
  isRequired?: boolean;
  classNames?: string;
  labelClassNames?: string;
  onValueChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ControlledModifiedSelectProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  rules: any;
  placeholder: string;
  error: any;
  options: string[];
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
