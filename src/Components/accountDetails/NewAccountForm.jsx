import React, { useState, useEffect } from "react";
import "./NewAccountForm.css"; // Import the CSS for styling
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const NewAccountForm = () => {
  const [accountType, setAccountType] = useState("");
  const [branchDetails, setBranchDetails] = useState([]); // Initialize as an empty array
  const { customerId, customerName } = useParams();
  const [branchId, setBranchId] = useState("");
  const [hasMaxAccount, setHasMaxAccount] = useState(false);

  // Use useEffect with an empty dependency array to fetch branch details on mount
  useEffect(() => {
    fetchBranches();
  }, []); // Empty dependency array ensures this runs only once

  const redirectToAccountPage = useNavigate();
  // Function to fetch branch details
  const fetchBranches = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8081/bankingapp/api/v1/bank/`
      );
      console.log(response.data.branches);
      setBranchDetails(response.data.branches); // Update state with fetched branch data
    } catch (error) {
      console.error("Error fetching branch details:", error);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("inside handleSubmit");
      const response = await axios.post(
        `http://localhost:8081/bankingapp/api/v1/accounts/${encodeURIComponent(
          customerId
        )}?accountType=${encodeURIComponent(accountType)}&branchId=${branchId}`
      );
      console.log(response.data);
      if (response.data === "") {
        setHasMaxAccount(true);
        console.log("ready own max");
      }
      //redirectToAccountPage(`/account/${response.data}`);
      // You can refresh the accounts list or show a success message here
    } catch (error) {
      console.error("Error in creating account", error);
    }
  };

  return (
    <div className="new-account-form">
      <h2>Create New Account for {customerName}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="accountType">Select Account Type:</label>
          <select
            id="accountType"
            value={accountType}
            onChange={(e) => setAccountType(e.target.value)}
            required
          >
            <option value="">--Select Account Type--</option>
            <option value="savings">Savings Account</option>
            <option value="fixed">Fixed Deposit Account</option>
            <option value="current">Current Account</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="branch">Select Branch:</label>
          <select
            id="branch"
            value={branchId}
            onChange={(e) => setBranchId(e.target.value)}
            required
          >
            <option value="">--Select Branch--</option>
            {branchDetails.map((branch) => (
              <option key={branch.branchId} value={branch.branchId}>
                {branch.branchName}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="create-account-button">
          Create Account
        </button>
      </form>

      {hasMaxAccount ? (
        <div>
          <p>You already own maximum accounts</p>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default NewAccountForm;
