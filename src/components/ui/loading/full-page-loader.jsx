export default function FullPageLoader({message = "Loading...", size = 64,}) {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-50 z-50">
      <div
        className="border-4 border-t-krowten-green border-gray-200 rounded-full animate-spin"
        style={{width: size, height: size}}
      />
      {message && <p className="mt-4 text-gray-700 font-medium">{message}</p>}
    </div>
  );
};

