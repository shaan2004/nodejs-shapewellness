"use client";

import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Lenis from 'lenis';

export default function Treatments() {
  
  // --- STATE ---
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

      sr.reveal('.hero-title, .hero-subtitle, .hero-desc');
      
      // Target content inside sticky cards so sticky logic doesn't break
      sr.reveal('.treatment-card .card-img-container, .treatment-card .card-content', { 
        interval: 100,
        origin: 'bottom',
        distance: '30px'
      });

      sr.reveal('.footer-grid div', { interval: 100, origin: 'bottom', distance: '30px' });
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  // --- HANDLERS ---
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

      {/* --- MODAL --- */}
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
        {/* --- HERO --- */}
        <section className="page-hero">
          <div className="container">
            <span className="hero-subtitle">Our Expertise</span>
            <h1 className="hero-title">Advanced Treatments & <br/> Technologies</h1>
            <p className="hero-desc">Discover our comprehensive range of aesthetic solutions, powered by cutting-edge technology and performed by certified experts.</p>
          </div>
        </section>

        {/* --- STACKING CARDS SECTION --- */}
        <section className="treatment-section">
          <div className="container">
            <div className="treatment-grid">
              
              {/* Card 1 */}
              <div className="treatment-card">
                <div className="card-img-container">
                  <div className="card-img" style={{ backgroundImage: "url('/assets/prp.png')" }}></div>
                </div>
                <div className="card-content">
                  <span className="card-category">Skin Rejuvenation</span>
                  <h3 className="card-title">PRP Skin Therapy</h3>
                  <p className="card-text">Platelet-Rich Plasma (PRP) therapy utilizes your body's own growth factors to stimulate collagen production, reduce fine lines, and improve skin texture for a natural glow.</p>
                  <button className="btn-card-link" onClick={() => setIsModalOpen(true)}>Book Consultation <i className="fas fa-arrow-right"></i></button>
                </div>
              </div>

              {/* Card 2 */}
              <div className="treatment-card">
                <div className="card-img-container">
                  <div className="card-img" style={{ backgroundImage: "url('/assets/needling.png')" }}></div>
                </div>
                <div className="card-content">
                  <span className="card-category">Skin Restoration</span>
                  <h3 className="card-title">Micro Needling</h3>
                  <p className="card-text">A minimally invasive procedure that treats acne scars, enlarged pores, and wrinkles by triggering the skin's natural repair process using fine sterile needles.</p>
                  <button className="btn-card-link" onClick={() => setIsModalOpen(true)}>Book Consultation <i className="fas fa-arrow-right"></i></button>
                </div>
              </div>

              {/* Card 3 */}
              <div className="treatment-card">
                <div className="card-img-container">
                  <div className="card-img" style={{ backgroundImage: "url('/assets/whitening.png')" }}></div>
                </div>
                <div className="card-content">
                  <span className="card-category">Complexion</span>
                  <h3 className="card-title">Skin Whitening</h3>
                  <p className="card-text">Advanced pigmentation correction treatments designed to even out skin tone, reduce sun spots, and restore radiance to dull or pigmented skin.</p>
                  <button className="btn-card-link" onClick={() => setIsModalOpen(true)}>Book Consultation <i className="fas fa-arrow-right"></i></button>
                </div>
              </div>

              {/* Card 4 */}
              <div className="treatment-card">
                <div className="card-img-container">
                  <div className="card-img" style={{ backgroundImage: "url('/assets/laser.png')" }}></div>
                </div>
                <div className="card-content">
                  <span className="card-category">Laser Technology</span>
                  <h3 className="card-title">Laser Hair Removal</h3>
                  <p className="card-text">Experience pain-free, long-lasting hair reduction using state-of-the-art diode laser technology suitable for all skin types.</p>
                  <button className="btn-card-link" onClick={() => setIsModalOpen(true)}>Book Consultation <i className="fas fa-arrow-right"></i></button>
                </div>
              </div>

              {/* Card 5 */}
              <div className="treatment-card">
                <div className="card-img-container">
                  <div className="card-img" style={{ backgroundImage: "url('/assets/acne.png')" }}></div>
                </div>
                <div className="card-content">
                  <span className="card-category">Dermatology</span>
                  <h3 className="card-title">Acne Treatment</h3>
                  <p className="card-text">Customized chemical peels and medical facials to target active acne, reduce inflammation, and minimize post-acne scarring.</p>
                  <button className="btn-card-link" onClick={() => setIsModalOpen(true)}>Book Consultation <i className="fas fa-arrow-right"></i></button>
                </div>
              </div>

              {/* Card 6 */}
              <div className="treatment-card">
                <div className="card-img-container">
                  <div className="card-img" style={{ backgroundImage: "url('/assets/body.png')" }}></div>
                </div>
                <div className="card-content">
                  <span className="card-category">Body Sculpting</span>
                  <h3 className="card-title">Body Contouring</h3>
                  <p className="card-text">Non-invasive fat reduction technologies like CoolSculpting and RF therapy to shape, tone, and firm stubborn areas without surgery.</p>
                  <button className="btn-card-link" onClick={() => setIsModalOpen(true)}>Book Consultation <i className="fas fa-arrow-right"></i></button>
                </div>
              </div>

              {/* Card 7 */}
              <div className="treatment-card">
                <div className="card-img-container">
                  <div className="card-img" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80')" }}></div>
                </div>
                <div className="card-content">
                  <span className="card-category">Smile Care</span>
                  <h3 className="card-title">Dental Aesthetics</h3>
                  <p className="card-text">Comprehensive dental solutions including teeth whitening, veneers, and smile designing to perfect your smile.</p>
                  <button className="btn-card-link" onClick={() => setIsModalOpen(true)}>Book Consultation <i className="fas fa-arrow-right"></i></button>
                </div>
              </div>

              {/* Card 8 */}
              <div className="treatment-card">
                <div className="card-img-container">
                  <div className="card-img" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=800&q=80')" }}></div>
                </div>
                <div className="card-content">
                  <span className="card-category">Special Occasion</span>
                  <h3 className="card-title">Bridal Packages</h3>
                  <p className="card-text">Curated pre-bridal packages including full body polishing, glow facials, and hair spa to make you shine on your big day.</p>
                  <button className="btn-card-link" onClick={() => setIsModalOpen(true)}>Book Consultation <i className="fas fa-arrow-right"></i></button>
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