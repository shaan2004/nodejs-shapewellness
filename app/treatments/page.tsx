"use client";

import { useEffect, useState, useCallback } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Lenis from 'lenis';

export default function Treatments() {
  
  // --- STATE ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState<{id: string, date: string, time: string, service: string} | null>(null);

  // --- EFFECT: SCROLL LOGIC ---
  useEffect(() => {
    // 1. Init Lenis for smooth stacking transitions
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.5,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // 2. Init ScrollReveal
    const initSR = async () => {
      const module = await import('scrollreveal');
      const sr = module.default({
        origin: 'bottom',
        distance: '40px',
        duration: 1000,
        delay: 200,
        easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
        reset: false
      });

      sr.reveal('.hero-title, .hero-subtitle, .hero-desc');
      
      // Reveal internal content only to avoid breaking the 'sticky' container logic
      sr.reveal('.card-img-container, .card-content', { 
        interval: 100,
        origin: 'bottom',
        distance: '20px'
      });

      sr.reveal('.footer-grid div', { interval: 100, origin: 'bottom', distance: '30px' });
    };

    initSR();

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
    };
  }, []);

  // --- HANDLERS ---
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
  }, []);

  return (
    <>
      <Header />

      {/* --- MODAL --- */}
      {isModalOpen && (
        <div className="modal-overlay" style={{ display: 'flex' }}>
          <div className="modal-box">
            <span className="close-btn" onClick={closeModal}>×</span>
            {!bookingSuccess ? (
              <div className="modal-form">
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
            ) : (
              <div className="success-message" style={{ display: 'block', width: '100%', textAlign: 'center' }}>
                <i className="fas fa-check-circle" style={{ fontSize: '50px', color: 'var(--primary-orange)', marginBottom: '20px' }}></i>
                <h2>Confirmed!</h2>
                <button className="btn-appoint" onClick={closeModal}>Close</button>
              </div>
            )}
          </div>
        </div>
      )}

      <main>
        {/* --- HERO --- */}
        <section className="page-hero">
          <div className="container">
            <span className="hero-subtitle">Our Expertise</span>
            <h1 className="hero-title">Advanced Treatments & <br/> Technologies</h1>
            <p className="hero-desc">Discover our comprehensive range of aesthetic solutions, powered by cutting-edge technology.</p>
          </div>
        </section>

        {/* --- STACKING CARDS SECTION --- */}
        <section className="treatment-section">
          <div className="container">
            <div className="treatment-grid">
              
              {[
                { title: "PRP Skin Therapy", cat: "Skin Rejuvenation", img: "/assets/prp.webp", text: "Platelet-Rich Plasma (PRP) therapy utilizes your body's own growth factors to stimulate collagen production." },
                { title: "Micro Needling", cat: "Skin Restoration", img: "/assets/needling.webp", text: "A minimally invasive procedure that treats acne scars and wrinkles using fine sterile needles." },
                { title: "Skin Whitening", cat: "Complexion", img: "/assets/whitening.webp", text: "Advanced pigmentation correction treatments designed to even out skin tone and restore radiance." },
                { title: "Laser Hair Removal", cat: "Laser Technology", img: "/assets/laser.webp", text: "Experience pain-free, long-lasting hair reduction using state-of-the-art diode laser technology." },
                { title: "Acne Treatment", cat: "Dermatology", img: "/assets/acne.webp", text: "Customized chemical peels and medical facials to target active acne and reduce inflammation." },
                { title: "Body Contouring", cat: "Body Sculpting", img: "/assets/body.webp", text: "Non-invasive fat reduction technologies to shape, tone, and firm stubborn areas." },
                { title: "Dental Aesthetics", cat: "Smile Care", img: "/assets/dental aesthetic.webp", text: "Comprehensive dental solutions including teeth whitening and veneers to perfect your smile." },
                { title: "Bridal Packages", cat: "Special Occasion", img: "/assets/bridal.webp", text: "Curated pre-bridal packages to make you shine on your big day." }
              ].map((item, index) => (
                <div 
                  className="treatment-card" 
                  key={index}
                  style={{ 
                    position: 'sticky', 
                    top: `${100 + (index * 20)}px`, // Restores the stacking overlap logic
                    transform: 'translateZ(0)', // GPU acceleration for smooth sticky scroll
                    marginBottom: '50px' 
                  }}
                >
                  <div className="card-img-container">
                    <div className="card-img" style={{ backgroundImage: `url('${item.img}')` }}></div>
                  </div>
                  <div className="card-content">
                    <span className="card-category">{item.cat}</span>
                    <h3 className="card-title">{item.title}</h3>
                    <p className="card-text">{item.text}</p>
                    <button className="btn-card-link" onClick={() => setIsModalOpen(true)}>
                      Book Consultation <i className="fas fa-arrow-right"></i>
                    </button>
                  </div>
                </div>
              ))}

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}