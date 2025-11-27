type Position = { lat: number; lng: number };

export const formatCoordinates = (position: Position): string => {
  const { lat, lng } = position;

  const latDirection = lat < 0 ? "S" : "N";
  const lngDirection = lng < 0 ? "W" : "E";

  const latAbs = Math.abs(lat).toFixed(4);
  const lngAbs = Math.abs(lng).toFixed(4);

  return `${latAbs}° ${latDirection}, ${lngAbs}° ${lngDirection}`;
};
