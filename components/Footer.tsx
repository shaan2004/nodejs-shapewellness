import Link from 'next/link';

export default function Footer() {
  return (
    <footer id="footer-main">
      <div className="container">
        <div className="footer-grid">
          
          {/* Column 1: Logo & Tagline */}
          <div className="footer-col">
            <img 
              src="/assets/Shape Wellness Logo Final.png" 
              alt="Shape Wellness" 
              className="logo-img" 
              style={{height: '50px', marginBottom: '20px'}} 
            />
            <p style={{color: '#666'}}>Redefining beauty standards through science.</p>
          </div>

          {/* Column 2: Menu Links */}
          <div className="footer-col">
            <h4 style={{marginBottom: '20px'}}>Menu</h4>
            <div className="footer-links">
              <Link href="/"><i className="fas fa-chevron-right"></i> Home</Link>
              <Link href="/experience"><i className="fas fa-chevron-right"></i> Experience</Link>
              <Link href="/treatments"><i className="fas fa-chevron-right"></i> Treatments</Link>
              <Link href="/about"><i className="fas fa-chevron-right"></i> About Us</Link>
              <Link href="/contact"><i className="fas fa-chevron-right"></i> Contact</Link>
            </div>
          </div>

          {/* Column 3: Social Links with Icons */}
          <div className="footer-col">
             <h4 style={{marginBottom: '20px'}}>Social</h4>
             <div className="footer-links social-icons">
                <a href="https://www.instagram.com/shapewellness.chennai/#" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-instagram"></i> Instagram
                </a>
                <a href="https://www.threads.com/@shapewellness.chennai" target="_blank" rel="noopener noreferrer">
                  <i className="fas fa-at"></i> Threads
                </a>
                <a href="https://www.facebook.com/profile.php?id=61578854806823#" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-facebook-f"></i> Facebook
                </a>
                <a href="https://wa.me/919500559119" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-whatsapp"></i> WhatsApp
                </a>
             </div>
          </div>

          {/* Column 4: Visit Info with Icons */}
          <div className="footer-col">
             <h4 style={{marginBottom: '20px'}}>Visit</h4>
             <ul className="visit-info">
                <li>
                  <i className="fas fa-envelope"></i> 
                  <span>Info@shapewellness.in</span>
                </li>
                <li>
                  <i className="fas fa-map-marker-alt"></i>
                  <span>
                    No 6, Sri Mahalakshmi Nagar,<br/>
                    Manapakkam Main Rd, Chennai 600122
                  </span>
                </li>
                <li>
                  <i className="fas fa-clock"></i>
                  <span>Open Daily 10:30am - 8pm</span>
                </li>
             </ul>
          </div>

        </div>
        <div className="copyright">© 2026 Shape Wellness. All Rights Reserved.</div>
      </div>

      <style jsx>{`
        .footer-links a {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
          color: #666;
          text-decoration: none;
          transition: color 0.3s;
        }
        
        .footer-links a:hover {
          color: #e65100; /* Using your brand orange */
        }

        .footer-links i {
          font-size: 14px;
          width: 20px; /* Ensures consistent alignment */
          text-align: center;
        }

        .visit-info {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .visit-info li {
          display: flex;
          gap: 12px;
          margin-bottom: 15px;
          color: #888;
          font-size: 0.9rem;
          line-height: 1.4;
        }

        .visit-info i {
          color: #e65100; /* Using your brand orange for contact icons */
          margin-top: 4px;
        }

        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr 1fr; gap: 30px; }
        }
      `}</style>
    </footer>
  );
}