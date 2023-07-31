import React, {createContext, useContext, useReducer} from "react";

//Prepare data layer
export const StateContext = createContext();

export const StateProvider = ({ reducer, 
initialState, children}) => (
    //Set up data layer
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);

//Pull information from data layer
export const useStateValue = () => useContext(StateContext);