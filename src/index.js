import React from 'react';
import ReactDOM from 'react-dom/client';
import { FirebaseAppProvider } from 'reactfire';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const firebaseConfig = {
  apiKey: "AIzaSyCPcHStgLdWW7S035JNLVwW9Yq9Z6BC6Qo",
  authDomain: "kanban-test-f403c.firebaseapp.com",
  projectId: "kanban-test-f403c",
  storageBucket: "kanban-test-f403c.appspot.com",
  messagingSenderId: "507999116931",
  appId: "1:507999116931:web:5cae15efcc87765c41c5b6",
  measurementId: "G-LM94W36LNZ"
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <App />
    </FirebaseAppProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
