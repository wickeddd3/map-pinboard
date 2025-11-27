import { useEffect, useState } from "react";
import type { Pin } from "../types/pin";
import { pinListData } from "../data/pinlist-data";

export function useMapPins() {
  const API_KEY = import.meta.env.VITE_GOOGLE_MAP_API_KEY;
  const MAP_ID = import.meta.env.VITE_GOOGLE_MAP_ID;
  const position = { lat: -37.8323, lng: 144.948823 };
  const zoom = 13;
  const defaultStyle = { width: "100vw", height: "100vh" };

  const [loading, setLoading] = useState(true);
  const [pinList, setPinList] = useState<Pin[]>([]);

  const removePin = (id: string) => {
    setPinList((prev) => prev?.filter((pin) => pin.id !== id));
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setPinList(pinListData);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(handler);
  }, []);

  return {
    API_KEY,
    MAP_ID,
    position,
    zoom,
    defaultStyle,
    pinList,
    loading,
    removePin,
  };
}
