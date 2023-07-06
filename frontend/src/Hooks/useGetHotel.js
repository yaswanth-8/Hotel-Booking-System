import { useEffect, useState } from "react";
import axios from "axios";

const useGetHotel = (id) => {
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHotelData();
    // eslint-disable-next-line
  }, [id]);
  const fetchHotelData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5225/api/hotels/${id}`
      );
      setHotel(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return { hotel, loading, error, fetchHotelData };
};

export default useGetHotel;
