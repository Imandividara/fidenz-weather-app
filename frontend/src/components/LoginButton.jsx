import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button
      onClick={() => loginWithRedirect()}
      className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg"
    >
      Log In
    </button>
  );
};

export default LoginButton;
