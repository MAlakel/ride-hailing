import React, { useState, useEffect } from "react";
import { Offer } from "./offer.interface";
import "./App.css";

function RideOffers() {
  const [rideOffers, setRideOffers] = useState<Offer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch ride offers from the API upon initial load
    fetch("http://localhost:3001/offers")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch ride offers");
        }
        return response.json();
      })
      .then((data) => {
        setRideOffers(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <h1 className="title">Ride Offers</h1>
      {isLoading && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}
      {rideOffers.length === 0 && (
        <div className="no-offers">No ride offers available</div>
      )}
      {rideOffers && (
        <div className="offer-list">
          {rideOffers.map((offer, index) => (
            <div key={index} className="offer-card">
              <div className="header">
                <h3 className="provider">{offer.provider}</h3>
                <p className="price">
                  {offer.fare_estimate.currency_symbol}
                  {offer.fare_estimate.amount}
                </p>
              </div>
              <div className="details">
                <p className="car-details">
                  {offer.driver.vehicle.color} {offer.driver.vehicle.make}{" "}
                  {offer.driver.vehicle.model}
                </p>
                <p className="car-details">
                  License Plate: {offer.driver.vehicle.license_plate}
                </p>
                <p className="driver-details">Driver: {offer.driver.name}</p>
                <p className="driver-details">Rating: {offer.driver.rating}</p>
                <p className="duration">
                  Duration:{" "}
                  {calculateDuration(
                    offer.estimated_pickup_time,
                    offer.estimated_arrival_time
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function calculateDuration(startTime: string, endTime: string) {
  const start = new Date(startTime);
  const end = new Date(endTime);
  const duration = Math.abs(end.getTime() - start.getTime()) / 1000; // Duration in seconds
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  return `${hours}h ${minutes}m`;
}

export default RideOffers;
