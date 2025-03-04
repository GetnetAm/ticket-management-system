import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const UserContext = createContext(); // Corrected capitalization for better readability

const AuthContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.get(
            "http://localhost:5000/api/auth/verify",
            {
              headers: {
                Authorization: `Bearer${token}`,
              },
            }
          );

          if (response.data.success) {
            setUser(response.data.user);
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        if (error.response && !error.response.data.error) {
          setUser(null);
        }
      } finally {
        setLoading(false);
      }
    };
    verifyUser();
  }, []);

  const login = (user) => {
    setUser(user); // Set the user state to the provided user data
    // localStorage.setItem("token", userData.token); // Example: storing a token
  };

  const logout = () => {
    setUser(null); // Clear the user state
    localStorage.removeItem("token"); // Remove token from localStorage
  };

  return (
    <UserContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};

AuthContext.propTypes = {
  children: PropTypes.node.isRequired, // Ensures children is passed and is a valid React node
};

export const useAuth = () => useContext(UserContext);

export default AuthContext;
