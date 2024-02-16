export interface Offer {
  offer_id: string;
  provider: string;
  vehicle: string;
  estimated_pickup_time: string;
  estimated_arrival_time: string;
  fare_estimate: {
    currency: string;
    amount: number;
    currency_symbol: string;
  };
  driver: {
    name: string;
    rating: number;
    vehicle: {
      make: string;
      model: string;
      color: string;
      license_plate: string;
    };
  };
  pickup: {
    latitude: number;
    longitude: number;
    address: string;
  };
  destination: {
    latitude: number;
    longitude: number;
    address: string;
  };
}