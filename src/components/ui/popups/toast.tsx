import {Snackbar, Alert, type SnackbarOrigin, type AlertColor} from "@mui/material";
import type {SyntheticEvent} from "react";


type ToastProps = {
  open: boolean;
  message: string;
  severity?: AlertColor; // "success" | "error" | "warning" | "info"
  autoHideDuration?: number;
  onClose?: () => void;
  anchorOrigin?: SnackbarOrigin;
  zIndex?: number;
};

const Toast = ({
                 open,
                 message,
                 severity = "info", // "success" | "error" | "warning" | "info"
                 autoHideDuration = 3000,
                 onClose,
                 anchorOrigin = {vertical: "top", horizontal: "right"},
                 zIndex = 9999,
               }: ToastProps) => {
  const handleSnackbarClose = (_event: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    onClose?.();
  };

  const handleAlertClose = () => {
    onClose?.();
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={handleSnackbarClose}
      anchorOrigin={anchorOrigin}
      sx={{zIndex}}
    >
      <Alert
        onClose={handleAlertClose}
        severity={severity}
        elevation={6}
        variant="filled"
        sx={{color: 'white'}}
      >
        <span className={'text-white'}>{message}</span>
      </Alert>
    </Snackbar>
  );
};

export default Toast;
