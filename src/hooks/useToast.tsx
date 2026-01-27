import {useState, useCallback} from "react";
import Toast from "../components/ui/popups/toast";
import type {AlertColor, SnackbarOrigin} from "@mui/material";

type ShowToastOptions = {
  autoHideDuration?: number;
  anchorOrigin?: SnackbarOrigin;
};

export const useToast = () => {
  const [toastOpen, setToastOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastSeverity, setToastSeverity] = useState<AlertColor>("info");
  const [toastAutoHideDuration, setToastAutoHideDuration] = useState<number>(3000);
  const [toastAnchorOrigin, setToastAnchorOrigin] = useState<SnackbarOrigin>({
    vertical: "top",
    horizontal: "right",
  });

  const showToast = useCallback((
    message: string,
    severity: AlertColor = "info",
    options?: ShowToastOptions,
  ) => {
    setToastMessage(message);
    setToastSeverity(severity);
    setToastAutoHideDuration(options?.autoHideDuration || 3000);
    setToastAnchorOrigin(options?.anchorOrigin || {vertical: "top", horizontal: "right"});
    setToastOpen(true);
  }, []);

  // Expose a manual close function
  const closeToast = useCallback(() => {
    setToastOpen(false);
  }, []);

  const ToastComponent = (
    <Toast
      open={toastOpen}
      message={toastMessage}
      severity={toastSeverity}
      autoHideDuration={toastAutoHideDuration}
      anchorOrigin={toastAnchorOrigin}
      onClose={closeToast}
    />
  );

  return {showToast, closeToast, ToastComponent};
};
