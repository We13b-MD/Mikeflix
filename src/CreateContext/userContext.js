import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [username, setUsername] = useState("");
  const [isAuthenticated, setisAuthenticated] = useState(false);

  const setUser = (name) => {
    setUsername(name);
    localStorage.setItem("username", name);
    setisAuthenticated(true);
  };
  function logout() {
    setUsername("");
    localStorage.removeItem("username");
    setisAuthenticated(false);
    console.log("userloggedout", isAuthenticated);
  }

  function login() {
    setisAuthenticated(true);
  }

  return (
    <UserContext.Provider
      value={{ username, setUser, logout, login, isAuthenticated }}
    >
      {children}
    </UserContext.Provider>
  );
}
