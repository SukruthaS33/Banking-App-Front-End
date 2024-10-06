// Login.js
import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPassword, setCustomerPassword] = useState("");
  const [loginCredentials, setLoginCredentials] = useState({
    customerEmail: "",
    customerPassword: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoginCredentials({
      customerEmail: customerEmail,
      customerPassword: customerPassword,
    });

    console.log(loginCredentials);

    axios
      .post(
        `http://localhost:8081/bankingapp/api/v1/customer/login?customerEmail=${encodeURIComponent(
          customerEmail
        )}&customerPassword=${encodeURIComponent(customerPassword)}`
      )
      .then((response) => {
        console.log("Registration successful:", response.data);
        //alert("Customer logged in Successfully!");
        console.log(response.data.customerId);

        if (response.data.roles[0].roleName === "ADMIN") {
          console.log(response.data.roles[0].roleName);
          console.log("navigate to admin");
          navigate(`/admin/customers`);
        } else {
          navigate(`/customer/${response.data.customerId}`);
        }
      })
      .catch((error) => {
        console.error("There was an error registering the customer:", error);
        alert("Error logging customer");
      });
  };
  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="input-group">
          <label htmlFor="customerEmail">Username</label>
          <input
            type="text"
            id="username"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="customerPassword">Password</label>
          <input
            type="password"
            id="password"
            value={customerPassword}
            onChange={(e) => setCustomerPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
