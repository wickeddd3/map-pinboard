import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import type { Coordinates, Pin } from "../types/pin";
import { MapPins } from "./MapPins";

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
          pins.map(({ id, name, position, icon }) => (
            <AdvancedMarker key={id} position={position} title={name}>
              <img src={icon} width={100} height={100} />
            </AdvancedMarker>
          ))}

        <MapPins pins={pins} />
      </div>
    </APIProvider>
  );
};
