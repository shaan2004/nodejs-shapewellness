"use client";

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home() {
  // --- STATE MANAGEMENT ---
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState<{id: string, date: string, time: string, service: string} | null>(null);

  // --- REFS FOR ANIMATIONS ---
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

  // --- EFFECT: INITIALIZATION ---
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 1000);

    let lenisInstance: any;

    const initAnimations = async () => {
      // 1. Initialize Lenis (Smooth Scroll) - Loaded only on client
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

      // 2. Initialize ScrollReveal - Loaded only on client
      const ScrollReveal = (await import('scrollreveal')).default;
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
      
      if (window.innerWidth > 900) {
        sr.reveal('.info-card', { interval: 100 });
        sr.reveal('.clinical-card', { interval: 100 });
      }
      sr.reveal('.review-card-outline', { interval: 100 });
    };

    initAnimations();

    // 3. Parallax Scroll Logic
    const handleScroll = () => {
      if (window.innerWidth > 900) {
        if (journeySectionRef.current && journeyImgRef.current) {
          const rect = journeySectionRef.current.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            journeyImgRef.current.style.transform = `translateY(${rect.top * 0.15}px)`;
          }
        }
        if (reviewSectionRef.current && reviewBgRef.current) {
          const rect = reviewSectionRef.current.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            reviewBgRef.current.style.transform = `translateY(${rect.top * 0.15}px)`;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      if (lenisInstance) lenisInstance.destroy();
    };
  }, []);

  // --- EFFECT: HERO SLIDER ---
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

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
      <div className={`preloader-container ${isLoaded ? 'loaded' : ''}`}>
        <div className="preloader-half top"></div>
        <div className="preloader-half bottom"></div>
        <div className="preloader-logo">
           <Image 
              src="/assets/Shape Wellness Logo Final.png" 
              alt="Shape Wellness Logo" 
              width={220} 
              height={80} 
              priority 
           />
        </div>
      </div>
      
      <Header />

      {/* MODAL */}
      {isModalOpen && (
        <div className="modal-overlay" style={{ display: 'flex' }}>
          <div className="modal-box">
            <span className="close-btn" onClick={closeModal}>×</span>
            {!bookingSuccess ? (
              <>
                <div className="modal-image"></div>
                <div className="modal-form">
                  <h2 className="font-playfair">Book Appointment</h2>
                  <p className="modal-subtitle">Schedule your wellness visit today.</p>
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
                        </select>
                      </div>
                      <div className="input-group full-width"><label>Message</label><textarea name="pMessage" placeholder="Any specific concerns?"></textarea></div>
                    </div>
                    <button type="submit" className="btn-appoint" style={{ width: '100%' }}>Confirm Booking</button>
                  </form>
                </div>
              </>
            ) : (
              <div className="success-message">
                <i className="fas fa-check-circle success-icon"></i>
                <h2 className="font-playfair">Confirmed!</h2>
                <div className="appoint-details">
                  <p><strong>ID:</strong> {bookingSuccess.id}</p>
                  <p><strong>Service:</strong> {bookingSuccess.service}</p>
                </div>
                <button className="btn-appoint" onClick={closeModal}>Close</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* HERO SECTION */}
      <section className="hero" id="home">
        <div className="slider-container">
          {heroImages.map((src, index) => (
            <div key={index} className={`slide ${index === currentSlide ? 'active' : ''}`}>
               <Image 
                  src={src} 
                  alt="Aesthetic Treatment" 
                  fill 
                  priority={index === 0} 
                  className="object-cover"
                  sizes="100vw"
               />
            </div>
          ))}
        </div>
        <div className="overlay"></div>
        <div className="hero-content">
          <h1 className="font-playfair">The Science of <br/><em>Timeless Beauty</em></h1>
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
                <h2>Our Philosophy <br/><span className="text-primary">Driven by Results</span></h2>
                <p>At Shape Wellness, we combine advanced technology with personalized care to achieve transformative results for our Chennai clients.</p>
                <div className="stats-box">
                  <div className="stat-item"><h3>10+</h3><span>Years Exp.</span></div>
                  <div className="stat-item"><h3>5k+</h3><span>Clients</span></div>
                  <div className="stat-item"><h3>FDA</h3><span>Approved</span></div>
                </div>
              </div>
              <div className="journey-img-wrapper">
                <div className="journey-img" ref={journeyImgRef}>
                  <Image 
                    src="/assets/shapewellness.webp" 
                    alt="Shape Wellness Clinic Chennai" 
                    fill 
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
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
            </div>
          </div>
          <div className="signature-track" ref={sigTrackRef}>
            <div className="info-card">
              <div className="card-icon"><i className="fas fa-cog"></i></div>
              <h3>Skin Care Solutions</h3>
              <p>Tailored treatments to address various skin concerns and promote healthy, glowing skin.</p>
            </div>
            <div className="info-card">
              <div className="card-icon"><i className="fas fa-globe"></i></div>
              <h3>Hair Care Services</h3>
              <p>Specialized hair restoration and scalp treatments ensuring beautiful, healthy hair.</p>
            </div>
            <div className="info-card">
              <div className="card-icon"><i className="fas fa-database"></i></div>
              <h3>Innovative Tech</h3>
              <p>Utilizing FDA-approved laser technology for precision and safety.</p>
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
              <h2 className="section-title">Clinical Services</h2>
            </div>
          </div>
          <div className="clinical-track" ref={clinTrackRef}>
            {[
              { title: "PRP Skin", img: "/assets/prp.png", desc: "Natural skin rejuvenation." },
              { title: "Micro Needling", img: "/assets/needling.png", desc: "Boost collagen levels." },
              { title: "Skin Whitening", img: "/assets/whitening.png", desc: "Restore radiance." },
              { title: "Laser Hair", img: "/assets/laser.png", desc: "Long-lasting smoothness." },
              { title: "Acne Care", img: "/assets/acne.png", desc: "Reduce scarring." },
              { title: "Body Contour", img: "/assets/body.png", desc: "Non-invasive shaping." }
            ].map((service, idx) => (
              <div key={idx} className="clinical-card">
                <div className="clinical-img">
                  <Image src={service.img} alt={service.title} fill className="object-cover" />
                </div>
                <div className="clinical-info">
                  <h3>{service.title}</h3>
                  <p>{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div> 
      </section>

      {/* REVIEWS */}
      <section className="reviews" id="reviews" ref={reviewSectionRef}>
        <div className="review-parallax-wrapper" ref={reviewBgRef}>
            <Image 
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80" 
              alt="Clinic Background" 
              fill 
              className="review-bg-img"
              style={{ opacity: 0.15 }}
            /> 
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="section-header">
            <span className="section-subtitle">Client Stories</span>
            <h2 className="section-title">Happy Faces</h2>
          </div>
          
          <div className="reviews-grid">
            <div className="review-card-outline">
              <div className="review-stars">
                {[...Array(5)].map((_, i) => <i key={i} className="fas fa-star"></i>)}
              </div>
              <p className="review-text">“The HydraFacial was a game-changer for my wedding prep. Truly the best clinic in Chennai.”</p>
              <div className="review-author">
                <div className="author-info">
                  <h4>Sarah Jenkins</h4>
                  <span>Bridal Package</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
}