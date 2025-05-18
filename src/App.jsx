import React, { Suspense, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './Component/ErrorBoundary/ErrorBoundary';
import Footer from './Component/Footer/Footer';
import { CartProvider } from './Context/CartContext';
import { AuthProvider } from './Context/AuthContext';
import AdminRoute from './routes/BlockAdminRoute';
import Preloader from './Component/Preloader/Preloader';

// Eager loaded components
import PropertyListing from './Component/PropertyListing/PropertyListing';
import Payment from './Component/Payment/Payment';
import BuyPage from './Component/BuyPage/BuyPage';
import RentPage from './Component/RentPage/RentPage';
import AgentPage from './Component/AgentPage/AgentPage';
import AboutPage from './Component/AboutPage/AboutPage';
import HomeSelling from './Component/OrusHomeSellingPage/OrusHomeSellingPage';
import LandSellingPage from './Component/LandSellingPage/LandSellingPage';
import BlockIndustryPage from './Component/BlockIndustryPage/BlockIndustryPage';
import SurveyDocumentsPage from './Component/SurveyDocumentsPage/SurveyDocumentsPage';
import CofOPage from './Component/CofOPage/CofO';
import BuildingEngineeringPage from './Component/BuildingEngineeringPage/BuildingEngineeringPage';
import EstateDevelopmentPage from './Component/EstateDevelopmentPage/EstateDevelopmentPage';
import CheckoutPage from './Component/CheckoutPage/CheckoutPage';
import CartPage from './Component/CartPage/CartPage';
import ContactUsPage from './Component/ContactUsPage/ContactUsPage';
import PrivacyPolicyPage from './Component/PrivacyPolicyPage/PrivacyPolicyPage';
import TermsOfServicePage from './Component/TermsOfService/TermsOfServicePage';
import Login from './Component/Login/Login';
import Register from './Component/Register/Register';
import AdminDashboard from './admin/BlockAdmin/AdminDashboard';
import BlockForm from './admin/BlockAdmin/BlockForm';

// Import Property Admin Components
import PropertyAdminDashboard from './admin/PropertyAdmin/PropertyAdminDashboard';
import PropertyForm from './admin/PropertyAdmin/PropertyForm';

// Import Land Admin Components
import LandAdminDashboard from './admin/LandAdmin/LandAdminDashboard';
import LandForm from './admin/LandAdmin/LandForm';

// Import Survey Admin Component
import SurveyAdminDashboard from './admin/SurveyAdminDashboard/SurveyAdminDashboard';
import COFOAdminDashboard from './admin/COFOAdminDashboard/COFOAdminDashboard';

// Import Engineering Admin Component
import EngineeringAdmin from './admin/EngineeringAdmin/EngineeringAdmin';
import InvestmentInquiryAdmin from './admin/InvestmentInquiry/InvestmentInquiryAdmin';

// Lazy loaded components
const Header = React.lazy(() => import('./Component/HeaderPage/Header'));
const HomePage = React.lazy(() => import('./Component/HomePage/HomePage'));
const PropertyDetails = React.lazy(() => import('./Component/PropertyDetails/PropertyDetails'));
const Confirmation = React.lazy(() => import('./Component/Confirmation/Confirmation'));

// Loading component
const Loading = () => (
  <div className="loading">
    <i className="fas fa-spinner fa-spin"></i>
    <span>Loading...</span>
  </div>
);

const AppContent = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  const handlePreloaderComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <Preloader onLoaded={handlePreloaderComplete} />;
  }
  
  return (
    <Router>
      <CartProvider>
        <ErrorBoundary>
          <Suspense fallback={<Loading />}>
            <div className="app">
              <Header />
              <main className="main-content">
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/property-listing" element={<PropertyListing />} />
                  <Route path="/property/:id" element={<PropertyDetails />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/payment" element={<Payment />} />
                  <Route path="/confirmation" element={<Confirmation />} />
                  
                  {/* Service Routes */}
                  <Route path="/buy" element={<BuyPage />} />
                  <Route path="/rent" element={<RentPage />} />
                  <Route path="/services/selling-homes" element={<HomeSelling />} />
                  <Route path="/services/selling-land" element={<LandSellingPage />} />
                  <Route path="/services/block-industry" element={<BlockIndustryPage />} />
                  <Route path="/services/survey-documents" element={<SurveyDocumentsPage />} />
                  <Route path="/services/cofo-processing" element={<CofOPage />} />
                  <Route path="/services/building-engineering" element={<BuildingEngineeringPage />} />
                  <Route path="/services/estate-development" element={<EstateDevelopmentPage />} />
                  
                  {/* Other Public Routes */}
                  <Route path="/agents" element={<AgentPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/contact" element={<ContactUsPage />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                  <Route path="/terms-of-service" element={<TermsOfServicePage />} />
                  <Route path="/admin/surveys" element={<SurveyAdminDashboard />} />
                  <Route path="/admin/cofo" element={<COFOAdminDashboard />} />

                  {/* Admin Routes */}
                  <Route path="/admin/*" element={<AdminRoute />}>
                    {/* Block Industry Admin Routes */}
                    <Route index element={<AdminDashboard />} />
                    <Route path="blocks" element={<AdminDashboard />} />
                    <Route path="blocks/new" element={<BlockForm />} />
                    <Route path="blocks/edit/:id" element={<BlockForm />} />
                    
                    {/* Property Admin Routes */}
                    <Route path="properties" element={<PropertyAdminDashboard />} />
                    <Route path="properties/new" element={<PropertyForm />} />
                    <Route path="properties/edit/:id" element={<PropertyForm />} />

                    {/* Land Admin Routes */}
                    <Route path="lands" element={<LandAdminDashboard />} />
                    <Route path="lands/new" element={<LandForm />} />
                    <Route path="lands/edit/:id" element={<LandForm />} />

                    {/* Engineering Admin Routes */}
                    <Route path="engineering" element={<EngineeringAdmin />} />
                    <Route path="investment" element={<InvestmentInquiryAdmin />} />
                  </Route>

                  {/* 404 Route */}
                  <Route path="*" element={
                    <div className="not-found">
                      <h1>404 - Page Not Found</h1>
                      <p>The page you are looking for does not exist.</p>
                    </div>
                  } />
                </Routes>
              </main>
              <Footer />
            </div>
          </Suspense>
        </ErrorBoundary>
      </CartProvider>
    </Router>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;