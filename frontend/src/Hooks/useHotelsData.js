import { useState, useEffect } from "react";

export const useHotelsData = (setIsLoading) => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await fetch("http://localhost:5225/api/hotels");
        const hotelData = await response.json();
        setHotels(hotelData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching hotel data:", error);
      }
    };

    fetchHotels();
    // eslint-disable-next-line
  }, []);

  return hotels;
};
