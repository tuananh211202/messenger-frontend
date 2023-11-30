import React, { useEffect, useState } from 'react';
import './App.css';
import GuessRoutes from './Routes/GuessRoutes';
import SideBar from './Layouts/Sidebar';
import { SidebarProvider } from './Services/Reducers/SidebarContext';
import UploadModal from './Components/UploadModal';
import UserRoutes from './Routes/UserRoutes';
import { getCookie } from 'typescript-cookie';
import { useNavigate } from 'react-router-dom';

function App() {
  const token = getCookie("access_token");

  return (
    // <GuessRoutes />
    // <SidebarProvider>
    //   <SideBar />
    //   <UploadModal />
    // </SidebarProvider>
    // <ImageUploader />
    
    token ? 
    <SidebarProvider>
      <div className='flex'>
        <SideBar />
        <UserRoutes />
        <UploadModal />
      </div>
    </SidebarProvider>
    : 
    <GuessRoutes />
  );
}

export default App;
