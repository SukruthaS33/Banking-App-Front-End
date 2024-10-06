import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./RegisterStyle.css"; // Import your CSS file

const Register = () => {
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPassword: "",
    age: "",
    customerPhoneNumber: {
      extension: "+91",
      phonenumber: "",
      phoneType: "MOBILE",
    },
    customerAddress: {
      houseNumber: "",
      street: "",
      locality: "",
      city: "",
      zipcode: "",
    },
  });

  const [registerState, setRegisterState] = useState({
    registerStatus: false,
    isMessagePopupOpen: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePhoneNumberChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      customerPhoneNumber: {
        ...formData.customerPhoneNumber,
        [name]: value,
      },
    });
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      customerAddress: {
        ...formData.customerAddress,
        [name]: value,
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //can add verifications here or call a funciton that does verifications
    console.log(formData);
    axios
      .post(
        "http://localhost:8081/bankingapp/api/v1/customer/register",
        formData
      )
      .then((response) => {
        console.log("Registration successful:", response.data);
        setRegisterState({
          registerStatus: true,
          isMessagePopupOpen: true,
        });

        // Navigate to the login page after a short delay
        setTimeout(() => {
          navigate("/login");
        }, 3000); // Redirects after 3 seconds
      })
      .catch((error) => {
        console.error("There was an error registering the customer:", error);
        alert("Error registering customer");
      });
  };

  return (
    <div className="container">
      <div
        className={` ${
          registerState.isMessagePopupOpen ? "blur-background" : ""
        }`}
      >
        <h2>Customer Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-sections">
            {/* Form fields go here */}
            <div>
              <div className="form-group">
                <label htmlFor="customerName">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="customerName"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="customerEmail">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="customerEmail"
                  name="customerEmail"
                  value={formData.customerEmail}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="customerPassword">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="customerPassword"
                  name="customerPassword"
                  value={formData.customerPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="age">Age</label>
                <input
                  type="number"
                  className="form-control"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phonenumber">Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  id="phonenumber"
                  name="phonenumber"
                  value={formData.customerPhoneNumber.phonenumber}
                  onChange={handlePhoneNumberChange}
                  required
                />
              </div>
            </div>
            <div>
              <div className="form-group">
                <label htmlFor="houseNumber">House Number</label>
                <input
                  type="text"
                  className="form-control"
                  id="houseNumber"
                  name="houseNumber"
                  value={formData.customerAddress.houseNumber}
                  onChange={handleAddressChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="locality">Locality</label>
                <input
                  type="text"
                  className="form-control"
                  id="locality"
                  name="locality"
                  value={formData.customerAddress.locality}
                  onChange={handleAddressChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="street">Street</label>
                <input
                  type="text"
                  className="form-control"
                  id="street"
                  name="street"
                  value={formData.customerAddress.street}
                  onChange={handleAddressChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  name="city"
                  value={formData.customerAddress.city}
                  onChange={handleAddressChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="zipcode">Zipcode</label>
                <input
                  type="text"
                  className="form-control"
                  id="zipcode"
                  name="zipcode"
                  value={formData.customerAddress.zipcode}
                  onChange={handleAddressChange}
                  required
                />
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            Register
          </button>
        </form>
      </div>
      {registerState.isMessagePopupOpen && (
        <div className="popup-container">
          <div className="popup-message">
            {registerState.registerStatus
              ? "You are successfully registered! Redirecting to login..."
              : "Encountered an error during registration."}
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
