import { useEffect, useState } from "react";
import axios from 'axios';

// This script checks whether the sessionStorage is empty (i.e. the tab has been closed)
// If that's the case, the app will go through the usual server checks
// If not and if the status value is OK, it will skip the server checks

const checkStorage = () => {
  let session = sessionStorage.getItem('register');
  if (session == null) {
    localStorage.removeItem('status');
    sessionStorage.setItem('register', 1);
    return false;
  } else 
  if (localStorage.getItem('status') === "OK") {
    return true;
  }
}

if (typeof window !== 'undefined' && window.addEventListener) {
  window.addEventListener('load', checkStorage);
}

const useTests = () => {
  const [statuses, setStatuses] = useState([]);

  const addStatus = (newStatus) => {
    setStatuses((prevStatuses) => prevStatuses.length === 2 ? [prevStatuses[1], newStatus] : [...prevStatuses, newStatus]);
  };

  const checkServer = () =>
    new Promise((resolve) => setTimeout(() => resolve(true), 1000));
  const checkSPOToken = () =>
    new Promise((resolve) => {
      const token = axios.get("/token").then((response) => resolve(response.status === 200));
    });
  const checkARLToken = () =>
    new Promise((resolve) => setTimeout(() => resolve(true), 5000));
  const checkHistory = () =>
    new Promise((resolve) => setTimeout(() => resolve(true), 600));

  const runTests = async () => {
    addStatus("Checking server...");
    const serverTestPassed = await checkServer();

    if (!serverTestPassed) {
        addStatus("Server check failed");
      return;
    }

    addStatus("Checking Spotify token...");
    const spoTestPassed = await checkSPOToken();

    if (!spoTestPassed) {
        addStatus("SPO token check failed");
      return;
    }

    addStatus("Checking ARL token...");
    const arlTestPassed = await checkARLToken();

    if (!arlTestPassed) {
        addStatus("ARL token check failed");
      return;
    }

    addStatus("Checking history...");
    const historyTestPassed = await checkHistory();

    if (!historyTestPassed) {
        addStatus("History check failed");
      return;
    }
    localStorage.setItem('status', "OK");
    addStatus("All checks passed");
    setTimeout(() => {
      setStatuses(["done"]);
    }, 600);
  };

  useEffect(() => {
    if (!checkStorage()) {
      runTests();
    } else {
      setStatuses(["done"]); 
    }
  }, []);

  return statuses;
};

export default useTests;
