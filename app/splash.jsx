import React, { useState, useEffect } from 'react';
import useTests from '~/scripts/useTests.js';

export default function SplashScreen() {
  const [currentStatus, setCurrentStatus] = useState('');
  const [previousStatus, setPreviousStatus] = useState('');

  const statuses = useTests();

  useEffect(() => {
    if (statuses.length) {
      setPreviousStatus(currentStatus);
      setCurrentStatus(statuses[statuses.length - 1]);
    }
  }, [statuses]);
  
  if (statuses[0] == "done") return ""
  else
  return (
    <div className='splash'>
      <div className="splash-logo">
        <img src="stellar.png" alt="Logo" className="logo"/>
      </div>
      <div className="spinner"></div>
      <div className="status-wrapper">
        {previousStatus ? (
          <p key={`${previousStatus}-${Date.now()}`} className="status-text u__fs__h3 change">{previousStatus}</p>
        ) : (<p></p>)}
        <p key={currentStatus} className="status-text u__fs__h3">{currentStatus}</p>
      </div>
    </div>
  );
}
