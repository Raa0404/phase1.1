import React, { useState } from 'react';
import Phase1 from './components/Phase1';
import './styles/app.css';

function App() {
  const [phase, setPhase] = useState(1);
  const [solId, setSolId] = useState('');

  return (
    <div className="app-container">
      {phase === 1 && (
        <Phase1
          solId={solId}
          setSolId={setSolId}
          onNext={() => setPhase(2)}
        />
      )}
      {phase === 2 && (
        <div className="phase-dummy">
          <h2>Phase 2 (Placeholder)</h2>
        </div>
      )}
    </div>
  );
}

export default App;
