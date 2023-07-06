import { useEffect } from "react";

const useGetPendingCount = () => {
  useEffect(() => {
    const fetchPendingCount = async () => {
      try {
        const response = await fetch("http://localhost:5225/api/pending");
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
