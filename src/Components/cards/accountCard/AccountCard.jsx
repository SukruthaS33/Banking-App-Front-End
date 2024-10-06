import React from "react";
import "./AccountCardStyle.css";
import { useNavigate } from "react-router-dom";

const AccountCard = ({ accountNumber, accountType, balance }) => {
  const navigate = useNavigate();

  const handleViewAccount = () => {
    // Navigate to a new page and pass the account number as a parameter
    navigate(`/account/${accountNumber}`);
  };

  return (
    <div className="account-card">
      <div className="account-info">
        <h3>Account Number: {accountNumber}</h3>
        <p>Account Type: {accountType ? accountType : "Not Available"}</p>
        <p>Balance: ${balance}</p>
      </div>
      <button className="view-account-btn" onClick={handleViewAccount}>
        View Account
      </button>
    </div>
  );
};

export default AccountCard;
