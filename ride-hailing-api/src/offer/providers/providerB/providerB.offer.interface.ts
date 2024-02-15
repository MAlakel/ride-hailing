export interface ProviderBOffer {
  offer_id: string;
  company: string;
  vehicle: {
    type: string;
    model: string;
    make: string;
    color: string;
    license_plate: string;
  };
  driver: {
    name: string;
    rating: number;
    phone: string;
  };
  pickup: {
    location: string;
    latitude: number;
    longitude: number;
    estimated_pickup: string;
  };
  destination: {
    location: string;
    latitude: number;
    longitude: number;
    estimated_arrival: string;
  };
  fare: {
    currency: string;
    lowPrice: number;
    highPrice: number;
    currency_symbol: string;
  };
}