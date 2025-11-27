import { useMapPins } from "../hooks/useMapPins";
import type { Pin } from "../types/pin";
import { Accordion, AccordionItem } from "./Accordion";
import { Calendar, MapPin, Smartphone, type LucideIcon } from "lucide-react";

export interface MapPinDetailItemProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
}

export const MapPinDetailItem = ({
  icon: Icon,
  title,
  subtitle,
}: MapPinDetailItemProps) => {
  return (
    <div className="flex items-start gap-3">
      <Icon className="text-gray-400 mt-2" />
      <div className="flex flex-col">
        <span className="font-medium text-gray-900">{title}</span>
        <span className="text-gray-500">{subtitle}</span>
      </div>
    </div>
  );
};

export interface MapPinsProps {
  onSelectPin?: (pin: Pin) => void;
}

export const MapPins = ({ onSelectPin }: MapPinsProps) => {
  const { pinList, removePin } = useMapPins();

  return (
    <div className="absolute w-96 h-9/10 top-18 left-6 bg-white shadow-lg z-10 rounded-lg">
      <h1 className="p-4  border-b border-gray-200 text-xl font-medium">
        Pin Lists
      </h1>
      <Accordion type="single" className="divide-y-0 divide-gray-200 px-4">
        {pinList.map((pin) => (
          <AccordionItem
            key={pin.id}
            id={pin.id}
            header={pin.name}
            color={pin.color}
            position={pin.position}
            onClick={() => onSelectPin?.(pin)}
            onRemove={() => removePin(pin.id)}
          >
            <div className="flex flex-col items-start gap-3">
              {/* Current Location */}
              <MapPinDetailItem
                icon={MapPin}
                title="Current location"
                subtitle={pin.location}
              />
              {/* Recent update */}
              <MapPinDetailItem
                icon={Calendar}
                title="Recent update date"
                subtitle="Nov 17, 2025"
              />
              {/* Connected devices */}
              <MapPinDetailItem
                icon={Smartphone}
                title="Connected devices"
                subtitle="Great place for dinner meetings"
              />{" "}
            </div>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
