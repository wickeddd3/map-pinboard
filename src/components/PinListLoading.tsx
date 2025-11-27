import { Loader } from "lucide-react";

export const PinListLoading = () => {
  return (
    <div className="w-full flex flex-col justify-start items-center gap-4 pt-28">
      <Loader className="text-blue-600 animate-spin" size={28} />
      <h2 className="text-lg font-medium text-gray-700">Just a moment...</h2>
    </div>
  );
};
