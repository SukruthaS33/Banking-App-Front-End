import React from "react";
import "./TransactionCardStyle.css";

const TransactionCard = ({
  transactionId,
  beneficiaryAccount,
  amount,
  transactionStatus,
}) => {
  return (
    <div className="transaction-card">
      <div className="transaction-info">
        <h3>TransactionId: {transactionId}</h3>
        <p>Amount: ${amount}</p>

        <h4>Transaction Status: {transactionStatus}</h4>
        {beneficiaryAccount ? (
          <div>
            <h4>Beneficiary Account Details:</h4>
            <p>Beneficiary ID: {beneficiaryAccount.beneficiaryId}</p>
            <p>Beneficiary Name: {beneficiaryAccount.beneficiaryName}</p>
            <p>
              Beneficiary Account Number:{" "}
              {beneficiaryAccount.beneficiaryAcctNumber}
            </p>
            <p>
              Beneficiary Bank Name: {beneficiaryAccount.beneficiaryBankName}
            </p>
            <p>IFSC Code: {beneficiaryAccount.beneficiaryIfscCode}</p>
            <p>Active: {beneficiaryAccount.active ? "Yes" : "No"}</p>
          </div>
        ) : (
          <p>No Beneficiary Account Found</p>
        )}
      </div>
    </div>
  );
};

export default TransactionCard;
