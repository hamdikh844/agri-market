// src/components/Footer.js
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const handleSocialClick = (platform) => {
    console.log(`Social link clicked: ${platform}`);
    // Add your custom behavior here
  };

  return (
    <footer className="bg-dark text-white py-4">
      <div className="container">
        {/* ... other footer content ... */}
        
        <div className="social-icons mt-3">
          <button 
            onClick={() => handleSocialClick('facebook')} 
            className="btn btn-link text-white me-3 p-0 border-0"
            aria-label="Facebook"
          >
            <FaFacebook />
          </button>
          <button 
            onClick={() => handleSocialClick('twitter')} 
            className="btn btn-link text-white me-3 p-0 border-0"
            aria-label="Twitter"
          >
            <FaTwitter />
          </button>
          <button 
            onClick={() => handleSocialClick('instagram')} 
            className="btn btn-link text-white me-3 p-0 border-0"
            aria-label="Instagram"
          >
            <FaInstagram />
          </button>
          <button 
            onClick={() => handleSocialClick('linkedin')} 
            className="btn btn-link text-white p-0 border-0"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </button>
        </div>
        
        {/* ... rest of footer ... */}
      </div>
    </footer>
  );
};

export default Footer;