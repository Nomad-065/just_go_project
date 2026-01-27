import {Input, type InputProps} from "@mui/material";
import {cn} from "../../../utils/cn";
import CloseIcon from "@mui/icons-material/Close";
import * as React from "react";

export interface InputFieldProps extends Omit<InputProps, "onChange"> {
  label?: string;
  value?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  fullWidth?: boolean;
  sx?: InputProps["sx"];
  hidden?: boolean;
  labelPosition?: "top" | "bottom" | "left" | "right";
  labelWidth?: string;
  labelSeparator?: string;
  labelClassName?: string;
  parentClassName?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  errorMessage?: string;
}

const InputField = ({
                      label,
                      value,
                      onChange,
                      placeholder = '',
                      fullWidth = true,
                      sx = {},
                      hidden = false,
                      labelPosition = "left", // "top" | "bottom" | "left" | "right"
                      labelWidth = "120px", // used when label is left or right
                      labelSeparator = ":", // e.g. ":", "-", or ""
                      labelClassName = '',
                      parentClassName = "", // for outer div styles
                      disabled = false,
                      readOnly = false,
                      required = false,
                      errorMessage,
                      ...rest
                    }: InputFieldProps) => {

  if (hidden) return null

  const isVertical = labelPosition === "top" || labelPosition === "bottom";

  const containerClass = cn(
    isVertical ? "flex flex-col gap-1" : "flex items-center gap-2",
    'relative',
    parentClassName
  );

  const handleClear = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!disabled && !readOnly && onChange) onChange({target: {value: ''}} as React.ChangeEvent<HTMLInputElement>);
  };

  const showClearButton =
    !disabled &&
    !readOnly &&
    (
      (typeof value === "string" && value.trim() !== "") ||
      (typeof value === "number" && !isNaN(value))
    );


  const labelElement = label ? (
    <label
      className={cn(
        "text-sm flex-shrink-0 font-semibold",
        labelClassName
      )}
      style={
        !isVertical
          ? {
            width: labelWidth,
            textAlign: labelPosition === "right" ? "left" : "right",
          }
          : {}
      }
    >
      {labelPosition === "right" && labelSeparator && (
        <span className="mr-0.5">{labelSeparator}</span>
      )}
      {label}
      {required && (
        <span className={'text-red-600'}>*</span>
      )}
      {labelPosition !== "right" && labelSeparator && (
        <span className="ml-0.5">{labelSeparator}</span>
      )}
    </label>
  ) : null;

  return (
    <div className={containerClass}>
      {(labelPosition === "top" || labelPosition === "left") && labelElement}
      <div className="relative flex-1 flex flex-col gap-1">
        <Input
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          fullWidth={fullWidth}
          disabled={disabled}
          color="primary"
          sx={{
            // backgroundColor: "white",
            // border: "1px solid #ccc",
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark' ? '#292929' : 'white',
            border: (theme) =>
              theme.palette.mode === 'dark' ? '1px solid #555' : '1px solid #ccc',
            color: (theme) =>
              theme.palette.mode === 'dark' ? '#fff' : 'inherit',
            borderRadius: "6px",
            px: 1,
            py: 0,
            "&.Mui-disabled": {
              opacity: 0.6,
            },
            ...sx,
          }}
          {...rest}
        />
        {errorMessage && (
          <span className="text-xs text-red-500">{errorMessage}</span>
        )}
      </div>
      {showClearButton && (
        <div
          onClick={handleClear}
          style={{
            position: "absolute",
            right: "5px",
            top: "50%",
            transform: "translateY(-50%)",
            padding: "4px",
            zIndex: 1,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CloseIcon sx={{fontSize: 16}}/>
        </div>
      )}
      {(labelPosition === "bottom" || labelPosition === "right") && labelElement}
    </div>
  );
};

export default InputField;
