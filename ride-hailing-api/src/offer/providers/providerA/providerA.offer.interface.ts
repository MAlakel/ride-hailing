export interface ProviderAOffer {
  offer_id: string;
  provider: string;
  vehicle_type: string;
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
    vehicle_details: {
      make: string;
      model: string;
      color: string;
      license_plate: string;
    };
  };
  pickup_location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  destination_location: {
    latitude: number;
    longitude: number;
    address: string;
  };
}