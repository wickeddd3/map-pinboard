import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import type { Coordinates, Pin } from "../types/pin";
import { MapPins } from "./MapPins";
import { useState } from "react";
import { formatCoordinates } from "../utils/format";
import { MapPin } from "lucide-react";

export interface MapBoardProps {
  apiKey: string;
  mapId: string;
  position: Coordinates;
  zoom: number;
  defaultStyle?: React.CSSProperties;
  pins?: Pin[];
}

export const MapBoard = ({
  apiKey,
  mapId,
  position,
  zoom,
  defaultStyle,
  pins = [],
}: MapBoardProps) => {
  const [selectedPin, setSelectedPin] = useState<Pin | null>(null);

  return (
    <APIProvider apiKey={apiKey} libraries={["places"]}>
      <div className="w-full h-full">
        <Map
          style={defaultStyle}
          defaultCenter={position}
          zoom={zoom}
          mapId={mapId}
          gestureHandling="greedy"
          disableDefaultUI
        />

        {pins &&
          pins.map((pin) => (
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

        <MapPins pins={pins} onSelectPin={setSelectedPin} />
      </div>
    </APIProvider>
  );
};
