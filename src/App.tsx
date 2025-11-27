import { Map } from "lucide-react";
import { MapBoard } from "./components/MapBoard";

export const App = () => {
  const API_KEY = import.meta.env.VITE_GOOGLE_MAP_API_KEY;
  const MAP_ID = import.meta.env.VITE_GOOGLE_MAP_ID;
  const position = { lat: -37.8323, lng: 144.948823 };
  const zoom = 13;
  const defaultStyle = { width: "100vw", height: "100vh" };

  const pinList = [
    {
      id: "pin-1",
      name: "Pin #1",
      location: `State Route 55 Melbourne VIC 3004, Australia`,
      position: {
        lat: -37.806702,
        lng: 144.955737,
      },
      icon: `./truck-icon-1.svg`,
    },
    {
      id: "pin-2",
      name: "Pin #2",
      location: `620 Victoria St Richmond VIC 3121, Australia`,
      position: {
        lat: -37.811866,
        lng: 145.012831,
      },
      icon: `./truck-icon-2.svg`,
    },
    {
      id: "pin-3",
      name: "Pin #3",
      location: `50-49 Beacon Rd Port Melbourne VIC 3207, Australia`,
      position: {
        lat: -37.836615,
        lng: 144.928469,
      },
      icon: `./truck-icon-3.svg`,
    },
    {
      id: "pin-4",
      name: "Pin #4",
      location: `Kings Way Southbank VIC 3006, Australia`,
      position: {
        lat: -37.827063,
        lng: 144.964225,
      },
      icon: `./truck-icon-4.svg`,
    },
    {
      id: "pin-5",
      name: "Pin #5",
      location: `Maidstone Victoria 3012, Australia`,
      position: {
        lat: -37.784271,
        lng: 144.873099,
      },
      icon: `./truck-icon-5.svg`,
    },
    {
      id: "pin-6",
      name: "Pin #6",
      location: `Malvern Victoria 3144, Australia`,
      position: {
        lat: -37.853129,
        lng: 145.041458,
      },
      icon: `./truck-icon-6.svg`,
    },
  ];

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
        // origin={currentItinerary?.pickupLocation}
        // destination={currentItinerary?.dropoffLocation}
        // packages={currentOrder.packages}
      />
    </div>
  );
};
