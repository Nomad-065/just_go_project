import {Button, type ButtonProps, type SxProps, type Theme} from "@mui/material";
import {cn} from "../../../utils/cn";
import type {ElementType, ReactNode} from "react";


interface GhostButtonProps extends ButtonProps {
  children: ReactNode;
  className?: string;
  slim?: boolean;
  sx?: SxProps<Theme>;
  icon?: ElementType;
  animationClassName?: string;
}

const GhostButton = ({
                       children,
                       className = "",
                       slim = false, // "regular" or "slim"
                       sx = {},
                       icon: Icon,
                       animationClassName,
                       ...rest
                     }: GhostButtonProps) => {

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
      // variant='contained'
      className={cn(
        "text-justgo-green dark:text-gray-300 font-semibold",
        "hover:bg-justgo-green/10 dark:hover:bg-justgo-green/40 transition-all truncate",
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
        "truncate whitespace-nowrap min-w-0 w-full ",
        Icon
          ? "group-hover:-translate-x-4 transition-transform duration-300"
          : "",
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

export default GhostButton;
