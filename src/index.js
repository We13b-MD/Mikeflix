import React from 'react';
import ReactDOM from 'react-dom/client';
import {GoogleOAuthProvider} from '@react-oauth/google'
import App from './App';
import {ShareProvider} from './CreateContext/SharedContext'
import {UserProvider} from './CreateContext/userContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<React.StrictMode>
    <GoogleOAuthProvider clientId = "1050631762137-dvj07ouog589q3kh3veck2bqt1id96tf.apps.googleusercontent.com">
      <UserProvider>
      <ShareProvider>
    <App />
    </ShareProvider>
    </UserProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
