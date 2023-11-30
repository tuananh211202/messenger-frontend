import React, { createContext, useContext, useReducer } from "react";
import { SidebarAction, SidebarState } from "../Actions/sidebarTypes";

interface SidebarContextProps {
  sidebarState: SidebarState;
  sidebarDispatch: React.Dispatch<SidebarAction>
};

const initialState: SidebarState = {
  onNoti: false,
  onSearch: false,
  onCreate: false
};

const sidebarReducer = (state: SidebarState, action: SidebarAction): SidebarState => {
  switch (action.type) {
    case 'OPEN_NOTI':
      return {
        onNoti: true,
        onSearch: false,
        onCreate: false
      };
    case 'OPEN_SEARCH':
      return {
        onNoti: false,
        onSearch: true,
        onCreate: false
      };
    case 'OPEN_CREATE_MODAL':
      return {
        ...state,
        onCreate: true
      };
      
    case 'CLOSE_NOTI':
      return { ...initialState };
    case 'CLOSE_SEARCH':
      return { ...initialState };
    case 'CLOSE_CREATE_MODAL':
      return {
        ...state,
        onCreate: false
      };
    case 'NAVIGATE': 
      return { ...initialState }
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

interface SidebarProviderProps {
  children: React.ReactNode;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export const SidebarProvider: React.FC<SidebarProviderProps> = ({ children }) => {
  const [sidebarState, sidebarDispatch] = useReducer(sidebarReducer, initialState);

  return (
    <SidebarContext.Provider value={{ sidebarState, sidebarDispatch }}>
      {children}
    </SidebarContext.Provider>
  );
}

export const useSidebarContext = (): SidebarContextProps => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};