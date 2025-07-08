import React, { useState } from 'react';

function Phase1({ solId, setSolId, onNext }) {
  const [userName, setUserName] = useState('');
  const [language, setLanguage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const isSolValid = solId >= 8701 && solId <= 8771;
  const isFormValid = userName && isSolValid && language;

  const handleSolChange = (e) => {
    const value = e.target.value;
    if (!/^[0-9]*$/.test(value)) return;
    setSolId(value);
  };

  const handleProceed = async () => {
    if (!isFormValid) {
      setError('Please fill all fields correctly.');
      return;
    }

    setLoading(true);
    const data = {
      Name: userName,
      "SOL ID": solId,
      Language: language,
      Timestamp: new Date().toLocaleString()
    };

    try {
      const response = await fetch(
        "https://api.sheetbest.com/sheets/23082146-1b44-445c-98e3-548981f48eaf",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        }
      );
      if (response.ok) {
        setError('');
        onNext();
      } else {
        setError("Failed to submit data. Please try again.");
      }
    } catch (error) {
      setError("Error connecting to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="phase phase1">
      <h1>Welcome to OTS Nivaran</h1>

      <input
        type="text"
        placeholder="Enter your name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Enter SOL ID (8701–8771)"
        value={solId}
        onChange={handleSolChange}
      />

      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="">Select Language</option>
        <option value="en">English</option>
        <option value="hi">हिंदी</option>
      </select>

      {error && <p className="error">{error}</p>}

      <button onClick={handleProceed} disabled={!isFormValid || loading}>
        {loading ? "Submitting..." : "Proceed"}
      </button>
          <footer style={{ marginTop: '2rem', color: '#999' }}>
        © P.Raa
      </footer>
    </div>
  );
}

export default Phase1;
