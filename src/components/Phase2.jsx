import React, { useState, useEffect } from 'react';

function Phase2({ onBack }) {
  const [accountNumber, setAccountNumber] = useState('');
  const [accounts, setAccounts] = useState([]);
  const [legalCharges, setLegalCharges] = useState({});
  const [error, setError] = useState('');

  const handleSearch = async () => {
    const response = await fetch('/data.json');
    const data = await response.json();

    const account = data.find(acc => acc["Account Number"] === accountNumber);
    if (!account) {
      setAccounts([]);
      setError("Account not found.");
      return;
    }

    const matchedAccounts = data.filter(acc => acc["CIF ID"] === account["CIF ID"]);
    setAccounts(matchedAccounts);
    setError('');
  };

  const handleChargeChange = (index, value) => {
    if (!/^[0-9]*$/.test(value)) return;
    setLegalCharges(prev => ({ ...prev, [index]: value }));
  };

  return (
    <div className="phase phase2">
      <h2>Search Account</h2>
      <input
        type="text"
        placeholder="Enter Account Number"
        value={accountNumber}
        onChange={(e) => setAccountNumber(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {error && <p className="error">{error}</p>}

      {accounts.length > 0 && (
        <div>
          <h3>Accounts under CIF: {accounts[0]["CIF ID"]}</h3>
          <table>
            <thead>
              <tr>
                <th>Account No</th>
                <th>Borrower</th>
                <th>Outstanding</th>
                <th>Legal Charges</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((acc, index) => (
                <tr key={index}>
                  <td>{acc["Account Number"]}</td>
                  <td>{acc["Borrower Name"]}</td>
                  <td>{acc["CIF CURRENT OUTSTANDING"]}</td>
                  <td>
                    <input
                      type="text"
                      value={legalCharges[index] || ''}
                      onChange={(e) => handleChargeChange(index, e.target.value)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <button onClick={onBack} style={{ marginTop: '1rem' }}>Back</button>
    </div>
  );
}

export default Phase2;
