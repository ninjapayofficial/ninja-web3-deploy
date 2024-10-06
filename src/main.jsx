// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App.jsx';
// import { ThirdwebProvider } from '@thirdweb-dev/react';
// import { Sepolia } from '@thirdweb-dev/chains';

// ReactDOM.render(
//   <ThirdwebProvider activeChain={Sepolia} clientID={'690062c61fec9aa02c8f0d8d84e2dc99'}> 
//     <App />
//   </ThirdwebProvider>,
//   document.getElementById('root')
// );

// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
// import { ThirdwebProvider } from '@thirdweb-dev/react';
// import { Sepolia } from '@thirdweb-dev/chains';

// const clientId = '690062c61fec9aa02c8f0d8d84e2dc99'; // Replace with your actual clientId
// const secretKey = '690062c61fec9aa02c8f0d8d84e2dc99';

// ReactDOM.render(
//   <ThirdwebProvider
//     activeChain={Sepolia}
//     clientId={clientId}
//   >
//     <App />
//   </ThirdwebProvider>,
//   document.getElementById('root')
// );


import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ThirdwebProvider } from '@thirdweb-dev/react';
import { Sepolia } from '@thirdweb-dev/chains';
import dotenv from 'dotenv';


// dotenv.config();

// const clientId = process.env.REACT_APP_THIRDWEB_CLIENT_ID;
// const secretKey = process.env.REACT_APP_THIRDWEB_SECRET_KEY;

const clientId = '690062c61fec9aa02c8f0d8d84e2dc99';
const secretKey = 'WA7-QDoWghPpkIgjmKWtvUGSOgzD9c06_lDqUzcEK50o_9bdGo9u5fGm1aAp7lBRqdxp0fJ74NFRWeIp0ahTiA';

ReactDOM.render(
  <ThirdwebProvider
    activeChain={Sepolia}
    clientId={clientId}
    secretKey={secretKey}
  >
    <App />
  </ThirdwebProvider>,
  document.getElementById('root')
);
