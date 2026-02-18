"use client";

import { useEffect, useState, useCallback, useMemo } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Lenis from 'lenis';

export default function About() {
  
  // --- STATE FOR MODAL ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState<{id: string, date: string, time: string, service: string} | null>(null);
  const [selectedService, setSelectedService] = useState("");

  // --- EFFECT: SCROLL LOGIC ---
  useEffect(() => {
    // 1. Init Lenis with optimized requestAnimationFrame
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2, // Better feel on mobile
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // 2. Optimized ScrollReveal
    const initSR = async () => {
      const module = await import('scrollreveal');
      const sr = module.default({
        origin: 'bottom',
        distance: '30px', // Reduced distance for mobile performance
        duration: 1000,
        delay: 150,
        easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
        reset: false,
        mobile: true,
      });

      sr.reveal('.hero-title, .hero-subtitle');
      sr.reveal('.content-card', { interval: 150 }); 
      sr.reveal('.footer-grid div', { interval: 80, origin: 'bottom', distance: '20px' });
    };

    initSR();

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
    };
  }, []);

  // --- MEMOIZED HANDLERS ---
  const handleBooking = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    setBookingSuccess({
      id: "#SW" + Math.floor(Math.random() * 9000),
      date: formData.get('pDate') as string,
      time: formData.get('pTime') as string,
      service: formData.get('pService') as string,
    });
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setBookingSuccess(null);
    setSelectedService("");
  }, []);

  const toggleModal = useCallback(() => {
    setIsModalOpen(prev => !prev);
  }, []);

  return (
    <>
      <Header />

      {/* --- REUSABLE MODAL --- */}
      {isModalOpen && (
        <div className="modal-overlay" style={{ display: 'flex', backdropFilter: 'blur(8px)' }}>
          <div className="modal-box">
            <span className="close-btn" onClick={closeModal} role="button" aria-label="Close Modal">×</span>
            
            {!bookingSuccess ? (
              <>
                <div className="modal-image" style={{ willChange: 'transform' }}></div>
                <div className="modal-form" id="modalFormSection">
                  <h2 style={{ fontFamily: "'Playfair Display', serif", marginBottom: '5px' }}>Book Appointment</h2>
                  <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '25px' }}>Complete the form to schedule your visit.</p>
                  <form onSubmit={handleBooking}>
                    <div className="form-grid">
                      <div className="input-group"><label>Name</label><input type="text" name="pName" placeholder="Full name" required /></div>
                      <div className="input-group"><label>Phone</label><input type="tel" name="pPhone" placeholder="Enter Phone No" required /></div>
                      <div className="input-group"><label>Date</label><input type="date" name="pDate" required /></div>
                      <div className="input-group"><label>Time</label><input type="time" name="pTime" required /></div>
                      <div className="input-group full-width">
                        <label>Service</label>
                        <select 
                          name="pService" 
                          required 
                          value={selectedService}
                          onChange={(e) => setSelectedService(e.target.value)}
                        >
                          <option value="" disabled>Select a service</option>
                          <option value="Slimming">Slimming</option>
                          <option value="Skin Care">Skin Care</option>
                          <option value="Hair Restoration">Hair Restoration</option>
                          <option value="Laser Tech">Laser Tech</option>
                          <option value="Dental Aesthetics">Dental Aesthetics</option>
                          <option value="Bridal Studio">Bridal Studio</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      {selectedService === "Other" && (
                        <div className="input-group full-width reveal-animation">
                          <label>Please Specify</label>
                          <textarea 
                            name="pMessage" 
                            placeholder="Tell us more about the service you need..."
                            required
                          ></textarea>
                        </div>
                      )}
                    </div>
                    <button type="submit" className="btn-appoint" style={{ width: '100%', marginTop: '10px' }}>Confirm Booking</button>
                  </form>
                </div>
              </>
            ) : (
              <div className="success-message" style={{ display: 'block', width: '100%', textAlign: 'center' }}>
                <i className="fas fa-check-circle" style={{ fontSize: '50px', color: 'var(--primary-orange)', marginBottom: '20px' }}></i>
                <h2 style={{ fontFamily: "'Playfair Display', serif" }}>Appointment Confirmed!</h2>
                <p style={{ color: '#666' }}>Thank you. Your consultation is booked.</p>
                <div className="appoint-details">
                  <p><strong>ID:</strong> <span style={{ color: 'var(--primary-orange)' }}>{bookingSuccess.id}</span></p>
                  <p><strong>Date:</strong> <span>{bookingSuccess.date}</span></p>
                  <p><strong>Time:</strong> <span>{bookingSuccess.time}</span></p>
                  <p><strong>Service:</strong> <span>{bookingSuccess.service}</span></p>
                </div>
                <button className="btn-appoint" onClick={closeModal} style={{ marginTop: '20px' }}>Close</button>
              </div>
            )}
          </div>
        </div>
      )}

      <main>
        {/* --- ABOUT HERO --- */}
        <section className="about-hero" style={{ willChange: 'contents' }}>
          <div className="container">
            <span className="hero-subtitle">Who We Are</span>
            <h1 className="hero-title">Redefining Aesthetics with Science & Care.</h1>
          </div>
        </section>

        {/* --- CARD 1: ENHANCING WELL-BEING --- */}
        <section className="card-section">
          <div className="container">
            <div className="content-card">
              <div className="card-text">
                <h2 className="card-title">Enhancing Your <br/><span style={{ color: 'var(--primary-orange)' }}>Well-being</span></h2>
                <p className="card-desc">At Shape Wellness, we are dedicated to providing a first-of-its-kind experience in slimming, skin, and hair care in Chennai Kolapakkam. Our tailored services cater to both men and women seeking weight loss solutions, skin rejuvenation, and hair care treatments.</p>
                <button className="btn-outline" onClick={toggleModal}>Learn More</button>
              </div>
              <div className="card-image-wrapper">
                <div className="card-img" style={{ backgroundImage: "url('/assets/After-care-mob.webp')", transform: 'translateZ(0)' }}></div>
              </div>
            </div>
          </div>
        </section>

        {/* --- CARD 2: JOURNEY (Reversed) --- */}
        <section className="card-section">
          <div className="container">
            <div className="content-card reversed">
              <div className="card-text">
                <h2 className="card-title">Our Journey</h2>
                <p className="card-desc">Shape Wellness has a rich history of transforming lives through our innovative slimming, skin, and hair care solutions. Since our inception, we have been at the forefront of delivering exceptional services that have set us apart as pioneers in the industry.</p>
                <button className="btn-outline" onClick={toggleModal}>Discover Now</button>
              </div>
              <div className="card-image-wrapper">
                <div className="journey-graphic" style={{ transform: 'translateZ(0)' }}>
                  <div className="shadow-overlay"></div>
                  <h2>Our Journey</h2>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- CARD 3: BELIEFS --- */}
        <section className="card-section">
          <div className="container">
            <div className="content-card">
              <div className="card-text">
                <span style={{ textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 700, color: '#888', fontSize: '0.9rem', marginBottom: '10px', display: 'block' }}>Core Values</span>
                <h2 className="card-title">Our Beliefs</h2>
                <p className="card-desc">At Shape Wellness, our philosophy revolves around empowering individuals to embrace their unique beauty and wellness journey. We believe in holistic approaches that combine advanced technology with personalized care to achieve transformative results.</p>
                <button className="btn-outline" onClick={toggleModal}>Explore</button>
              </div>
              <div className="card-image-wrapper">
                <div className="card-img" style={{ backgroundImage: "url('/assets/Gemini_Generated_Image_yvy2dfyvy2dfyvy2.webp')", transform: 'translateZ(0)' }}></div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}