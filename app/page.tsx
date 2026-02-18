"use client";

import { useEffect, useState, useRef, useCallback } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Lenis from 'lenis';

export default function Home() {
  // --- STATE MANAGEMENT ---
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState<{id: string, date: string, time: string, service: string} | null>(null);

  // --- REFS ---
  const journeySectionRef = useRef<HTMLElement>(null);
  const journeyImgRef = useRef<HTMLDivElement>(null);
  const reviewSectionRef = useRef<HTMLElement>(null);
  const reviewBgRef = useRef<HTMLDivElement>(null);
  
  const sigWrapperRef = useRef<HTMLDivElement>(null);
  const sigTrackRef = useRef<HTMLDivElement>(null);
  const clinWrapperRef = useRef<HTMLDivElement>(null);
  const clinTrackRef = useRef<HTMLDivElement>(null);

  const heroImages = [
    '/assets/2025-09-21 (1).webp',
    '/assets/2025-09-21.webp',
    '/assets/shapewellness.webp'
  ];

  // --- PRELOADER ---
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  // --- HERO SLIDER ---
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  // --- CORE ANIMATION & SCROLL LOGIC ---
  useEffect(() => {
    // 1. Init Lenis for smooth scrolling
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

    // 2. Optimized Scroll Listener
    const handleScroll = () => {
      // Use MatchMedia for better performance than window.innerWidth checks
      if (window.matchMedia('(min-width: 900px)').matches) {
        // Journey Parallax
        if (journeySectionRef.current && journeyImgRef.current) {
          const rect = journeySectionRef.current.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            journeyImgRef.current.style.transform = `translate3d(0, ${rect.top * 0.15}px, 0)`;
          }
        }

        // Reviews Parallax
        if (reviewSectionRef.current && reviewBgRef.current) {
          const rect = reviewSectionRef.current.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            reviewBgRef.current.style.transform = `translate3d(0, ${rect.top * 0.15}px, 0)`;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // 3. Conditional ScrollReveal
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

      sr.reveal('.hero-content, .hero h1, .hero p');
      sr.reveal('.journey-content', { origin: 'left' });
      sr.reveal('.journey-img-wrapper', { origin: 'right' });
      sr.reveal('.section-header, .section-title');
      
      if (window.matchMedia('(min-width: 900px)').matches) {
        sr.reveal('.info-card', { interval: 100 });
        sr.reveal('.clinical-card', { interval: 100 });
      }
      
      sr.reveal('.review-card-outline', { interval: 100 });
      sr.reveal('.footer-grid div', { interval: 100, origin: 'bottom', distance: '20px' });
    };

    initSR();

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // --- HORIZONTAL MOUSE PAN ---
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent, track: HTMLElement) => {
      if (window.matchMedia('(min-width: 900px)').matches) {
        const percentage = e.clientX / window.innerWidth;
        const maxScroll = track.scrollWidth - window.innerWidth + 150;
        if (maxScroll > 0) {
          const x = percentage * maxScroll * -1;
          track.style.transform = `translate3d(${x}px, 0, 0)`;
        }
      }
    };

    const sigWrap = sigWrapperRef.current;
    const sigTrack = sigTrackRef.current;
    const clinWrap = clinWrapperRef.current;
    const clinTrack = clinTrackRef.current;

    const onSigMove = (e: MouseEvent) => sigTrack && handleMouseMove(e, sigTrack);
    const onClinMove = (e: MouseEvent) => clinTrack && handleMouseMove(e, clinTrack);

    sigWrap?.addEventListener('mousemove', onSigMove);
    clinWrap?.addEventListener('mousemove', onClinMove);

    return () => {
      sigWrap?.removeEventListener('mousemove', onSigMove);
      clinWrap?.removeEventListener('mousemove', onClinMove);
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

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setBookingSuccess(null);
    setSelectedService("");
  }, []);

  return (
    <>
      {/* PRELOADER */}
      <div className={`preloader-container ${isLoaded ? 'loaded' : ''}`}>
        <div className="preloader-half top"></div>
        <div className="preloader-half bottom"></div>
        <div className="preloader-logo">
           <img src="/assets/Shape Wellness Logo Final.png" alt="Shape Wellness Logo" loading="eager" />
        </div>
      </div>
      
      <Header />

      {/* MODAL */}
      {isModalOpen && (
        <div className="modal-overlay" style={{ display: 'flex' }}>
          <div className="modal-form">
  <h2 style={{ fontFamily: "'Playfair Display', serif", marginBottom: '5px' }}>Book Appointment</h2>
  <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '25px' }}>Complete the form to schedule your visit.</p>
  
  <form onSubmit={handleBooking}>
    <div className="form-grid">
      <div className="input-group"><label>Name</label><input type="text" name="pName" placeholder="Full name" required /></div>
      <div className="input-group"><label>Phone</label><input type="tel" name="pPhone" placeholder="Enter Phone No" required /></div>
      <div className="input-group"><label>Date</label><input type="date" name="pDate" required /></div>
      
      {/* Updated Service Selection */}
      <div className="input-group">
        <label>Service</label>
        <select 
          name="pService" 
          required 
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
          className="custom-select"
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

      {/* Conditional Message Field: Only shows when 'Other' is selected */}
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
    
    <button type="submit" className="btn-appoint" style={{ width: '100%', marginTop: '20px' }}>
      Confirm Appointment
    </button>
  </form>
</div>
        </div>
      )}

      {/* HERO SECTION */}
      <section className="hero" id="home">
        <div className="slider-container">
          {heroImages.map((src, index) => (
            <div 
              key={src}
              className={`slide ${index === currentSlide ? 'active' : ''}`} 
              style={{ backgroundImage: `url('${src}')` }}
            ></div>
          ))}
        </div>
        <div className="overlay"></div>
        <div className="hero-content">
          <h1>The Science of <br/><em>Timeless Beauty</em></h1>
          <p>Advanced Aesthetics • Dermatology • Laser Technology</p>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-section">
        <div className="marquee-track">
          {[1, 2, 3].map((i) => (
            <span key={i} className="marquee-text">Dermatology • Aesthetics • Body Contouring • Laser • Anti-Aging • Glow •</span>
          ))}
        </div>
      </div>

      {/* JOURNEY SECTION */}
      <section className="journey" id="journey" ref={journeySectionRef}>
        <div className="container">
          <div className="section-card-wrapper">
            <div className="journey-grid">
              <div className="journey-content">
                <h2>Our Philosophy <br/><span style={{ color: 'var(--primary-orange)' }}>Driven by Results</span></h2>
                <p>At Shape Wellness, our philosophy revolves around empowering individuals to embrace their unique beauty and wellness journey. We believe in holistic approaches that combine advanced technology with personalized care to achieve transformative results.</p>
                <div className="stats-box">
                  <div className="stat-item"><h3>10+</h3><span>Years Exp.</span></div>
                  <div className="stat-item"><h3>5k+</h3><span>Clients</span></div>
                  <div className="stat-item"><h3>FDA</h3><span>Approved</span></div>
                </div>
              </div>
              <div className="journey-img-wrapper">
                <div className="journey-img" ref={journeyImgRef}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SIGNATURE THERAPIES */}
      <section className="services" id="signature">
        <div className="section-card-wrapper" ref={sigWrapperRef}>
          <div className="container">
            <div className="section-header">
              <span className="section-subtitle">Why Choose Us</span>
              <h2 className="section-title">Our Approach</h2>
              <p>Comprehensive care for your body, hair, and skin.</p>
            </div>
          </div>
          <div className="signature-track" ref={sigTrackRef}>
            <div className="info-card">
              <div className="card-icon"><i className="fas fa-cog"></i></div>
              <h3>Skin Care Solutions</h3>
              <p>Our slimming treatments are designed to help you achieve your weight loss goals effectively and safely.</p>
            </div>
            <div className="info-card">
              <div className="card-icon"><i className="fas fa-globe"></i></div>
              <h3>Hair Care Services</h3>
              <p>Experience rejuvenating effects with our skin care solutions, tailored to address various skin concerns.</p>
            </div>
            <div className="info-card">
              <div className="card-icon"><i className="fas fa-database"></i></div>
              <h3>Innovative Approach</h3>
              <p>Transform your hair with our specialized hair care services, ranging from restoration to scalp treatments.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CLINICAL SERVICES */}
      <section className="clinical-services" id="clinical">
        <div className="clinical-wrapper-card" ref={clinWrapperRef}>
          <div className="container">
            <div className="section-header">
              <span className="section-subtitle">Our Expertise</span>
              <h2 className="section-title" style={{ fontSize: '3rem' }}>Clinical Services</h2>
              <p>Explore our full range of treatments</p>
            </div>
          </div>
          <div className="clinical-track" ref={clinTrackRef}>
            {[
              { title: "PRP Skin", desc: "Natural skin rejuvenation using plasma.", img: "/assets/prp.webp" },
              { title: "Micro Needling", desc: "Boost collagen and smooth texture.", img: "/assets/needling.webp" },
              { title: "Skin Whitening", desc: "Restore radiance and even tone.", img: "/assets/whitening.webp" },
              { title: "Laser Hair Removal", desc: "Pain-free, long-lasting smoothness.", img: "/assets/laser.webp" },
              { title: "Acne Treatment", desc: "Clear skin and reduce scarring.", img: "/assets/acne.webp" },
              { title: "Body Contouring", desc: "Non-invasive fat reduction and shaping.", img: "/assets/body.webp" }
            ].map((service, idx) => (
              <div className="clinical-card" key={idx}>
                <div className="clinical-img" style={{ backgroundImage: `url('${service.img}')`, backgroundColor: '#eee' }}></div>
                <div className="clinical-info">
                  <h3>{service.title}</h3>
                  <p>{service.desc}</p>
                  <span className="clinical-link">Learn More</span>
                </div>
              </div>
            ))}
          </div>
        </div> 
      </section>

      {/* REVIEWS */}
      <section className="reviews" id="reviews" ref={reviewSectionRef} style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="review-parallax-wrapper" ref={reviewBgRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '140%', zIndex: 0, transform: 'translate3d(0, -20%, 0)', pointerEvents: 'none' }}>
            <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1920&q=80" 
                 className="review-bg-img" 
                 alt=""
                 style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.15 }} /> 
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="section-header">
            <span className="section-subtitle">Client Stories</span>
            <h2 className="section-title">Happy Faces</h2>
            <p>Don't take our word for it. Hear from our community.</p>
          </div>
          
          <div className="reviews-grid">
            {[
              { name: "Sarah Jenkins", service: "Bridal Package", text: "I never thought I'd see my skin this glowing again. The HydraFacial was a game-changer.", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80" },
              { name: "Michael Ross", service: "Laser Treatment", text: "Professional staff and unbelievable results after just 3 sessions. Highly recommend!", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" },
              { name: "Emily Dao", service: "Hair PRP", text: "Finally found a clinic that listens. My hair restoration plan actually works. Confidence back!", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80" }
            ].map((review, i) => (
              <div key={i} className="review-card-outline" style={{ background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(5px)' }}>
                <div className="review-stars">
                  {[...Array(5)].map((_, i) => <i key={i} className="fas fa-star"></i>)}
                </div>
                <p className="review-text">“{review.text}”</p>
                <div className="review-author">
                  <img src={review.img} alt={review.name} className="author-avatar" loading="lazy" />
                  <div className="author-info">
                    <h4>{review.name}</h4>
                    <span>{review.service}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
}