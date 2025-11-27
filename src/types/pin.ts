export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Pin {
  id: string;
  name: string;
  location: string;
  position: Coordinates;
  icon: string;
}
