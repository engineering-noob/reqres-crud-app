import React, { createContext, useEffect } from "react";
import { useState } from "react";

import { loginUser, registerUser } from "../services/auth";

export const AuthContext = createContext({});

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let client = localStorage.getItem("client");
    if (client) {
      setUser(JSON.parse(client));
    }
    if (!client) {
      setUser(null);
    }
  }, []);

  const login = (data) => {
    loginUser(data)
      .then((res) => {
        setUser(res);
        localStorage.setItem("clientAccessToken", res.token);
        localStorage.setItem("client", JSON.stringify(res));
        alert("Successfully logged user");
      })
      .catch((err) => {
        alert(err.response.data.error);
      });
  };

  const register = (data) => {
    registerUser(data)
      .then((res) => {
        setUser(res);
        localStorage.setItem("clientAccessToken", res.token);
        localStorage.setItem("client", JSON.stringify(res));
        alert("Successfully registered user");
      })
      .catch((err) => {
        alert(err.response.data.error);
      });
  };

  const logout = () => {
    localStorage.removeItem("clientAccessToken");
    localStorage.removeItem("client");
    setUser(null);
    alert("Successfully logged out user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
