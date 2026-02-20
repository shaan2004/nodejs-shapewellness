"use client";

import { useEffect, useState, useCallback } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import AppointmentModal from '../../components/AppointmentModal';
import Lenis from 'lenis';

export default function Treatments() {
  
  // --- STATE ---
  const [isModalOpen, setIsModalOpen] = useState(false);

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
  const openAppointment = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeAppointment = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <>
      {/* LCP Discovery Optimization: Fixes Lighthouse LCP discovery audit */}
      <link rel="preload" as="image" href="/assets/Shape Wellness Logo Final.png" fetchPriority="high" />
      
      <Header />

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
                    top: `${100 + (index * 20)}px`, 
                    transform: 'translateZ(0)', 
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
                    <button className="btn-card-link" onClick={openAppointment}>
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

      {/* Unified Appointment Modal */}
      <AppointmentModal isOpen={isModalOpen} onClose={closeAppointment} />
    </>
  );
}