import {cn} from "../../../utils/cn.ts";

interface LoadingOverlayProps {
  visible: boolean;
  message?: string;
  blur?: boolean;
}

export default function LoadingOverlay({
                                         visible,
                                         message = "Loading...",
                                         blur = true,
                                       }: LoadingOverlayProps) {
  if (!visible) return null;

  return (
    <div
      className={cn(
        "absolute inset-0 z-[9000] flex items-center justify-center rounded-md",
        blur && "backdrop-blur-[2px]"
      )}
      style={{
        background:
          "radial-gradient(circle, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.05) 50%, rgba(0,0,0,0) 100%)",
      }}
    >
      <div className="flex flex-col items-center space-y-4">
        {/* Spinner */}
        <div className="w-16 h-16 border-4 border-t-krowten-green border-white rounded-full animate-spin"></div>
        <span className="text-white text-lg font-semibold font-work-sans text-outline-black-30">
          {message}
        </span>
      </div>
    </div>
  );
}
