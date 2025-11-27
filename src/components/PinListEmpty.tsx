import { Search } from "lucide-react";

export const PinListEmpty = () => {
  return (
    <div className="w-full flex flex-col justify-start items-center gap-4 pt-28">
      <Search className="text-gray-400" size={28} />
      <div className="flex flex-col justify-center items-center gap-1">
        <h2 className="text-lg font-medium text-gray-700">No result found</h2>
        <p className="text-gray-500 text-center px-6">
          Your map pin list will show in here.
        </p>
      </div>
    </div>
  );
};
