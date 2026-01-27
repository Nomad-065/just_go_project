import {Tooltip, Button, type ButtonProps, type TooltipProps, type SvgIconProps} from "@mui/material";
import {cn} from "../../../utils/cn";
import type {ComponentType} from "react";

interface ActionButtonProps extends ButtonProps {
  helperText: string;
  icon?: ComponentType<SvgIconProps>;
  tooltipPlacement?: TooltipProps["placement"];
  className?: string;
  sx?: ButtonProps["sx"];
}

const ActionButton = ({
                        helperText,
                        icon: Icon,
                        onClick,
                        tooltipPlacement = "top",
                        className,
                        sx = {},
                        ...rest
                      }: ActionButtonProps) => {
  return (
    <Tooltip title={helperText} arrow placement={tooltipPlacement}>
      <Button
        size="small"
        onClick={onClick}
        className={cn(
          "border transition-all duration-300 font-semibold",
          "group relative overflow-hidden flex items-center justify-center gap-2 rounded-md",
          "hover:bg-justgo-green hover:text-white border-justgo-green text-justgo-green hover:border-black",
          className
        )}
        sx={{
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: "currentColor",
          minWidth: 32,
          padding: "4px 6px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          "&.Mui-disabled": {
            cursor: "not-allowed",
            pointerEvents: "all",
          },
          ...sx,
        }}
        {...rest}
      >
        {Icon && <Icon fontSize="small"/>}
      </Button>
    </Tooltip>
  );
};

export default ActionButton;
