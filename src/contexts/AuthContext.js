import React, { useState, useEffect, useContext } from 'react';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider(props) {
  const [authUser, setAuthUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  
  const value = {
    authUser,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn,
    isAdmin,
    setIsAdmin
  };

  useEffect(() => {
    // Check local storage for stored user data on component mount
    const IsLoggedIn = localStorage.getItem('IsLoggedIn');
    console.log(IsLoggedIn);
    if (IsLoggedIn==="true" && authUser == null) {
      const x = IsLoggedIn === "true" ? true : false;
      setIsLoggedIn(x);
  
      const IsAdmin = localStorage.getItem('IsAdmin');
      const y = IsAdmin === "true" ? true : false;
      setIsAdmin(y);
      setAuthUser(JSON.parse(localStorage.getItem('AuthUser')));
    }
  }, []);
  
  return (
    <AuthContext.Provider value={value}>
      {props.children}
    </AuthContext.Provider>
  );
}