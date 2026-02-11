"use client";

import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Lenis from 'lenis';

export default function About() {
  
  // --- STATE FOR MODAL (If needed globally or reused) ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState<{id: string, date: string, time: string, service: string} | null>(null);

  // --- EFFECT: SCROLL LOGIC ---
  useEffect(() => {
    // 1. Init Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 2. Init ScrollReveal
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

      sr.reveal('.hero-title, .hero-subtitle');
      sr.reveal('.content-card', { interval: 200 }); // Cards reveal one after another
      sr.reveal('.footer-grid div', { interval: 100, origin: 'bottom', distance: '30px' });
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  // --- HANDLERS (Reusing standard booking logic) ---
  const handleBooking = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    setBookingSuccess({
      id: "#SW" + Math.floor(Math.random() * 9000),
      date: formData.get('pDate') as string,
      time: formData.get('pTime') as string,
      service: formData.get('pService') as string,
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setBookingSuccess(null);
  };

  return (
    <>
      <Header />

      {/* --- REUSABLE MODAL --- */}
      {isModalOpen && (
        <div className="modal-overlay" style={{ display: 'flex' }}>
          <div className="modal-box">
            <span className="close-btn" onClick={closeModal}>×</span>
            
            {!bookingSuccess && (
              <>
                <div className="modal-image"></div>
                <div className="modal-form" id="modalFormSection">
                  <h2 style={{ fontFamily: "'Playfair Display', serif", marginBottom: '5px' }}>Book Appointment</h2>
                  <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '25px' }}>Complete the form to schedule your visit.</p>
                  <form onSubmit={handleBooking}>
                    <div className="form-grid">
                      <div className="input-group"><label>Name</label><input type="text" name="pName" required /></div>
                      <div className="input-group"><label>Phone</label><input type="tel" name="pPhone" required /></div>
                      <div className="input-group"><label>Date</label><input type="date" name="pDate" required /></div>
                      <div className="input-group"><label>Time</label><input type="time" name="pTime" required /></div>
                      <div className="input-group full-width">
                        <label>Service</label>
                        <select name="pService">
                          <option>Slimming</option>
                          <option>Skin Care</option>
                          <option>Hair Restoration</option>
                          <option>Laser Tech</option>
                          <option>Dental Aesthetics</option>
                          <option>Bridal Studio</option>
                        </select>
                      </div>
                      <div className="input-group full-width"><label>Message</label><textarea name="pMessage" placeholder="Any specific concerns?"></textarea></div>
                    </div>
                    <button type="submit" className="btn-appoint" style={{ width: '100%', marginTop: '10px' }}>Confirm Booking</button>
                  </form>
                </div>
              </>
            )}

            {bookingSuccess && (
              <div className="success-message" style={{ display: 'block', width: '100%' }}>
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
        <section className="about-hero">
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
                <button className="btn-outline" onClick={() => setIsModalOpen(true)}>Learn More</button>
              </div>
              <div className="card-image-wrapper">
                <div className="card-img" style={{ backgroundImage: "url('/assets/After-care-mob.webp')" }}></div>
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
                <button className="btn-outline" onClick={() => setIsModalOpen(true)}>Discover Now</button>
              </div>
              <div className="card-image-wrapper">
                <div className="journey-graphic">
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
                <button className="btn-outline" onClick={() => setIsModalOpen(true)}>Explore</button>
              </div>
              <div className="card-image-wrapper">
                <div className="card-img" style={{ backgroundImage: "url('/assets/Gemini_Generated_Image_yvy2dfyvy2dfyvy2.png')" }}></div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}