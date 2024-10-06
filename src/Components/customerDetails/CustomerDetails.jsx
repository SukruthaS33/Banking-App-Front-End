import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CustomerDetails.css"; // One step back
import AccountList from "../cards/accountCard/AccountList";
import { useParams, useNavigate } from "react-router-dom";

// Import statements remain unchanged...

function App() {
  // Create states to store the customer name and accounts array
  const [customerName, setCustomerName] = useState("");
  const [accounts, setAccounts] = useState([]); // Store the accounts array
  const [hasAccount, setHasAccount] = useState(false);
  const { customerId } = useParams();

  // Use useEffect to make the API request when the component loads
  useEffect(() => {
    // Make an API call to get customer data
    axios
      .get(`http://localhost:8081/bankingapp/api/v1/customer/${customerId}`)
      .then((response) => {
        console.log("customer related data");
        console.log(response.data);
        setCustomerName(response.data.customerName);
        setAccounts(response.data.accounts);
        setHasAccount(response.data.accounts.length > 0);
      })
      .catch((error) => {
        console.error("There was an error fetching the customer data!", error);
      });
  }, []); // Empty array means this effect runs only once when the component mounts

  const navigate = useNavigate();

  const redirectToNewAccountPage = () => {
    navigate(`/customer/newAccount/${customerId}/${customerName}`);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="greeting">
          <p>Hello, {customerName ? customerName : "Loading..."}!</p>
        </div>
        {/* Check if the user has accounts */}
        {hasAccount ? (
          <div>
            <AccountList accounts={accounts} />

            <button
              className="create-new-account-if-exists"
              onClick={redirectToNewAccountPage}
            >
              Create New Account
            </button>
          </div>
        ) : (
          <div className="no-accounts-container">
            <p className="no-accounts-message">
              You do not have any accounts in our bank yet
            </p>
            <button
              className="create-account-button"
              onClick={redirectToNewAccountPage}
            >
              Create Account
            </button>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
