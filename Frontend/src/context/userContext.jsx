import React, { createContext, useContext, useState } from 'react';

export const UserDataContext = createContext();

export const useUserData = () => useContext(UserDataContext);

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    email: '',
    fullname: { // changed to match backend
      firstname: '',
      lastname: ''
    }
  });

  return (
    <UserDataContext.Provider value={{ user, setUser }}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserContextProvider;
