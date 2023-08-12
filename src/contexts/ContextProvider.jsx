import React, { createContext, useContext, useState, useReducer } from 'react';

const StateContext = createContext();

export const customersReducer = (state, action) => {
  switch (action.type) {
    case 'GET_CUSTOMERS': 
      return {
        customers: action.payload
      }
    case 'CREATE_CUSTOMER':
      console.log(action.payload.data)
      return {
        customers: [action.payload.data,...state.customers]
      }
    case 'DELETE_CUSTOMER':
      return {
        customers: state.customers.filter((w) => w._id !== action.payload._id)
      }
    default:
      return state
  }
}



const initialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
  customers: []
};

export const ContextProvider = ({ children }) => {

  const [state, dispatch] = useReducer(customersReducer, {
    customers: [] // Initialize with an empty array
  });


  const [screenSize, setScreenSize] = useState(undefined);
  const [currentColor, setCurrentColor] = useState('#03C9D7');
  const [currentMode, setCurrentMode] = useState('Light');
  const [themeSettings, setThemeSettings] = useState(false);
  const [activeMenu, setActiveMenu] = useState(true);
  const [isClicked, setIsClicked] = useState(initialState);

  const setMode = (e) => {
    setCurrentMode(e.target.value);
    localStorage.setItem('themeMode', e.target.value);

    setThemeSettings(false);
  };

  const setColor = (color) => {
    setCurrentColor(color);
    localStorage.setItem('colorMode', color);

    setThemeSettings(false);
  };

  const handleClick = (clicked) => setIsClicked({ ...initialState, [clicked]: true });

  return (

    <StateContext.Provider value={{ currentColor, currentMode, activeMenu, screenSize, setScreenSize, handleClick, isClicked, initialState, setIsClicked, setActiveMenu, setCurrentColor, setCurrentMode, setMode, setColor, themeSettings, setThemeSettings, ...state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);