import React, { useState } from 'react';

function Phase1({ solId, setSolId, onNext }) {
  const [userName, setUserName] = useState('');
  const [language, setLanguage] = useState('');
  const [error, setError] = useState('');

  const isSolValid = solId >= 8701 && solId <= 8771;
  const isFormValid = userName && isSolValid && language;

  const handleSolChange = (e) => {
    const value = e.target.value;
    if (!/^[0-9]*$/.test(value)) return;
    setSolId(value);
  };

  const handleProceed = () => {
    if (!isFormValid) {
      setError('Please fill all fields correctly.');
      return;
    }
    setError('');
    onNext();
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

      <button onClick={handleProceed} disabled={!isFormValid}>
        Proceed
      </button>
    </div>
  );
}

export default Phase1;
