// TransactionForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const contacts = [
  'Abhishek Dhiman', 'Sukhjeet Singh', 'Arpan Silwal', 
  'Nawaz Chowdhry', 'Surjeet Singh', 'Sejal Josan', 
  'Nabdeep Kaur', 'Jasdeep Kaur', 'Riya Mankotia'
];

const TransactionForm = ({ type, onSubmit }) => {
  const [amount, setAmount] = useState('');
  const [accountType, setAccountType] = useState('checking');
  const [selectedContact, setSelectedContact] = useState(contacts[0]);
  const [showModal, setShowModal] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      setShowModal(true);
    } else {
      setFormErrors(errors);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!amount.trim() || isNaN(amount) || amount <= 0) {
      errors.amount = 'Enter a valid amount.';
    }
    return errors;
  };

  const handleConfirm = () => {
    const transactionData = {
      accountNumber: localStorage.getItem('accountNumber'), // Use account number from local storage
      amount: parseFloat(amount.trim()),
      type: type,
      accountType: accountType,
      contact: type === 'etransfer' ? selectedContact : undefined,
    };
    onSubmit(transactionData);
    setAmount('');
    navigate('/');
    setShowModal(false);
  };

  return (
    <div className="container py-5">
      <div className="card p-4 shadow-lg border-0" style={{ borderRadius: '10px' }}>
        <div className="text-center mb-4">
          <h1 className="text-danger fw-bold">CIBC <span className="text-black">Bank</span></h1>
          <p className="text-muted">Secure and Fast {type === 'deposit' ? 'Deposit' : type === 'withdraw' ? 'Withdraw' : 'E-Transfer'} Service</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="amount" className="form-label fw-bold">Amount</label>
            <input
              type="number"
              id="amount"
              className={`form-control ${formErrors.amount ? 'is-invalid' : ''}`}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
            {formErrors.amount && <div className="invalid-feedback">{formErrors.amount}</div>}
          </div>
          <div className="mb-4">
            <label className="form-label fw-bold">Account Type</label>
            <div className="d-flex justify-content-center">
              <div className="btn-group" role="group">
                <button
                  type="button"
                  className={`btn ${accountType === 'checking' ? 'btn-danger' : 'btn-outline-danger'}`}
                  onClick={() => setAccountType('checking')}
                >
                  Checking
                </button>
                <button
                  type="button"
                  className={`btn ${accountType === 'savings' ? 'btn-danger' : 'btn-outline-danger'}`}
                  onClick={() => setAccountType('savings')}
                >
                  Savings
                </button>
                <button
                  type="button"
                  className={`btn ${accountType === 'creditCard' ? 'btn-danger' : 'btn-outline-danger'}`}
                  onClick={() => setAccountType('creditCard')}
                >
                  Credit Card
                </button>
                <button
                  type="button"
                  className={`btn ${accountType === 'investment' ? 'btn-danger' : 'btn-outline-danger'}`}
                  onClick={() => setAccountType('investment')}
                >
                  Investment
                </button>
              </div>
            </div>
          </div>
          {type === 'etransfer' && (
            <div className="mb-4">
              <label htmlFor="contact" className="form-label fw-bold">Select Contact</label>
              <select
                id="contact"
                className="form-select"
                value={selectedContact}
                onChange={(e) => setSelectedContact(e.target.value)}
                required
              >
                {contacts.map((contact, index) => (
                  <option key={index} value={contact}>
                    {contact}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="text-center">
            <button type="submit" className="btn btn-danger btn-lg px-5">
              {type === 'deposit' ? 'Deposit' : type === 'withdraw' ? 'Withdraw' : 'Transfer'}
            </button>
          </div>
        </form>
        <div className="text-center mt-3">
          <a href="#!" className="text-danger text-decoration-none me-2 custom-link">Terms of Use</a>
          <span className="text-muted">|</span>
          <a href="#!" className="text-danger text-decoration-none ms-2 custom-link">Privacy Policy</a>
        </div>
      </div>

      <div className={`modal ${showModal ? 'show' : ''}`} tabIndex="-1" style={{ display: showModal ? 'block' : 'none' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirm {type === 'deposit' ? 'Deposit' : type === 'withdraw' ? 'Withdrawal' : 'Transfer'}</h5>
              <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowModal(false)}></button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to {type === 'deposit' ? 'deposit' : type === 'withdraw' ? 'withdraw' : 'transfer'} funds?</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button type="button" className="btn btn-danger" onClick={handleConfirm}>Confirm</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionForm;
