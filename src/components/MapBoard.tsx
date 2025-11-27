import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import type { Pin } from "../types/pin";
import { MapPins } from "./MapPins";
import { useState } from "react";
import { formatCoordinates } from "../utils/format";
import { MapPin } from "lucide-react";
import { useMapPins } from "../hooks/useMapPins";

export const MapBoard = () => {
  const { API_KEY, MAP_ID, position, zoom, defaultStyle, pinList } =
    useMapPins();
  const [selectedPin, setSelectedPin] = useState<Pin | null>(null);

  return (
    <APIProvider apiKey={API_KEY} libraries={["places"]}>
      <div className="w-full h-full">
        <Map
          style={defaultStyle}
          defaultCenter={position}
          zoom={zoom}
          mapId={MAP_ID}
          gestureHandling="greedy"
          disableDefaultUI
        />

        {pinList &&
          pinList.map((pin) => (
            <AdvancedMarker
              key={pin.id}
              position={pin.position}
              title={pin.name}
              onClick={() => setSelectedPin(pin)}
            >
              <img src={pin.icon} width={100} height={100} />
            </AdvancedMarker>
          ))}

        {selectedPin && (
          <InfoWindow
            headerDisabled
            position={selectedPin.position}
            onCloseClick={() => setSelectedPin(null)}
          >
            <div className="flex flex-col gap-1">
              <h2 className="text-lg font-medium">{selectedPin.name}</h2>
              <div className="flex gap-1">
                <MapPin size={14} className="text-gray-500" />
                <span className="text-xs text-gray-600">
                  {formatCoordinates(selectedPin.position)}
                </span>
              </div>
            </div>
          </InfoWindow>
        )}

        <MapPins onSelectPin={setSelectedPin} />
      </div>
    </APIProvider>
  );
};
