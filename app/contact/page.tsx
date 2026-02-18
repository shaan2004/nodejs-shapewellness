"use client";

import { useEffect, useCallback } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Lenis from 'lenis';

export default function Contact() {

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    import('scrollreveal').then((module) => {
      const sr = module.default({
        origin: 'bottom',
        distance: '40px',
        duration: 1000,
        delay: 200,
        easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
        reset: false
      });

      sr.reveal('.intro-section, .location-header-btn');
      sr.reveal('.contact-split-layout', { origin: 'bottom', distance: '20px' });
      sr.reveal('.booking-section', { origin: 'bottom', distance: '20px' });
    });

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
    };
  }, []);

  const handleContactBooking = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('cName') as string;
    alert(`Thank you, ${name}! Your request has been sent.`);
    e.currentTarget.reset();
  }, []);

  return (
    <>
      <Header />

      <main style={{ overflowX: 'hidden' }}>
        <section className="contact-page-section page-padding">
          <div className="container">
            <div className="intro-section">
              <h1 className="intro-title">Get in Touch</h1>
              <p className="intro-text">
                Shape Wellness is a premier slimming, skin, and hair clinic located in Chennai Kolapakkam.
              </p>
            </div>

            <div className="location-header-btn">
              <i className="fas fa-map-marker-alt" style={{marginRight: '10px'}}></i> Visit Us
            </div>

            <div className="contact-split-layout">
              {/* FIXED MAP CONTAINER */}
              <div className="map-container" style={{ 
                position: 'relative', 
                overflow: 'hidden', 
                width: '100%',
                backgroundColor: '#f0f0f0',
                borderRadius: '15px'
              }}>
                <iframe 
                  src="https://maps.google.com/maps?q=Shape+Wellness+No+6+Sri+mahalkkshmi+nagar+Manapakkam+Main+Rd+Kolapakkam+Chennai&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  style={{ 
                    border: 0, 
                    width: '100%', 
                    height: '100%', 
                    minHeight: '400px', // Ensures mobile has enough vertical space
                    display: 'block'
                  }}
                  allowFullScreen
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Shape Wellness Google Maps Location"
                ></iframe>
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
                    <div className="contact-icon-wrapper"><i className="fas fa-map-marker-alt"></i></div>
                    <div>
                        <strong>Address:</strong><br/>
                        No 6, Sri Mahalakshmi Nagar, Manapakkam Main Rd,<br/>
                        Kolapakkam, Chennai 600122
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* FORM SECTION REMAINS THE SAME */}
            <div className="booking-section" id="book-appointment">
              <div className="booking-layout">
                <div className="booking-content">
                  <h2>Book an Appointment</h2>
                  <div style={{width: '60px', height: '4px', background: 'var(--primary-orange)', marginBottom: '20px'}}></div>
                </div>

                <div className="inline-booking-box">
                  <form onSubmit={handleContactBooking}>
                    <div className="form-grid">
                      <div className="input-group">
                        <label htmlFor="cName">Full Name *</label>
                        <input type="text" name="cName" id="cName" required placeholder="John Doe" />
                      </div>
                      <div className="input-group">
                        <label htmlFor="cPhone">Phone Number *</label>
                        <input type="tel" name="cPhone" id="cPhone" required placeholder="+91 00000 00000" />
                      </div>
                      <div className="input-group full-width">
                        <label htmlFor="cService">Service</label>
                        <select id="cService" name="cService" defaultValue="">
                            <option value="" disabled>Select a Service</option>
                            <option value="Slimming">Slimming</option>
                            <option value="Skin Care">Skin Care</option>
                            <option value="Hair Restoration">Hair Restoration</option>
                            <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                    <button type="submit" className="btn-submit" style={{ width: '100%' }}>
                      Confirm Appointment Request
                    </button>
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