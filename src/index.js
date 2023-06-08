import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Main from './components/Main';


function App() {
  return (
    <>
      <Header />
      {/* <Footer /> */}
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default App;
