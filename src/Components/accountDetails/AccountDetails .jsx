import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BeneficiaryList from "../cards/beneficiaryCard/BeneficiaryList";
import TransactionList from "../cards/transactionsCard/TransactionList";
import axios from "axios";
import "./AccountDetailsStyle.css";

const AccountDetails = () => {
  const { accountNumber } = useParams();
  const [accountDetails, setAccountDetails] = useState(null);
  const [hasBeneficiaries, setHasBeneficiaries] = useState(false);
  const [accountTransactions, setAccountTransactions] = useState([]);

  // Initial fetch on mount
  useEffect(() => {
    fetchAccountDetails();
  }, [accountNumber]);

  useEffect(() => {
    fetchDebitAndCreditTransactionsOfAccount();
  }, [accountNumber]);

  // Function to fetch account details
  const fetchAccountDetails = async () => {
    console.log(accountNumber);
    try {
      const response = await axios.get(
        `http://localhost:8081/bankingapp/api/v1/accounts/${accountNumber}`
      );
      setAccountDetails(response.data);
      console.log(response.data);
      if (response.data.beneficiaries != null) {
        setHasBeneficiaries(true);
      }

      // Update state with new data
    } catch (error) {
      console.error("Error fetching account details:", error);
    }
  };

  const fetchDebitAndCreditTransactionsOfAccount = async () => {
    console.log("inside fetchDebitAndCreditTransactionsOfAccount");
    try {
      const response = await axios.get(
        `http://localhost:8081/bankingapp/api/v1/transactions/${accountNumber}/history`
      );
      console.log("transactions");
      console.log(response.data);
      setAccountTransactions(response.data);
    } catch (error) {
      console.log("some error in getting transasctions");
    }
  };

  // Refresh account details manually
  const refreshTransactionDetails = () => {
    console.log("refreshing account details after transaction");
    fetchDebitAndCreditTransactionsOfAccount();
  };

  if (!accountDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="account-card-inside-account">
        <div className="account-info-inside-account">
          <h3>Account Number: {accountDetails.accountNumber}</h3>
          <p>Account Type: {accountDetails.accountType || "Not Available"}</p>
          <p>Balance:${accountDetails.balance}</p>
        </div>
      </div>
      {/* Pass refreshAccountDetails to BeneficiaryList */}

      <BeneficiaryList
        beneficiaries={accountDetails.beneficiaries}
        customerAccountNumber={accountDetails.accountNumber}
        refreshTransactionDetails={refreshTransactionDetails} // Pass as prop if needed
      />
      {/* Display transactions */}
      <TransactionList transactions={accountTransactions} />
    </div>
  );
};

export default AccountDetails;
