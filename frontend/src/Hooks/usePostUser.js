import { useState } from "react";
import { API_BASE_URL } from "../config";

const usePostUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const postUser = async (name, email, password, role) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/Users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, role }),
      });

      if (!response.ok) {
        throw new Error("Failed to create user");
      }

      // User successfully created
      setIsLoading(false);
      // You can handle the response data if needed
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      setIsLoading(false);
      alert("Email Id already Exist");
      window.location.reload();
      setError("Email Id Exists");
    }
  };

  return { postUser, isLoading, error };
};

export default usePostUser;
