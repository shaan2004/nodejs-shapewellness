"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function About() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState<{id: string, date: string, time: string, service: string} | null>(null);

  useEffect(() => {
    let lenisInstance: any;

    const initAnimations = async () => {
      // 1. Lazy-load Lenis for smooth scrolling
      const Lenis = (await import('lenis')).default;
      lenisInstance = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });

      function raf(time: number) {
        lenisInstance.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      // 2. Lazy-load ScrollReveal for entrance animations
      const ScrollReveal = (await import('scrollreveal')).default;
      const sr = ScrollReveal({
        origin: 'bottom',
        distance: '40px',
        duration: 1000,
        delay: 100,
        easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
        reset: false,
        viewFactor: 0.1,
      });

      sr.reveal('.hero-title, .hero-subtitle', { interval: 100 });
      sr.reveal('.content-card', { interval: 150 });
    };

    if (typeof window !== "undefined") {
      initAnimations();
    }

    return () => {
      if (lenisInstance) lenisInstance.destroy();
    };
  }, []);

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
            {!bookingSuccess ? (
              <div className="modal-form">
                <h2 className="font-playfair">Book Appointment</h2>
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
                      </select>
                    </div>
                  </div>
                  <button type="submit" className="btn-appoint" style={{ width: '100%' }}>Confirm Booking</button>
                </form>
              </div>
            ) : (
              <div className="success-message text-center">
                <i className="fas fa-check-circle success-icon" style={{ fontSize: '3rem', color: 'var(--primary-orange)' }}></i>
                <h2 className="font-playfair mt-3">Appointment Confirmed!</h2>
                <p>Your ID: {bookingSuccess.id}</p>
                <button className="btn-appoint mt-3" onClick={closeModal}>Close</button>
              </div>
            )}
          </div>
        </div>
      )}

      <main className="overflow-x-hidden">
        <section className="about-hero">
          <div className="container">
            <span className="hero-subtitle">Who We Are</span>
            <h1 className="hero-title font-playfair">Redefining Aesthetics with Science & Care.</h1>
          </div>
        </section>

        <section className="card-section">
          <div className="container">
            <div className="content-card">
              <div className="card-text">
                <h2 className="card-title font-playfair">Enhancing Your <br/><span className="text-primary">Well-being</span></h2>
                <p className="card-desc">At Shape Wellness, we are dedicated to providing a first-of-its-kind experience in slimming, skin, and hair care in Chennai Kolapakkam.</p>
                <button className="btn-outline" onClick={() => setIsModalOpen(true)}>Learn More</button>
              </div>
              <div className="card-image-wrapper">
                <Image 
                  src="/assets/After-care-mob.webp" 
                  alt="Aesthetic Clinic Chennai" 
                  fill 
                  className="object-cover"
                  sizes="(max-width: 900px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="card-section">
          <div className="container">
            <div className="content-card reversed">
              <div className="card-text">
                <h2 className="card-title font-playfair">Our Journey</h2>
                <p className="card-desc">Shape Wellness has a rich history of transforming lives through innovative aesthetics across Chennai.</p>
                <button className="btn-outline" onClick={() => setIsModalOpen(true)}>Discover Now</button>
              </div>
              <div className="card-image-wrapper">
                <div className="journey-graphic">
                  <div className="shadow-overlay"></div>
                  <h2 className="font-playfair">Our Journey</h2>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="card-section">
          <div className="container">
            <div className="content-card">
              <div className="card-text">
                <span className="core-values-label">Core Values</span>
                <h2 className="card-title font-playfair">Our Beliefs</h2>
                <p className="card-desc">Personalized care and advanced technology for transformative results.</p>
                <button className="btn-outline" onClick={() => setIsModalOpen(true)}>Explore</button>
              </div>
              <div className="card-image-wrapper">
                <Image 
                  src="/assets/Gemini_Generated_Image_yvy2dfyvy2dfyvy2.png" 
                  alt="Shape Wellness Beliefs" 
                  fill 
                  className="object-cover"
                  sizes="(max-width: 900px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}