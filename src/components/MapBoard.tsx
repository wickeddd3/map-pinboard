import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import type { Coordinates, Pin } from "../types/pin";
import { Accordion, AccordionItem } from "./Accordion";
import { Calendar, MapPin, Smartphone } from "lucide-react";

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

        <div className="absolute w-96 h-9/10 top-18 left-6 bg-white shadow-lg z-10 rounded-lg">
          <h1 className="p-4  border-b border-gray-200 text-xl font-medium">
            Pin Lists
          </h1>
          <Accordion type="single" className="divide-y-0 divide-gray-200 px-4">
            {pins.map((pin) => (
              <AccordionItem
                key={pin.id}
                id={pin.id}
                header={pin.name}
                color={pin.color}
                position={pin.position}
              >
                <div className="flex flex-col items-start gap-3">
                  {/* Current Location */}
                  <div className="flex items-start gap-3">
                    <MapPin size={20} className="text-gray-400 mt-2" />
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900">
                        Current location
                      </span>
                      <span className="text-gray-500">{pin.location}</span>
                    </div>
                  </div>
                  {/* Recent update */}
                  <div className="flex items-start gap-3">
                    <Calendar size={20} className="text-gray-400 mt-2" />
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900">
                        Recent update date
                      </span>
                      <span className="text-gray-500"> Nov 17, 2025</span>
                    </div>
                  </div>
                  {/* Connected devices */}
                  <div className="flex items-start gap-3">
                    <Smartphone size={20} className="text-gray-400 mt-2" />
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900">
                        Connected devices
                      </span>
                      <span className="text-gray-500">
                        Great place for dinner meetings
                      </span>
                    </div>
                  </div>
                </div>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </APIProvider>
  );
};
