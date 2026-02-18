"use client";

import { useEffect, useCallback, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Lenis from 'lenis';

export default function Contact() {
  // --- STATE FOR INLINE SUCCESS POP-UP ---
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingData, setBookingData] = useState({ id: '', date: '', service: '' });

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

  // --- UPDATED HANDLER TO SHOW POP-UP ---
  const handleContactBooking = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    // Set data for the success message
    setBookingData({
      id: "SW-" + Math.floor(1000 + Math.random() * 9000),
      date: formData.get('cDate') as string,
      service: formData.get('cService') as string || "General Consultation"
    });

    setIsSubmitted(true);
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
                    minHeight: '400px',
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

            {/* --- UPDATED BOOKING SECTION WITH DATE & MESSAGE --- */}
            <div className="booking-section" id="book-appointment">
              <div className="booking-layout">
                {!isSubmitted ? (
                  <>
                    <div className="booking-content">
                      <h2>Book an Appointment</h2>
                      <p>To schedule an appointment or inquire about our services, please fill out the form beside.</p>
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
                          
                          {/* NEW DATE FIELD */}
                          <div className="input-group">
                            <label htmlFor="cDate">Preferred Date *</label>
                            <input type="date" name="cDate" id="cDate" required />
                          </div>

                          <div className="input-group">
                            <label htmlFor="cService">Service</label>
                            <select id="cService" name="cService" defaultValue="">
                                <option value="" disabled>Select a Service</option>
                                <option value="Slimming">Slimming</option>
                                <option value="Skin Care">Skin Care</option>
                                <option value="Hair Restoration">Hair Restoration</option>
                                <option value="Other">Other</option>
                            </select>
                          </div>

                          {/* NEW MESSAGE FIELD */}
                          <div className="input-group full-width">
                            <label htmlFor="cMessage">Message</label>
                            <textarea id="cMessage" name="cMessage" placeholder="Tell us more about your concerns..." rows={3}></textarea>
                          </div>
                        </div>
                        <button type="submit" className="btn-submit" style={{ width: '100%' }}>
                          Confirm Appointment Request
                        </button>
                      </form>
                    </div>
                  </>
                ) : (
                  /* --- SUCCESS POP-UP STYLE VIEW --- */
                  <div className="success-container" style={{ width: '100%', textAlign: 'center', padding: '40px 0' }}>
                    <i className="fas fa-check-circle" style={{ fontSize: '60px', color: 'var(--primary-orange)', marginBottom: '20px' }}></i>
                    <h2 style={{ fontFamily: 'var(--font-playfair)', fontSize: '32px', marginBottom: '10px' }}>Confirmed!</h2>
                    <p style={{ color: '#666', marginBottom: '30px' }}>Your appointment request has been successfully submitted.</p>
                    
                    <div className="appoint-details" style={{ background: '#f9f9f9', padding: '25px', borderRadius: '10px', maxWidth: '400px', margin: '0 auto', textAlign: 'left', border: '1px solid #eee' }}>
                      <p style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', borderBottom: '1px solid #eee', paddingBottom: '5px' }}>
                        <strong>Booking ID:</strong> <span style={{ color: 'var(--primary-orange)', fontWeight: 'bold' }}>{bookingData.id}</span>
                      </p>
                      <p style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', borderBottom: '1px solid #eee', paddingBottom: '5px' }}>
                        <strong>Date:</strong> <span>{bookingData.date}</span>
                      </p>
                      <p style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <strong>Service:</strong> <span>{bookingData.service}</span>
                      </p>
                    </div>
                    
                    <button 
                      className="btn-submit" 
                      onClick={() => setIsSubmitted(false)} 
                      style={{ marginTop: '30px', width: 'auto', padding: '12px 60px' }}
                    >
                      Done
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}