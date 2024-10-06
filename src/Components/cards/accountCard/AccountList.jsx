import React from "react";
import AccountCard from "./AccountCard"; // Import the AccountCard component
import "./AccountListStyle.css";
const AccountList = ({ accounts }) => {
  return (
    <div className="account-list">
      {/* Render a card for each account in the accounts array */}
      {accounts.length > 0 ? (
        accounts.map((account, index) => (
          <AccountCard
            key={index}
            accountNumber={account.accountNumber}
            balance={account.balance}
            accountType={account.accountType} // Adjust if you need this
          />
        ))
      ) : (
        <p>No accounts available.</p>
      )}
    </div>
  );
};

export default AccountList;
