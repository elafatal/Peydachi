import React, { createContext, useContext, useState } from 'react';

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [rememberMe, setRememberMe] = useState(false);
  const [signupData, setSignupData] = useState(null); // برای مسئله ۲
  const [username, setusername] = useState('');

  return (
    <LoginContext.Provider value={{ rememberMe, setRememberMe, signupData, setSignupData, username, setusername }}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => useContext(LoginContext);
