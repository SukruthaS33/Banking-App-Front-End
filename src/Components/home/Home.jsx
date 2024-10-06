import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Home() {
  // Create a state to store the customer name
  const [bankName, setBankName] = useState("");

  // Use useEffect to make the API request when the component loads
  useEffect(() => {
    // Make an API call to get customer data
    axios
      .get("http://localhost:8081/bankingapp/api/v1/bank/") // Replace with your actual API endpoint
      .then((response) => {
        // Assuming the response contains customer details and 'name' is a key
        console.log(response.data);
        setBankName(response.data.bankName); // Update the state with the customer name
      })
      .catch((error) => {
        console.error("There was an error fetching the bank data!", error);
      });
  }, []); // Empty array means this effect runs only once when the component mounts

  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };
  return (
    <div>
      <header className="App-header">
        <h1>Welcome to {bankName ? bankName : "Loading..."}</h1>
        {/* Bootstrap buttons */}
        <div className="mt-3">
          <button
            className="btn btn-success mr-2 buttons-login-register"
            onClick={handleRegisterClick}
          >
            Register
          </button>

          <button
            className="btn btn-primary buttons-login-register"
            onClick={handleLoginClick}
          >
            Login
          </button>
        </div>
      </header>
    </div>
  );
}
