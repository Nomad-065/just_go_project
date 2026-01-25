import {Button, type ButtonProps, type SxProps, type Theme} from "@mui/material";
import {cn} from "../../../utils/cn";
import type {ElementType, ReactNode} from "react";

interface PrimaryButtonProps extends ButtonProps {
  children: ReactNode;
  className?: string;
  slim?: boolean;
  sx?: SxProps<Theme>;
  icon?: ElementType;
  animationClassName?: string;
}

const PrimaryButton = ({
                         children,
                         className = "",
                         slim = false,
                         sx = {},
                         icon: Icon,
                         animationClassName,
                         ...rest
                       }: PrimaryButtonProps) => {

  const sizeStyles = slim
    ? {
      minHeight: 0,
      paddingTop: "0.2125rem",
      paddingBottom: "0.2125rem",
      paddingLeft: "1rem",
      paddingRight: "1rem",
    }
    : {}

  return (
    <Button
      variant="contained"
      color="primary"
      className={cn(
        "border border-justgo-green text-justgo-green font-semibold truncate",
        "hover:brightness-125 hover:text-white transition-all hover:drop-shadow-md",
        "group relative overflow-hidden flex items-center justify-center gap-2 rounded-md",
        className
      )}
      sx={{
        textTransform: "none",  // <-- keep text case as-is
        "&.Mui-disabled": {
          cursor: "not-allowed",
          pointerEvents: "all",
        },
        ...sizeStyles,
        ...sx
      }}
      {...rest}
    >
        <span className={cn(
          "truncate whitespace-nowrap min-w-0 w-full",
          Icon
            ? "group-hover:-translate-x-4 transition-transform duration-300 "
            : ""
        )}
        >
        {children}
      </span>

      {/* Icon */}
      {Icon && (
        <span
          className={cn(
            "absolute transition-all duration-300",
            "right-2 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0",
            animationClassName
          )}
        >
          <Icon className="w-4 h-4"/>
        </span>
      )}
    </Button>
  );
};

export default PrimaryButton;
