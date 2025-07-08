import React, { useState } from 'react';

function Phase2({ onBack, onNext }) {
  const [accountNumber, setAccountNumber] = useState('');
  const [accounts, setAccounts] = useState([]);
  const [legalCharges, setLegalCharges] = useState({});
  const [error, setError] = useState('');
  const [showProceed, setShowProceed] = useState(false);

  const handleSearch = async () => {
    const response = await fetch('/data.json');
    const data = await response.json();

    const account = data.find(acc => acc["Account Number"] === accountNumber);
    if (!account) {
      setAccounts([]);
      setError("Account not found.");
      setShowProceed(false);
      return;
    }

    const matchedAccounts = data.filter(acc => acc["CIF ID"] === account["CIF ID"]);
    setAccounts(matchedAccounts);
    setError('');
    setShowProceed(true);
  };

  const handleChargeChange = (index, value) => {
    if (!/^[0-9]*$/.test(value)) return;
    setLegalCharges(prev => ({ ...prev, [index]: value }));
  };

  return (
    <div className="phase phase2" style={{ backgroundColor: '#fff8e1', minHeight: '100vh', paddingBottom: '4rem' }}>
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
          <p>No. of Accounts: {accounts.length}</p>
          <table>
            <thead>
              <tr>
                <th>Account No</th>
                <th>Borrower</th>
                <th>Legal charges (if any)</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((acc, index) => (
                <tr key={index}>
                  <td>{acc["Account Number"]}</td>
                  <td>{acc["Borrower Name"]}</td>
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

      {showProceed && (
        <button onClick={onNext} style={{ marginTop: '1rem' }}>Proceed to Phase 3</button>
      )}

      <button onClick={onBack} style={{ marginTop: '1rem' }}>Back</button>

      <footer style={{ position: 'absolute', bottom: '1rem', width: '100%', textAlign: 'center', color: '#999' }}>
        © P.Raa
      </footer>
    </div>
  );
}

export default Phase2;
