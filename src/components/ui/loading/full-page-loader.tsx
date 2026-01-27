type FullPageLoaderProps = {
  message?: string;
  size?: number;
}

export default function FullPageLoader({
                                         message = "Loading...",
                                         size = 64,
                                       }: FullPageLoaderProps) {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-50 z-50">
      <div
        className="border-4 border-t-justgo-green border-gray-200 rounded-full animate-spin"
        style={{width: size, height: size}}
      />
      {message && <p className="mt-4 text-gray-700 font-medium">{message}</p>}
    </div>
  );
}