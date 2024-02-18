import React from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  innerRef: UseFormRegisterReturn;
  name: string;
  type?: string;
  inputType?: "input" | "textarea";
  placeholder?: string;
  className?: string;
  ariaLabel?: string;
  errors: FieldError | undefined;
  defaultValue?: string;
  id?: string;
}

const Input: React.FC<InputProps> = ({
  innerRef,
  name,
  type = "text",
  inputType = "input",
  placeholder = "",
  className = "",
  ariaLabel,
  errors,
  defaultValue,
  id,
}) => {
  const ariaInvalid = errors ? "true" : "false";
  const ariaLabelProps = ariaLabel ? { "aria-label": ariaLabel } : {};
  const idProps = id ? { id: id } : {};

  const InputComponent = inputType === "textarea" ? "textarea" : "input";
  const inputTypeadditionalProps = inputType ? { rows: 8 } : {};

  return (
    <>
      <InputComponent
        {...innerRef}
        {...inputTypeadditionalProps}
        {...idProps}
        {...ariaLabelProps}
        type={type}
        placeholder={placeholder}
        aria-invalid={ariaInvalid}
        aria-describedby={`${name}-error`}
        className={`mt-8 w-full rounded-lg border border-primary-light bg-light px-3 py-4 ${className}`}
        defaultValue={defaultValue}
      />
      <div aria-live="polite" aria-atomic="true">
        {errors && errors.message && (
          <p
            id={`${name}-error`}
            role="alert"
            className="mx-5 mt-2 text-sm font-semibold text-red-500"
          >
            {errors.message || ""}
          </p>
        )}
      </div>
    </>
  );
};

export default Input;
