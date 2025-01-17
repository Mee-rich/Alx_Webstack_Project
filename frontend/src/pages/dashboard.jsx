import { useState, useEffect } from "react";
import UserProfileCard from "../components/userProfile";
import { useToken } from "../components/tokenProvider";
import axiosClient from "../components/AxiosClient";

export const Dashboard = () => {
  const [user, setUser] = useState(null); // Stores user data
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const { fetchToken } = useToken(); 

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = fetchToken();

        if (!token) {
          setError("Invalid token");
          return;
        }

        const response = await axiosClient.get("/users/me", {
          headers: {
            "Content-Type": "application/json",
            // "X-token": token,
            // 'X-token': localStorage.getItem('ExperoAuth')
          },
        });

        if (response) {
          setUser(response.data.user[0]); 
          setSuccessMessage("User data loaded successfully!");
        } else {
          setError("No user data in storage");
        }
      } catch (err) {
        console.error("Unauthorized:", err);
        setError("Failed to load user data. Please try again.");
      }
    };

    fetchUserData();
  }, [fetchToken]); // Effect dependency: re-run if fetchToken changes

  return (
    <div>
      <h1>Dashboard</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

      {user ? (
        <UserProfileCard user={user} /> // Render user profile if data is available
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};
