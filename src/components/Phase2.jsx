import React, { useState, useEffect } from 'react';

function Phase2({ onBack, onNext, language }) {
  const [accountNumber, setAccountNumber] = useState('');
  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState('');
  const [showProceed, setShowProceed] = useState(false);

  const labels = {
    en: {
      searchAccount: "Search Account",
      enterAccount: "Enter Account Number",
      search: "Search",
      proceed: "Proceed",
      back: "Back",
      accountsUnder: "Accounts under CIF",
      numAccounts: "No. of Accounts",
      accNumber: "Account No",
      npaDate: "NPA Date",
      npaCategory: "NPA Category",
      notFound: "Account not found."
    },
    hi: {
      searchAccount: "खाता खोजें",
      enterAccount: "खाता संख्या दर्ज करें",
      search: "खोजें",
      proceed: "आगे बढ़ें",
      back: "वापस",
      accountsUnder: "CIF के अंतर्गत खाते",
      numAccounts: "खातों की संख्या",
      accNumber: "खाता संख्या",
      npaDate: "एनपीए दिनांक",
      npaCategory: "एनपीए श्रेणी",
      notFound: "खाता नहीं मिला।"
    }
  };

  const t = labels[language] || labels.en;

  const handleSearch = async () => {
    const response = await fetch('/data.json');
    const data = await response.json();

    const account = data.find(acc => acc["Account Number"] === accountNumber);
    if (!account) {
      setAccounts([]);
      setError(t.notFound);
      setShowProceed(false);
      return;
    }

    const matchedAccounts = data.filter(acc => acc["CIF ID"] === account["CIF ID"]);
    setAccounts(matchedAccounts);
    setError('');
    setShowProceed(true);
  };

  return (
    <div className="phase phase2" style={{ backgroundColor: '#fff3e0', minHeight: '100vh', paddingBottom: '6rem' }}>
      <h2>{t.searchAccount}</h2>
      <input
        type="text"
        placeholder={t.enterAccount}
        value={accountNumber}
        onChange={(e) => setAccountNumber(e.target.value)}
      />
      <button onClick={handleSearch}>{t.search}</button>

      {error && <p className="error">{error}</p>}

      {accounts.length > 0 && (
        <div>
          <h3>{t.accountsUnder}: {accounts[0]["CIF ID"]}</h3>
          <p>{t.numAccounts}: {accounts.length}</p>
          <table>
            <thead>
              <tr>
                <th>{t.accNumber}</th>
                <th>{t.npaDate}</th>
                <th>{t.npaCategory}</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((acc, index) => (
                <tr key={index}>
                  <td>{acc["Account Number"]}</td>
                  <td>{acc["Actual NPA Date"]}</td>
                  <td>{acc["NPA Category"]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showProceed && (
        <div style={{ marginTop: '1.5rem' }}>
          <button onClick={onNext}>{t.proceed}</button>
        </div>
      )}

      <div style={{ marginTop: '1rem' }}>
        <button onClick={onBack}>{t.back}</button>
      </div>

      <footer style={{
        position: 'absolute',
        bottom: '1rem',
        width: '100%',
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#ff6f00',
        fontSize: '1.1rem',
        letterSpacing: '1px'
      }}>
        © P.Raa
      </footer>
    </div>
  );
}

export default Phase2;
