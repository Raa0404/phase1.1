import React, { useState } from 'react';

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
      cifId: "CIF ID",
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
      cifId: "सीआईएफ आईडी",
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
    <div className="phase phase2" style={{
      background: 'linear-gradient(to right, #ffe0b2, #fff3e0)',
      minHeight: '100vh',
      paddingBottom: '6rem',
      fontFamily: 'Segoe UI, sans-serif'
    }}>
      <h2 style={{ color: '#ff6f00' }}>{t.searchAccount}</h2>
      <input
        type="text"
        placeholder={t.enterAccount}
        value={accountNumber}
        onChange={(e) => setAccountNumber(e.target.value)}
        style={{
          padding: '10px',
          fontSize: '16px',
          borderRadius: '5px',
          border: '1px solid #ccc',
          marginBottom: '10px',
          width: '240px'
        }}
      />
      <div><button onClick={handleSearch} style={{
        backgroundColor: '#ff9800',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer'
      }}>{t.search}</button></div>

      {error && <p className="error" style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}

      {accounts.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <h3>{t.cifId}: {accounts[0]["CIF ID"]}</h3>
          <p>{t.numAccounts}: {accounts.length}</p>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            marginTop: '20px'
          }}>
            {accounts.map((acc, index) => (
              <div key={index} style={{
                background: '#fff',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                padding: '15px'
              }}>
                <p><strong>{t.accNumber}:</strong> {acc["Account Number"]}</p>
                <p><strong>{t.npaDate}:</strong> {acc["Actual NPA Date"]}</p>
                <p><strong>{t.npaCategory}:</strong> {acc["NPA Category"]}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {showProceed && (
        <div style={{ marginTop: '2rem' }}>
          <button onClick={onNext} style={{
            marginRight: '1rem',
            backgroundColor: '#43a047',
            color: '#fff',
            padding: '10px 20px',
            fontSize: '16px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}>{t.proceed}</button>

          <button onClick={onBack} style={{
            backgroundColor: '#e53935',
            color: '#fff',
            padding: '10px 20px',
            fontSize: '16px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}>{t.back}</button>
        </div>
      )}

      <footer style={{
        position: 'absolute',
        bottom: '1rem',
        width: '100%',
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#d84315',
        fontSize: '1.2rem',
        textShadow: '1px 1px 1px #fff',
        letterSpacing: '1px'
      }}>
        © P.Raa
      </footer>
    </div>
  );
}

export default Phase2;
