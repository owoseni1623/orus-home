import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import logo from '/Images/orus.jpg';
import { Search, ChevronDown, Menu, X, ShoppingBag, User } from 'lucide-react';
import { useCart } from '../../Context/CartContext';
import { useAuth } from '../../Context/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRefs = useRef({});
  
  // Use auth context
  const { user, logout, isAuthenticated } = useAuth();

  // Use the cart context with proper destructuring
  const { cartItems, getTotalItems } = useCart();

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Search query:', searchQuery);
  };

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setActiveDropdown(null);
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  const SearchForm = () => (
    <form className={styles.hea003SearchContainer} onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search properties..."
        className={styles.hea003SearchInput}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button type="submit" className={styles.hea003SearchButton}>
        <Search size={20} />
      </button>
    </form>
  );

  const AuthSection = () => {
    if (isAuthenticated && user) {
      return (
        <div className={styles.hea003AuthSection}>
          <div className={styles.hea003UserInfo}>
            <User size={24} />
            <span className={styles.hea003UserName}>{user.name}</span>
          </div>
          <Link to="/cart" className={styles.hea003CartButton}>
            <div className={styles.hea003CartIcon}>
              <ShoppingBag size={24} />
              {getTotalItems() > 0 && (
                <span className={styles.hea003CartBadge}>
                  {getTotalItems()}
                </span>
              )}
            </div>
          </Link>
          <button 
            onClick={handleLogout}
            className={styles.hea003LogoutButton}
          >
            Logout
          </button>
        </div>
      );
    }

    return (
      <div className={styles.hea003AuthSection}>
        <Link to="/login" className={styles.hea003LoginButton}>
          Login
        </Link>
        <Link to="/register" className={styles.hea003RegisterButton}>
          Register
        </Link>
      </div>
    );
  };

  return (
    <header className={styles.hea003Header}>
      <div className={styles.hea003Container}>
        {/* Logo Section */}
        <div className={styles.hea003LogoSection}>
          <Link to="/" className={styles.hea003LogoLink}>
            <img
              src={logo}
              alt="SB.Orus Nigeria Limited"
              className={styles.hea003Logo}
            />
            <span className={styles.hea003Title}>SB.Orus Nigeria Limited</span>
          </Link>
        </div>

        {/* Navigation Menu */}
        <nav
          className={`${styles.hea003Nav} ${
            isMenuOpen ? styles.hea003NavOpen : ''
          }`}
        >
          <ul className={styles.hea003NavList}>
            {/* Home Link */}
            <li className={styles.hea003NavItem}>
              <Link 
                to="/"
                className={styles.hea003NavLink}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            </li>

            {/* Services Dropdown */}
            <li 
              className={styles.hea003NavItem}
              ref={(el) => (dropdownRefs.current['Services'] = el)}
            >
              <div
                className={styles.hea003NavLink}
                onClick={() => toggleDropdown('Services')}
              >
                Services <ChevronDown size={16} />
              </div>
              {activeDropdown === 'Services' && (
                <ul className={styles.hea003DropdownMenu}>
                  <li>
                    <Link 
                      to="/services/selling-homes" 
                      className={styles.hea003DropdownLink}
                      onClick={() => {
                        setActiveDropdown(null);
                        setIsMenuOpen(false);
                      }}
                    >
                      Home For Sale
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/services/selling-land" 
                      className={styles.hea003DropdownLink}
                      onClick={() => {
                        setActiveDropdown(null);
                        setIsMenuOpen(false);
                      }}
                    >
                      Land
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/services/block-industry" 
                      className={styles.hea003DropdownLink}
                      onClick={() => {
                        setActiveDropdown(null);
                        setIsMenuOpen(false);
                      }}
                    >
                      Block Industry
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/services/survey-documents" 
                      className={styles.hea003DropdownLink}
                      onClick={() => {
                        setActiveDropdown(null);
                        setIsMenuOpen(false);
                      }}
                    >
                      Survey Documents
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* Processing Dropdown */}
            <li 
              className={styles.hea003NavItem}
              ref={(el) => (dropdownRefs.current['Processing'] = el)}
            >
              <div
                className={styles.hea003NavLink}
                onClick={() => toggleDropdown('Processing')}
              >
                Processing <ChevronDown size={16} />
              </div>
              {activeDropdown === 'Processing' && (
                <ul className={styles.hea003DropdownMenu}>
                  <li>
                    <Link 
                      to="/services/cofo-processing" 
                      className={styles.hea003DropdownLink}
                      onClick={() => {
                        setActiveDropdown(null);
                        setIsMenuOpen(false);
                      }}
                    >
                      C of O
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/services/building-engineering" 
                      className={styles.hea003DropdownLink}
                      onClick={() => {
                        setActiveDropdown(null);
                        setIsMenuOpen(false);
                      }}
                    >
                      Building Engineering
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/services/estate-development" 
                      className={styles.hea003DropdownLink}
                      onClick={() => {
                        setActiveDropdown(null);
                        setIsMenuOpen(false);
                      }}
                    >
                      Estate Development
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>

          {/* Mobile Menu Additional Items */}
          <div className={styles.hea003MobileMenuAdditions}>
            <SearchForm />
            <AuthSection />
          </div>
        </nav>

        {/* Desktop Search and Auth Section */}
        <div className={styles.hea003RightSection}>
          <SearchForm />
          <AuthSection />
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={`${styles.hea003MobileMenuToggle} ${
            isMenuOpen ? styles.hea003Active : ''
          }`}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
};

export default Header;