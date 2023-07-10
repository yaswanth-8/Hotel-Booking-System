import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";

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
      const response = await axios.get(`${API_BASE_URL}/api/hotels/${id}`);
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
