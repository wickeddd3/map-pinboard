import { Map } from "lucide-react";
import { MapBoard } from "./components/MapBoard";
import { useMapPins } from "./hooks/useMapPins";

export const App = () => {
  const { API_KEY, MAP_ID, position, zoom, defaultStyle, pinList } =
    useMapPins();

  return (
    <div className="w-full h-full">
      <nav className="w-full flex justify-center items-center p-3 gap-2 absolute top-0 z-10 bg-white  shadow-md">
        <Map />
        <h1 className="text-lg font-medium">Map Pinboard</h1>
      </nav>
      <MapBoard
        apiKey={API_KEY}
        mapId={MAP_ID}
        position={position}
        zoom={zoom}
        defaultStyle={defaultStyle}
        pins={pinList}
      />
    </div>
  );
};
