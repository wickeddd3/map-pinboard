import { useState } from "react";

export function useMapPins() {
  const API_KEY = import.meta.env.VITE_GOOGLE_MAP_API_KEY;
  const MAP_ID = import.meta.env.VITE_GOOGLE_MAP_ID;
  const position = { lat: -37.8323, lng: 144.948823 };
  const zoom = 13;
  const defaultStyle = { width: "100vw", height: "100vh" };

  const [pinList, setPinList] = useState([
    {
      id: "1",
      name: "Pin #1",
      location: `State Route 55 Melbourne VIC 3004, Australia`,
      position: {
        lat: -37.806702,
        lng: 144.955737,
      },
      icon: `./truck-icon-1.svg`,
      color: "indigo",
    },
    {
      id: "2",
      name: "Pin #2",
      location: `620 Victoria St Richmond VIC 3121, Australia`,
      position: {
        lat: -37.811866,
        lng: 145.012831,
      },
      icon: `./truck-icon-2.svg`,
      color: "pink",
    },
    {
      id: "3",
      name: "Pin #3",
      location: `50-49 Beacon Rd Port Melbourne VIC 3207, Australia`,
      position: {
        lat: -37.836615,
        lng: 144.928469,
      },
      icon: `./truck-icon-3.svg`,
      color: "green",
    },
    {
      id: "4",
      name: "Pin #4",
      location: `Kings Way Southbank VIC 3006, Australia`,
      position: {
        lat: -37.827063,
        lng: 144.964225,
      },
      icon: `./truck-icon-4.svg`,
      color: "yellow",
    },
    {
      id: "5",
      name: "Pin #5",
      location: `Maidstone Victoria 3012, Australia`,
      position: {
        lat: -37.784271,
        lng: 144.873099,
      },
      icon: `./truck-icon-5.svg`,
      color: "cyan",
    },
    {
      id: "6",
      name: "Pin #6",
      location: `Malvern Victoria 3144, Australia`,
      position: {
        lat: -37.853129,
        lng: 145.041458,
      },
      icon: `./truck-icon-6.svg`,
      color: "purple",
    },
  ]);

  const removePin = (id: string) => {
    setPinList((prev) => prev.filter((pin) => pin.id !== id));
  };

  return {
    API_KEY,
    MAP_ID,
    position,
    zoom,
    defaultStyle,
    pinList,
    removePin,
  };
}
