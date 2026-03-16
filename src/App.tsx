import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedMenu from './components/FeaturedMenu';
import Philosophy from './components/Philosophy';
import Footer from './components/Footer';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import Profile from './components/profile/Profile';
import EditProfile from './components/profile/EditProfile';
import OrderPage from './components/order/OrderPage';
import CheckoutPage from './components/order/CheckoutPage';
import { AuthProvider } from './context/AuthContext';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('home');

  // Simple router logic
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <main>
            <Hero />
            <FeaturedMenu />
            <Philosophy />
          </main>
        );
      case 'order':
         return <OrderPage onNavigate={setCurrentPage} />;
      case 'checkout':
         return <CheckoutPage onNavigate={setCurrentPage} />;
      case 'login':
        return <Login onNavigate={setCurrentPage} />;
      case 'signup':
        return <SignUp onNavigate={setCurrentPage} />;
      case 'profile':
        return <Profile onNavigate={setCurrentPage} />;
      case 'edit-profile':
        return <EditProfile onNavigate={setCurrentPage} />;
      default:
        return (
           <main>
            <Hero />
            <FeaturedMenu />
            <Philosophy />
          </main>
        );
    }
  };

  return (
    <div className="bg-[#1a1510] min-h-screen text-[#E8E0D5] font-sans antialiased selection:bg-[#C6A87C] selection:text-[#1a1510]">
      <Navbar onNavigate={setCurrentPage} currentPage={currentPage} />
      {renderPage()}
      {/* Footer logic: Show on Home, or maybe specialized small footer on other pages if requested */}
      {currentPage === 'home' && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
