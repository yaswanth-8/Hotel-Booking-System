import { useEffect } from "react";
import { API_BASE_URL } from "../config";

const useGetPendingCount = () => {
  useEffect(() => {
    const fetchPendingCount = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/pending`);
        const data = await response.json();
        console.log("Pending count:", data);
      } catch (error) {
        console.error("Error fetching pending count:", error);
      }
    };

    fetchPendingCount();
  }, []);
};

export default useGetPendingCount;
