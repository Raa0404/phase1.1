import React, { useState } from 'react';
import Phase1 from './components/Phase1';
import Phase2 from './components/Phase2';
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
        <Phase2
          onBack={() => setPhase(1)}
        />
      )}
    </div>
  );
}

export default App;
