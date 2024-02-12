import React from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  innerRef: UseFormRegisterReturn;
  name: string;
  type?: string;
  inputType?: "input" | "textarea";
  placeholder: string;
  className?: string;
  ariaLabel?: string;
  errors: FieldError | undefined;
}

const Input: React.FC<InputProps> = ({
  innerRef,
  name,
  type = "text",
  inputType = "input",
  placeholder,
  className = "",
  ariaLabel = undefined,
  errors,
}) => {
  const ariaInvalid = errors ? "true" : "false";
  const additionalProps = ariaLabel ? { "aria-label": ariaLabel } : {};

  const InputComponent = inputType === "textarea" ? "textarea" : "input";
  const inputTypeadditionalProps = inputType ? { rows: 8 } : {};

  return (
    <>
      <InputComponent
        {...innerRef}
        {...inputTypeadditionalProps}
        {...additionalProps} // @ts-ignore
        type={type}
        placeholder={placeholder}
        aria-label={ariaLabel}
        aria-invalid={ariaInvalid}
        aria-describedby={`${name}-error`}
        className={`mt-8 w-full rounded-xl border border-zinc-400 bg-transparent px-5 py-3 ${className}`}
      />
      <div aria-live="polite" aria-atomic="true">
        {errors && errors.message && (
          <p
            id={`${name}-error`}
            role="alert"
            className="mx-5 mt-2 text-sm text-red-300"
          >
            {errors.message || ""}
          </p>
        )}
      </div>
    </>
  );
};

export default Input;
