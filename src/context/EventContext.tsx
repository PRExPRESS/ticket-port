'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TicketsContextType {
  Tickets: any[];
  addTicket: (ticket: any) => void;
  removeTicket: (ticket: any) => void;

}



const TicketContext = createContext<TicketsContextType | undefined>(undefined);


export const TicketsProvider = ({ children }: { children: ReactNode }) => {
  if(typeof window === "undefined") return null;
  const [user, setUser] = useState<any>(JSON.parse(localStorage.getItem('user') || 'null'));


  



  

 

  return (
    <TicketContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </TicketContext.Provider>
  );
};

// Custom hook 
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
