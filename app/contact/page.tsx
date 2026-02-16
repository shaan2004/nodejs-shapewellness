"use client";
import { useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Lenis from 'lenis';

export default function Contact() {

  useEffect(() => {
    // 1. Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 2. Initialize ScrollReveal
    // Dynamic import to avoid "window is not defined" error during server render
    import('scrollreveal').then((module) => {
      const ScrollReveal = module.default;
      const sr = ScrollReveal({
        origin: 'bottom',
        distance: '60px',
        duration: 1000,
        delay: 200,
        easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
        reset: false
      });

      sr.reveal('.intro-section, .location-header-btn');
      sr.reveal('.contact-split-layout', { origin: 'left' });
      sr.reveal('.booking-section', { origin: 'right' });
      sr.reveal('.footer-grid div', { interval: 100, origin: 'bottom', distance: '30px' });
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  // Typesafe Form Handler
  const handleContactBooking = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Create FormData object to safely access inputs
    const formData = new FormData(e.currentTarget);
    const name = formData.get('cName') as string;
    
    alert(`Thank you, ${name}! Your request has been sent.`);
    
    // Reset form
    e.currentTarget.reset();
  };

  return (
    <>
      <Header />

      <main>
        <section className="contact-page-section page-padding">
          <div className="container">
            <div className="intro-section">
              <h1 className="intro-title">Get in Touch</h1>
              <p className="intro-text">
                Shape Wellness is a premier slimming, skin, and hair clinic located in Chennai Kolapakkam. We cater to both men and women seeking weight loss solutions, skin care treatments, and hair care services.
              </p>
            </div>

            <div className="location-header-btn">
              <i className="fas fa-map-marker-alt" style={{marginRight: '10px'}}></i> Visit Us
            </div>

            <div className="contact-split-layout">
              <div className="map-container">
                <iframe 
                  src="https://maps.google.com/maps?q=Shape+Wellness+No+6+Sri+mahalkkshmi+nagar+Manapakkam+Main+Rd+Kolapakkam+Chennai&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  allowFullScreen
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade">
                </iframe>
              </div>

              <div className="contact-info-container">
                <div className="contact-header-image">
                  <div className="brand-overlay-text">Shape Wellness</div>
                </div>
                <ul className="contact-details-list">
                  <li>
                    <div className="contact-icon-wrapper"><i className="fas fa-phone-alt"></i></div>
                    <div><strong>Call Us:</strong><br/>+91 9500 559 119</div>
                  </li>
                  <li>
                    <div className="contact-icon-wrapper"><i className="far fa-clock"></i></div>
                    <div><strong>Working Hours:</strong><br/>Mon - Sun, 10:30 am - 08:30 pm</div>
                  </li>
                  <li>
                    <div className="contact-icon-wrapper"><i className="fas fa-map-marker-alt"></i></div>
                    <div>
                        <strong>Address:</strong><br/>
                        No 6, Sri Mahalakshmi Nagar,<br/>
                        Manapakkam Main Rd,<br/>
                        Kolapakkam, Chennai 600122
                    </div>
                  </li>
                   <li>
                    <div className="contact-icon-wrapper"><i className="far fa-envelope"></i></div>
                     <div><strong>Email:</strong><br/>Info@shapewellness.in</div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="booking-section" id="book-appointment">
              <div className="booking-layout">
                <div className="booking-content">
                  <h2>Book an Appointment</h2>
                  <p>To schedule an appointment or inquire about our services, please fill out the form beside.</p>
                  <div style={{width: '100px', height: '4px', background: 'var(--primary-orange)', marginBottom: '20px'}}></div>
                  <p style={{fontSize: '0.9rem', color: '#888'}}>* Required fields</p>
                </div>

                <div className="inline-booking-box">
                  <form onSubmit={handleContactBooking}>
                    <div className="form-grid">
                      <div className="input-group">
                        <label>Full Name *</label>
                        <input type="text" name="cName" id="cName" required placeholder="John Doe" />
                      </div>
                      <div className="input-group">
                        <label>Phone Number *</label>
                        <input type="tel" name="cPhone" id="cPhone" required placeholder="+91 00000 00000" />
                      </div>
                      <div className="input-group">
                        <label>Preferred Date</label>
                        <input type="date" name="cDate" id="cDate" required />
                      </div>
                      <div className="input-group">
                        <label>Time</label>
                        <input type="time" name="pTime" id="pTime" required />
                      </div>
                      <div className="input-group full-width">
                        <label>Service</label>
                        <select id="cService" name="cService">
                            <option>Select a Service</option>
                            <option>Slimming</option>
                            <option>Skin Care</option>
                        </select>
                      </div>
                      <div className="input-group full-width">
                        <label>Message</label>
                        <textarea id="cMessage" name="cMessage" placeholder="Tell us more..."></textarea>
                      </div>
                    </div>
                    <button type="submit" className="btn-submit">Confirm Appointment Request</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}