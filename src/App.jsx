import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { CommissionProvider } from "./context/CommissionContext";
import { AuctionProvider } from "./context/AuctionContext.jsx";
import { SuperProvider } from "./context/SuperContext.jsx";
import Navbar from "./components/Navbar.jsx";

import Footer from "./components/Footer.jsx";

import Home from "./pages/Home.jsx";

import Login from "./components/Auth/Login.jsx";

import Register from "./components/Auth/Register.jsx";

import ForgotPassword from "./components/Auth/ForgotPassword.jsx";

import ConfirmAccount from "./components/Auth/ConfirmAccount.jsx";

import Profile from "./pages/Profile.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

import Auctions from "./pages/Auctions.jsx";
import SideDrawer from "./components/layout/SideDrawer.jsx";
import SubmitCommission from "./pages/SubmitCommission.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HowItWorks from "./pages/HowItWorks.jsx";
import About from "./pages/About.jsx";
import Leaderboard from './pages/Leaderboard.jsx'
import AuctionItem from "./pages/AuctionItem.jsx";
import CreateAuction from "./pages/CreateAuction.jsx";
import ViewAuctionDetails from "./pages/ViewAuctionDetails.jsx"
import MyAuctionsDetails from "./pages/MyAuctionsDetails.jsx";

import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Contact from "./pages/Contact.jsx";
import NewPassword from "./pages/NewPassword.jsx";
function App() {
  return (
    <AuthProvider>
      <AuctionProvider>
        <CommissionProvider>
        <SuperProvider>
          <Router>
            <SideDrawer />

            <div className="pt-16">
              <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/validate-token" element={<NewPassword />} />

                <Route path="/confirm-account" element={<ConfirmAccount />} />
                <Route path="/how-it-works-info" element={<HowItWorks />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/auctions" element={<Auctions />} />
               <Route path="/auction/item/:id" element={<AuctionItem />} />
                <Route element={<ProtectedRoute />}>
                  <Route
                    path="/submit-commission"
                    element={<SubmitCommission />}
                  />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/create-auction" element={<CreateAuction />} />
                  <Route path="/viewauctions" element={<MyAuctionsDetails />} />
                  <Route path="/auction/details/:id" element={<ViewAuctionDetails />} />
                  
                </Route>
              </Routes>
            </div>

            
            <ToastContainer position="top-right" />
          </Router>
          </SuperProvider>
        </CommissionProvider>
      </AuctionProvider>
    </AuthProvider>
  );
}

export default App;
