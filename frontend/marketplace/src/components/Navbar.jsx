// src/components/Navbar.js
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import { FaGlobe, FaUser, FaLeaf } from 'react-icons/fa';

const Navbar = () => {
  const { t } = useTranslation();
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [isRTL, setIsRTL] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧', dir: 'ltr' },
    { code: 'fr', name: 'Français', flag: '🇫🇷', dir: 'ltr' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦', dir: 'rtl' }
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const changeLanguage = (lng) => {
    const selectedLanguage = languages.find(lang => lang.code === lng) || languages[0];
    i18n.changeLanguage(lng);
    document.documentElement.dir = selectedLanguage.dir;
    document.documentElement.lang = lng;
    setIsRTL(selectedLanguage.dir === 'rtl');
    setShowLanguageDropdown(false);
  };

  useEffect(() => {
    const dir = currentLanguage.dir;
    document.documentElement.dir = dir;
    document.documentElement.lang = currentLanguage.code;
    setIsRTL(dir === 'rtl');
  }, [currentLanguage]);

  return (
    <nav className={`navbar navbar-expand-lg navbar-dark bg-success shadow-sm sticky-top ${isRTL ? 'rtl' : ''}`}>
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <FaLeaf className="me-2 fs-4" />
          <span className="fs-4 fw-bold">{t('appName')}</span>
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={() => setShowLanguageDropdown(false)}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse">
          <ul className={`navbar-nav ${isRTL ? 'ms-0 me-auto' : 'ms-auto'} align-items-center`}>
            <li className="nav-item">
              <Link className="nav-link" to="/">{t('home')}</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products">{t('products')}</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/farmers">{t('farmers')}</Link>
            </li>
            
            {/* Language Selector */}
            <li className="nav-item dropdown mx-2">
              <div className="dropdown">
                <button 
                  className="btn btn-outline-light dropdown-toggle d-flex align-items-center"
                  onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                  aria-expanded={showLanguageDropdown}
                  aria-label={t('languageSelector')}
                >
                  <FaGlobe className="me-1" />
                  <span>{currentLanguage.flag} {currentLanguage.name}</span>
                </button>
                <ul 
                  className={`dropdown-menu ${showLanguageDropdown ? 'show' : ''} ${isRTL ? 'dropdown-menu-end' : ''}`}
                  style={{ minWidth: 'fit-content' }}
                >
                  {languages.map((lang) => (
                    <li key={lang.code}>
                      <button 
                        className={`dropdown-item d-flex align-items-center ${currentLanguage.code === lang.code ? 'active' : ''}`}
                        onClick={() => changeLanguage(lang.code)}
                        disabled={currentLanguage.code === lang.code}
                      >
                        <span className="me-2">{lang.flag}</span>
                        <span>{lang.name}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </li>

            <li className="nav-item">
              <Link className="btn btn-light" to="/login">
                <FaUser className="me-1" />
                <span>{t('login')}</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;