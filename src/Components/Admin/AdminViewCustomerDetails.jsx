import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminViewCustomerDetailsStyle.css"; // Assuming you have a separate CSS file
import { useNavigate } from "react-router-dom";
import AdminNewRequests from "./AdminNewRequests";

export default function AdminViewCustomerDetails() {
  const [customers, setCustomerDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [customerId, setCustomerId] = useState("");
  // Initially, disable the button and only enable it when a customer ID is selected
  const [isRowClicked, setRowClicked] = useState(false);
  const [newRequestPopUpOpen, setNewRequestPopupoOpen] = useState(false);
  const [newRequests, setNewRequests] = useState([]);

  useEffect(() => {
    fetchAllCustomers();
  }, []);

  const fetchAllCustomers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8081/bankingapp/api/v1/admin/customers`
      );
      console.log(response.data);
      setCustomerDetails(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching account details:", error);
    }
  };

  useEffect(() => {
    fetchNewRequests();
  }, []);

  const fetchNewRequests = async () => {
    console.log("inside fetchNewRequests");
    try {
      const response = await axios.get(
        `http://localhost:8081/bankingapp/api/v1/admin/customerNewAccountRequests`
      );
      console.log(response.data.length);
      setNewRequests(response.data);
      if (response.data.length != 0) {
        openCustomerNewRequestsPresentPopup();
      }
    } catch (error) {
      console.error("Error fetching account details:", error);
    }
  };

  const navigate = useNavigate();

  const fetchCustomerDetails = async () => {
    navigate(`/admin/${customerId}`);
  };

  const tableRowClick = (customerId) => {
    console.log("row clicked " + customerId);

    setCustomerId(customerId);
    setRowClicked(true);
    // Enable the button only when a valid customer ID is selected
  };

  const openCustomerNewRequestsPresentPopup = () => {
    console.log("popup is opened or not");
    setNewRequestPopupoOpen(true);
  };

  return (
    <div>
      {!loading ? (
        <div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Customer Name</th>
                  <th>Customer Email</th>
                  <th>Customer Contact</th>
                </tr>
              </thead>
              <tbody>
                {customers.length > 0 ? (
                  customers.map((item) => (
                    <tr
                      key={item.customerId}
                      onClick={() => tableRowClick(item.customerId)}
                      className={
                        isRowClicked && customerId === item.customerId
                          ? "tr-row-clicked"
                          : ""
                      }
                    >
                      <td>{item.customerName}</td>
                      <td>{item.customerEmail}</td>
                      <td>{item.customerContact}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">No customers available.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {isRowClicked ? (
            <button
              className="view-customer-details"
              onClick={fetchCustomerDetails}
            >
              View Details
            </button>
          ) : (
            <div></div>
          )}
        </div>
      ) : (
        <div>Loading...</div>
      )}
      <div>
        <AdminNewRequests newRequests={newRequests} />
        {newRequestPopUpOpen ? (
          <div className="popup">
            <p>You have some new requests</p>
            <button>Take me there</button>
            <button>I will check later</button>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
