import React, { useEffect, useState } from "react";
import "./BeneficiaryCardStyle.css";
import axios from "axios";

const BeneficiaryCard = ({
  beneficiaryId,
  beneficiaryName,
  beneficiaryAcctNumber,
  beneficiaryBankName,
  beneficiaryIfscCode,
  refreshBeneficiaries,
  refreshAccountForTransaction,
  customerAccountNumber,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [transactionType, setTransactionType] = useState("NEFT");
  const [transactionStatusPopup, setTransactionStatusPopup] = useState(false);
  const [transactionDetails, setTransactionDetails] = useState();
  const [deleteBeneficiaryPopUp, setDeleteBeneficiaryPopup] = useState(false);
  const [isReceiveModalOpen, setReceiveModalOpen] = useState(false);

  const handleDeleteBeneficiary = async () => {
    try {
      await axios.delete(
        `http://localhost:8081/bankingapp/api/v1/accounts/deletebeneficiary/${customerAccountNumber}/${beneficiaryId}`
      );
      alert("Beneficiary deleted");
      closeWarningPopUpForDeleteBeneficiary();
      refreshBeneficiaries(); // Refresh the beneficiaries list after deletion
    } catch (error) {
      console.error("There was an error deleting the beneficiary!", error);
    }
  };
  const handleSendMoneyToBeneficiary = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8081/bankingapp/api/v1/transactions/${customerAccountNumber}/send?beneficiaryAccountNumber=${beneficiaryAcctNumber}&amount=${amount}&transactionType=${transactionType}`
      );
      //alert("Money sent successfully");
      console.log(response.data);
      setTransactionDetails(response.data);
      openTransactionPopUp();
      setModalOpen(false); // Close modal after success
      refreshAccountForTransaction(); // Refresh the beneficiaries list after transaction
    } catch (error) {
      console.error(
        "There was an error in sending money to the beneficiary!",
        error
      );
    }
  };

  const handleReceiveMoneyToAcccount = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8081/bankingapp/api/v1/transactions/${customerAccountNumber}/receive?beneficiaryAccountNumber=${beneficiaryAcctNumber}&amount=${amount}&transactionType=${transactionType}`
      );
      //alert("Money sent successfully");
      console.log(response.data);
      setTransactionDetails(response.data);
      openTransactionPopUp();
      setReceiveModalOpen(false); // Close modal after success
      refreshAccountForTransaction(); // Refresh the beneficiaries list after transaction
    } catch (error) {
      console.error(
        "There was an error in receiving money from the beneficiary!",
        error
      );
    }
  };
  //this is for sendmoney modal
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const openReceiveModal = () => {
    setReceiveModalOpen(true);
  };
  const closeReceiveModal = () => {
    setReceiveModalOpen(false);
  };
  const openTransactionPopUp = () => {
    setTransactionStatusPopup(true);
  };

  const closeTransactionPopUp = () => {
    setTransactionStatusPopup(false);
  };

  const retryTransaction = () => {
    handleSendMoneyToBeneficiary();
  };

  const cancelTransaction = () => {
    closeTransactionPopUp();
  };

  const openWarningPopUpForDeleteBeneficiary = () => {
    setDeleteBeneficiaryPopup(true);
  };

  const closeWarningPopUpForDeleteBeneficiary = () => {
    console.log("close warning popup");
    setDeleteBeneficiaryPopup(false);
  };
  return (
    <div className="beneficiary-card">
      <div className="beneficiary-info">
        <h3>Beneficiary Name: {beneficiaryName}</h3>
        <p>Account Number: {beneficiaryAcctNumber}</p>
        <p>Bank Name: {beneficiaryBankName}</p>
        <p>IFSC Code: {beneficiaryIfscCode}</p>
      </div>
      <div>
        <button
          className="view-beneficiary-btn"
          onClick={openWarningPopUpForDeleteBeneficiary}
        >
          Delete
        </button>
        <button className="view-beneficiary-btn" onClick={openModal}>
          Send Money
        </button>
        <button className="view-beneficiary-btn" onClick={openReceiveModal}>
          Receive Money
        </button>
      </div>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Send Money to {beneficiaryName}</h3>
            <label>
              Amount:
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </label>
            <label>
              Transaction Type:
              <select
                value={transactionType}
                onChange={(e) => setTransactionType(e.target.value)}
              >
                <option value="NEFT">NEFT</option>
                <option value="RTGS">RTGS</option>
                <option value="IMPS">IMPS</option>
              </select>
            </label>
            <button onClick={handleSendMoneyToBeneficiary}>Send</button>
            <button onClick={closeModal}>Cancel</button>
          </div>
        </div>
      )}

      {isReceiveModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Recieve money from {beneficiaryName}</h3>
            <label>
              Amount:
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </label>
            <label>
              Transaction Type:
              <select
                value={transactionType}
                onChange={(e) => setTransactionType(e.target.value)}
              >
                <option value="NEFT">NEFT</option>
                <option value="RTGS">RTGS</option>
                <option value="IMPS">IMPS</option>
              </select>
            </label>
            <button onClick={handleReceiveMoneyToAcccount}>Receive</button>
            <button onClick={closeReceiveModal}>Cancel</button>
          </div>
        </div>
      )}

      {transactionStatusPopup && (
        <div className="modal">
          <div className="modal-content">
            <p>
              <strong>
                Transaction Id: {transactionDetails.transactionId}
              </strong>
            </p>
            <p>
              <strong>
                Transaction Status: {transactionDetails.transactionStatus}
              </strong>
            </p>
            <p>
              Beneficiary Name:
              {beneficiaryName}
            </p>
            <p>Amount: {transactionDetails.amount}</p>
            <p>Transaction Type: {transactionDetails.transactionType}</p>

            {/* Conditional rendering of buttons based on transaction status */}
            {transactionDetails.transactionStatus === "FAILED" ? (
              <>
                <button onClick={retryTransaction}>Retry</button>
                <button onClick={cancelTransaction}>Cancel</button>
              </>
            ) : (
              <button onClick={closeTransactionPopUp}>OK</button>
            )}
          </div>
        </div>
      )}

      {deleteBeneficiaryPopUp && (
        <div className="modal">
          <div className="modal-content">
            <p>
              <strong>This will delete the below beneficiary</strong>
              <h5>You can add them back</h5>
            </p>

            <p>Beneficiary Name: {beneficiaryName}</p>
            <>
              <button onClick={handleDeleteBeneficiary}>Ok</button>
              <button onClick={closeWarningPopUpForDeleteBeneficiary}>
                Cancel
              </button>
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default BeneficiaryCard;
