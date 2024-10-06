import React from "react";
import TransactionCard from "./TransactionCard";
import "./TransactionsListStyle.css";

const TransactionList = ({ transactions }) => {
  return (
    <div className="transactions-list">
      {/* Render a card for each transaction in the transaction array */}

      {transactions.length > 0 ? (
        transactions.map((transaction, index) => (
          <TransactionCard
            key={index}
            transactionId={transaction.transactionId}
            beneficiaryAccount={transaction.beneficiaryAccount}
            amount={transaction.amount}
            transactionStatus={transaction.transactionStatus}
          />
        ))
      ) : (
        <p>No transactions available.</p>
      )}
    </div>
  );
};

export default TransactionList;
