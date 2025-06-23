import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Auth from './pages/Auth'
import Following from './pages/Following'
import Home from "./pages/Home"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/*<App />*/}
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="/following" element={<Following />} />
          <Route path="/register" element={<Auth isRegistration={true} />} />
          <Route path="/login" element={<Auth isRegistration={false} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
