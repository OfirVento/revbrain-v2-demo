import React, { useEffect } from 'react';

import ReactDOM from 'react-dom/client';
import '@/styles/globals.css';
import { Router } from '@/Router';
import { loadAssessmentPayload } from '@/lib/assessment/loader';
import { useAssessmentStore } from '@/store';

function App() {
  const { setPayload, setErrors } = useAssessmentStore();

  useEffect(() => {
    // Force light mode globally (dark mode disabled for RevBrain)
    document.documentElement.setAttribute('data-theme', 'light');

    // Load and validate payload
    const result = loadAssessmentPayload();
    if (result.data) {
      setPayload(result.data);
    } else if (result.errors) {
      setErrors(result.errors);
    }
  }, []);

  return <Router />;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
