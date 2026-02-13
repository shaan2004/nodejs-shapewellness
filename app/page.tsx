"use client";

import { useEffect, useState, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Lenis from 'lenis';

export default function Home() {
  // --- STATE MANAGEMENT ---
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState<{id: string, date: string, time: string, service: string} | null>(null);

  // --- REFS FOR ANIMATIONS ---
  const journeySectionRef = useRef<HTMLElement>(null);
  const journeyImgRef = useRef<HTMLDivElement>(null);
  const reviewSectionRef = useRef<HTMLElement>(null);
  const reviewBgRef = useRef<HTMLDivElement>(null);
  
  // Refs for Horizontal Pan Effect
  const sigWrapperRef = useRef<HTMLDivElement>(null);
  const sigTrackRef = useRef<HTMLDivElement>(null);
  const clinWrapperRef = useRef<HTMLDivElement>(null);
  const clinTrackRef = useRef<HTMLDivElement>(null);

  const heroImages = [
    '/assets/2025-09-21 (1).webp',
    '/assets/2025-09-21.webp',
    '/assets/shapewellness.webp'
  ];

  // --- EFFECT: PRELOADER ---
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  // --- EFFECT: HERO SLIDER ---
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  // --- EFFECT: SCROLL LOGIC (Lenis, Parallax, ScrollReveal) ---
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

    // 2. Scroll Event Listener (Parallax)
    const handleScroll = () => {
      // Journey Parallax
      if (journeySectionRef.current && journeyImgRef.current && window.innerWidth > 900) {
        const rect = journeySectionRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          journeyImgRef.current.style.transform = `translateY(${rect.top * 0.15}px)`;
        }
      }

      // Reviews Parallax (The moving photo effect)
      if (reviewSectionRef.current && reviewBgRef.current && window.innerWidth > 900) {
        const rect = reviewSectionRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const yPos = rect.top * 0.15;
          reviewBgRef.current.style.transform = `translateY(${yPos}px)`;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    // 3. Init ScrollReveal
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

      sr.reveal('.hero-content, .hero h1, .hero p');
      sr.reveal('.journey-content', { origin: 'left' });
      sr.reveal('.journey-img-wrapper', { origin: 'right' });
      sr.reveal('.section-header, .section-title');
      
      // Only animate cards on desktop to avoid layout shifts on mobile
      if (window.innerWidth > 900) {
        sr.reveal('.info-card', { interval: 100 });
        sr.reveal('.clinical-card', { interval: 100 });
      }
      
      sr.reveal('.review-card-outline', { interval: 100 });
      sr.reveal('.footer-grid div', { interval: 100, origin: 'bottom', distance: '30px' });
    });

    return () => {
      lenis.destroy();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // --- EFFECT: HORIZONTAL MOUSE PAN ---
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent, wrapper: HTMLElement, track: HTMLElement) => {
      if (window.innerWidth > 900) {
        const percentage = e.clientX / window.innerWidth;
        const maxScroll = track.scrollWidth - window.innerWidth + 150;
        // Ensure maxScroll isn't negative
        if (maxScroll > 0) {
            const x = percentage * maxScroll * -1;
            track.style.transform = `translateX(${x}px)`;
        }
      }
    };

    const sigWrap = sigWrapperRef.current;
    const sigTrack = sigTrackRef.current;
    const clinWrap = clinWrapperRef.current;
    const clinTrack = clinTrackRef.current;

    const sigHandler = (e: MouseEvent) => { if(sigWrap && sigTrack) handleMouseMove(e, sigWrap, sigTrack) };
    const clinHandler = (e: MouseEvent) => { if(clinWrap && clinTrack) handleMouseMove(e, clinWrap, clinTrack) };

    if (sigWrap) sigWrap.addEventListener('mousemove', sigHandler);
    if (clinWrap) clinWrap.addEventListener('mousemove', clinHandler);

    return () => {
      if (sigWrap) sigWrap.removeEventListener('mousemove', sigHandler);
      if (clinWrap) clinWrap.removeEventListener('mousemove', clinHandler);
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
      {/* PRELOADER */}
      {/* --- NEW SPLIT PRELOADER WITH LOGO --- */}
      <div className={`preloader-container ${isLoaded ? 'loaded' : ''}`}>
        <div className="preloader-half top"></div>
        <div className="preloader-half bottom"></div>
        
        {/* REPLACED TEXT WITH IMAGE HERE */}
        <div className="preloader-logo">
           <img src="/assets/Shape Wellness Logo Final.png" alt="Shape Wellness Logo" />
        </div>
      </div>
      
      <Header />

      {/* MODAL (Moved outside header for cleaner React structure) */}
      {isModalOpen && (
        <div className="modal-overlay" style={{ display: 'flex' }}>
          <div className="modal-box">
            <span className="close-btn" onClick={closeModal}>×</span>
            
            {/* Form Section */}
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

            {/* Success Section */}
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

      {/* --- HERO SECTION --- */}
      <section className="hero" id="home">
        <div className="slider-container">
          {heroImages.map((src, index) => (
            <div 
              key={index}
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

      {/* --- MARQUEE --- */}
      <div className="marquee-section">
        <div className="marquee-track">
          {[1, 2, 3].map((i) => (
            <span key={i} className="marquee-text">Dermatology • Aesthetics • Body Contouring • Laser • Anti-Aging • Glow •</span>
          ))}
        </div>
      </div>

      {/* --- JOURNEY SECTION --- */}
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

      {/* --- SIGNATURE THERAPIES (Horizontal Scroll) --- */}
      <section className="services" id="signature">
        <div className="section-card-wrapper" id="signatureWrapper" ref={sigWrapperRef}>
          <div className="container">
            <div className="section-header">
              <span className="section-subtitle">Why Choose Us</span>
              <h2 className="section-title">Our Approach</h2>
              <p>Comprehensive care for your body, hair, and skin.</p>
            </div>
          </div>
          <div className="signature-track" id="signatureTrack" ref={sigTrackRef}>
            <div className="info-card">
              <div className="card-icon"><i className="fas fa-cog"></i></div>
              <h3>Skin Care Solutions</h3>
              <p>Our slimming treatments are designed to help you achieve your weight loss goals effectively and safely, enhancing your overall well-being.</p>
            </div>
            <div className="info-card">
              <div className="card-icon"><i className="fas fa-globe"></i></div>
              <h3>Hair Care Services</h3>
              <p>Experience the rejuvenating effects of our skin care solutions, tailored to address various skin concerns and promote healthy, glowing skin.</p>
            </div>
            <div className="info-card">
              <div className="card-icon"><i className="fas fa-database"></i></div>
              <h3>Innovative Approach</h3>
              <p>Transform your hair with our specialized hair care services, ranging from hair restoration to scalp treatments, ensuring beautiful and healthy hair.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- CLINICAL SERVICES (Horizontal Scroll) --- */}
      <section className="clinical-services" id="clinical">
        <div className="clinical-wrapper-card" id="clinicalWrapper" ref={clinWrapperRef}>
          <div className="container">
            <div className="section-header">
              <span className="section-subtitle">Our Expertise</span>
              <h2 className="section-title" style={{ fontSize: '3rem' }}>Clinical Services</h2>
              <p>Explore our full range of treatments</p>
            </div>
          </div>
          <div className="clinical-track" id="clinicalTrack" ref={clinTrackRef}>
            {/* Card 1 */}
            <div className="clinical-card">
              <div className="clinical-img" style={{ backgroundImage: "url('/assets/prp.png')", backgroundColor: '#eee' }}></div>
              <div className="clinical-info"><h3>PRP Skin</h3><p>Natural skin rejuvenation using plasma.</p><span className="clinical-link">Learn More</span></div>
            </div>
            {/* Card 2 */}
            <div className="clinical-card">
              <div className="clinical-img" style={{ backgroundImage: "url('/assets/needling.png')", backgroundColor: '#eee' }}></div>
              <div className="clinical-info"><h3>Micro Needling</h3><p>Boost collagen and smooth texture.</p><span className="clinical-link">Learn More</span></div>
            </div>
            {/* Card 3 */}
            <div className="clinical-card">
              <div className="clinical-img" style={{ backgroundImage: "url('/assets/whitening.png')", backgroundColor: '#eee' }}></div>
              <div className="clinical-info"><h3>Skin Whitening</h3><p>Restore radiance and even tone.</p><span className="clinical-link">Learn More</span></div>
            </div>
            {/* Card 4 */}
            <div className="clinical-card">
              <div className="clinical-img" style={{ backgroundImage: "url('/assets/laser.png')", backgroundColor: '#eee' }}></div>
              <div className="clinical-info"><h3>Laser Hair Removal</h3><p>Pain-free, long-lasting smoothness.</p><span className="clinical-link">Learn More</span></div>
            </div>
            {/* Card 5 */}
            <div className="clinical-card">
              <div className="clinical-img" style={{ backgroundImage: "url('/assets/acne.png')", backgroundColor: '#eee' }}></div>
              <div className="clinical-info"><h3>Acne Treatment</h3><p>Clear skin and reduce scarring.</p><span className="clinical-link">Learn More</span></div>
            </div>
            {/* Card 6 */}
            <div className="clinical-card">
              <div className="clinical-img" style={{ backgroundImage: "url('/assets/body.png')", backgroundColor: '#eee' }}></div>
              <div className="clinical-info"><h3>Body Contouring</h3><p>Non-invasive fat reduction and shaping.</p><span className="clinical-link">Learn More</span></div>
            </div>
          </div>
        </div> 
      </section>

      {/* --- REVIEWS (With Moving Photo Parallax) --- */}
      <section className="reviews" id="reviews" ref={reviewSectionRef} style={{ position: 'relative', overflow: 'hidden' }}>
        
        {/* 1. MOVING PHOTO CONTAINER */}
        <div className="review-parallax-wrapper" ref={reviewBgRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '140%', zIndex: 0, transform: 'translateY(-20%)', pointerEvents: 'none' }}>
            <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1920&q=80" 
                 className="review-bg-img" 
                 alt="Background"
                 style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.15 }} /> 
        </div>

        {/* 2. CONTENT CONTAINER */}
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="section-header">
            <span className="section-subtitle">Client Stories</span>
            <h2 className="section-title">Happy Faces</h2>
            <p>Don't take our word for it. Hear from our community.</p>
          </div>
          
          <div className="reviews-grid">
            <div className="review-card-outline" style={{ background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(5px)' }}>
              <div className="review-stars">
                {[...Array(5)].map((_, i) => <i key={i} className="fas fa-star"></i>)}
              </div>
              <p className="review-text">“I never thought I'd see my skin this glowing again. The HydraFacial treatment was a game-changer for my wedding prep. Truly the best.”</p>
              <div className="review-author">
                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80" alt="Sarah J." className="author-avatar" />
                <div className="author-info">
                  <h4>Sarah Jenkins</h4>
                  <span>Bridal Package</span>
                </div>
              </div>
            </div>

            <div className="review-card-outline" style={{ background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(5px)' }}>
              <div className="review-stars">
                {[...Array(5)].map((_, i) => <i key={i} className="fas fa-star"></i>)}
              </div>
              <p className="review-text">“The staff is incredibly professional. I went in for laser hair removal and the results after just 3 sessions are unbelievable. Highly recommend!”</p>
              <div className="review-author">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="Michael R." className="author-avatar" />
                <div className="author-info">
                  <h4>Michael Ross</h4>
                  <span>Laser Treatment</span>
                </div>
              </div>
            </div>

            <div className="review-card-outline" style={{ background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(5px)' }}>
              <div className="review-stars">
                {[...Array(5)].map((_, i) => <i key={i} className="fas fa-star"></i>)}
              </div>
              <p className="review-text">“Finally found a clinic that listens. The hair restoration plan they designed for me actually works. My confidence is back.”</p>
              <div className="review-author">
                <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80" alt="Emily D." className="author-avatar" />
                <div className="author-info">
                  <h4>Emily Dao</h4>
                  <span>Hair PRP</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Button to open modal globally via header uses standard onClick logic,
          but here we pass the open function to header if needed, or simply 
          render the modal logic here at the page level which is safer for Next.js */}
      
      <Footer />
    </>
  );
}