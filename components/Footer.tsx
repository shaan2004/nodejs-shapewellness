import Link from 'next/link';

export default function Footer() {
  return (
    <footer id="footer-main">
      <div className="container">
        <div className="footer-grid">
          
          {/* Column 1: Logo & Tagline */}
          <div>
            <img 
              src="/assets/Shape Wellness Logo Final.png" 
              alt="Shape Wellness" 
              className="logo-img" 
              style={{height: '50px', marginBottom: '20px'}} 
            />
            <p style={{color: '#666'}}>Redefining beauty standards through science.</p>
          </div>

          {/* Column 2: Menu Links */}
          <div>
            <h4 style={{marginBottom: '20px'}}>Menu</h4>
            <div className="footer-links">
              <Link href="/">Home</Link>
              <Link href="/experience">Experience</Link>
              <Link href="/treatments">Treatments</Link>
              <Link href="/about">About Us</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </div>

          {/* Column 3: Social Links (RESTORED) */}
          <div>
             <h4 style={{marginBottom: '20px'}}>Social</h4>
             <div className="footer-links">
                <a href="https://www.instagram.com/shapewellness.chennai/#" target="_blank" rel="noopener noreferrer">Instagram</a>
                <a href="https://www.threads.com/@shapewellness.chennai?xmt=AQF09m6VX1OBBPvAyk-d45R1SytIbNAvjjGAlX40SLqbrak" target="_blank" rel="noopener noreferrer">Threads</a>
                <a href="https://www.facebook.com/profile.php?id=61578854806823#" target="_blank" rel="noopener noreferrer">Facebook</a>
                <a href="https://wa.me/919500559119" target="_blank" rel="noopener noreferrer">WhatsApp</a>
             </div>
          </div>

          {/* Column 4: Visit Info */}
          <div>
             <h4 style={{marginBottom: '20px'}}>Visit</h4>
             <p style={{color: '#888'}}>
                Info@shapewellness.in<br/>
                No 6, Sri Mahalakshmi Nagar,<br/>
                Manapakkam Main Rd,<br/>
                Kolapakkam, Chennai 600122<br/>
                Open Daily 10:30am - 8pm
             </p>
          </div>

        </div>
        <div className="copyright">© 2026 Shape Wellness. All Rights Reserved.</div>
      </div>
    </footer>
  );
}