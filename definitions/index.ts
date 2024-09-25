export interface Location {
  city: string;
  region: string;
  country: string;
  timezone: string;
  lat: number;
  lng: number;
}

export interface IPInfo {
  ip: string;
  location: Location;
  isp: string;
}
