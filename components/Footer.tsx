import Link from 'next/link';

export default function Footer() {
  return (
    <footer id="footer-main">
      <div className="container">
        <div className="footer-grid">
          
          {/* Column 1: Logo & Tagline - SEO Optimized Tagline */}
          <div className="footer-col">
            <img 
              src="/assets/Shape Wellness Logo Final.png" 
              alt="Shape Wellness Logo" 
              width={150} 
              height={80} 
              fetchPriority="high" 
              loading="eager" 
              style={{ width: '110px', height: '80px' }} 
            />
            <p style={{color: '#666', marginTop: '10px'}}>
              <strong>Aesthetic Clinic in Chennai</strong> — Redefining beauty standards through advanced dermatology and science.
            </p>
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

          {/* Column 3: SEO Keywords Column - New! */}
          <div className="footer-col">
            <h4 style={{marginBottom: '20px'}}>Our Specialties</h4>
            <div className="footer-links" style={{fontSize: '0.85rem', color: '#888'}}>
              <span style={{marginBottom: '8px', display: 'block'}}>• Best Dermatology Clinic Chennai</span>
              <span style={{marginBottom: '8px', display: 'block'}}>• PRP Skin & Hair Therapy</span>
              <span style={{marginBottom: '8px', display: 'block'}}>• HydraFacial Chennai</span>
              <span style={{marginBottom: '8px', display: 'block'}}>• Laser Hair Removal</span>
              <span style={{marginBottom: '8px', display: 'block'}}>• Body Contouring & Fat Reduction</span>
              <span style={{marginBottom: '8px', display: 'block'}}>• Bridal Skincare Packages</span>
            </div>
          </div>

          {/* Column 4: Visit Info */}
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
                    <strong>Shape Wellness Chennai</strong><br/>
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

        {/* SEO Social Row */}
        <div className="footer-social-row" style={{borderTop: '1px solid #eee', paddingTop: '20px', marginTop: '40px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px'}}>
           <div className="footer-links social-icons" style={{display: 'flex', gap: '20px'}}>
                <a href="https://www.instagram.com/shapewellness.chennai/#" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-instagram"></i> Instagram
                </a>
                <a href="https://wa.me/919500559119" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-whatsapp"></i> WhatsApp
                </a>
                <a href="https://www.facebook.com/profile.php?id=61578854806823#" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-facebook-f"></i> Facebook
                </a>
           </div>
           <div className="copyright">© 2026 Shape Wellness | Advanced Skin, Hair & Laser Clinic Chennai</div>
        </div>
      </div>

      <style jsx>{`
        .footer-links a, .footer-links span {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
          color: #666;
          text-decoration: none;
          transition: color 0.3s;
        }
        
        .footer-links a:hover {
          color: #F26522;
        }

        .footer-links i {
          font-size: 14px;
          width: 20px;
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
          color: #F26522;
          margin-top: 4px;
        }

        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr; gap: 30px; }
          .footer-social-row { flex-direction: column; text-align: center; align-items: center; }
        }
        @media (max-width: 600px) {
          .footer-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </footer>
  );
}