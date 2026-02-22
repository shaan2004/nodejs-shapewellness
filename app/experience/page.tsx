"use client";

import { useEffect, useState, useRef } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Lenis from 'lenis';
import Image from 'next/image';
import Script from 'next/script';

// Define Review Type
type Review = {
  id: number;
  name: string;
  service: string;
  rating: number;
  message: string;
  image?: string;
};

export default function Experience() {
  // --- STATE ---
  const [rating, setRating] = useState(5);
  
  // Initial Reviews Data
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 101,
      name: "Pratiksha Kaval",
      service: "HydraFacial",
      rating: 5,
      message: "Had a great HydraFacial experience at Shape Wellness. The clinic is clean, calming, and very well maintained. The staff is polite, friendly, and explained the procedure clearly. Highly recommend!",
      image: "/assets/skin_care.webp" 
    },
    {
      id: 102,
      name: "praveen g",
      service: "Facial Carbon Peel",
      rating: 5,
      message: "I had a facial carbon peel yesterday at Shape Wellness, and was really pleased with the service. They recommended this treatment based on my needs, and the outcome was superb.",
      image: "/assets/2025-09-21.webp"
    },
    {
      id: 103,
      name: "Saaru Mathi",
      service: "Hydra Facial",
      rating: 5,
      message: "I am taking hydra facial session is was so relaxing and very professional thanks to shape wellness highly recommended 😊",
      image: "/assets/body_sculting.webp"
    },
    {
      id: 104,
      name: "Savithra Baskar",
      service: "Hydra Facial",
      rating: 5,
      message: "Value for money! I was recommended hydra facial. Felt very comfortable and relaxed during the session. Highly recommend!",
      image: "/assets/shapewellness.webp"
    }
  ]);

  // --- REFS FOR HORIZONTAL DRAG SCROLL ---
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // --- DRAG SCROLL LOGIC ---
  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    if (scrollRef.current) {
      startX.current = e.pageX - scrollRef.current.offsetLeft;
      scrollLeft.current = scrollRef.current.scrollLeft;
      scrollRef.current.style.cursor = 'grabbing'; // Changes cursor while dragging
    }
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
    if (scrollRef.current) scrollRef.current.style.cursor = 'grab';
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    if (scrollRef.current) scrollRef.current.style.cursor = 'grab';
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 2; // Multiply by 2 for faster scrolling
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  // --- EFFECT: SCROLL LOGIC ---
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      lerp: 0.1,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    const initSR = async () => {
      const module = await import('scrollreveal');
      const sr = module.default({
        origin: 'bottom',
        distance: window.innerWidth < 768 ? '30px' : '60px',
        duration: 1000,
        delay: 200,
        easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
        reset: false,
        viewFactor: 0.2,
      });

      sr.reveal('.page-header h1, .page-header p');
      sr.reveal('.section-center-title');
      sr.reveal('.transform-card', { interval: 100 });
      sr.reveal('.icon-card', { interval: 100 });
      sr.reveal('.reviews-scroll-outer');
      sr.reveal('.review-form-box');
      sr.reveal('.footer-grid div', { interval: 100, origin: 'bottom', distance: '20px' });
    };

    initSR();

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
    };
  }, []);

  // --- HANDLERS ---
  const handleSubmitReview = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('rName') as string;
    const service = (formData.get('rService') as string) || 'Customer';
    const message = formData.get('rMessage') as string;

    const newReview: Review = {
      id: Date.now(), 
      name,
      service,
      rating,
      message
    };

    setReviews([newReview, ...reviews]);
    e.currentTarget.reset();
    setRating(5);
  };

  return (
    <>
      <Header />

      <main style={{ overflowX: 'hidden' }}>
        {/* --- PAGE HEADER --- */}
        <section className="page-header" style={{ willChange: 'transform, opacity' }}>
          <div className="container">
            <h1>Client Transformations at <br/><span style={{ color: 'var(--primary-orange)' }}>Shape Wellness</span></h1>
            <p>Real stories, real results. Discover how we've helped our clients achieve their beauty and wellness goals through personalized care.</p>
          </div>
        </section>

        {/* --- TRANSFORM SECTION --- */}
        <section className="transform-section">
          <div className="container">
            <div className="transform-grid">
              <div className="transform-card" style={{ transform: 'translateZ(0)' }}>
                <div className="circle-image">
                  <Image src="/assets/body_sculting.webp" alt="Body Sculpting" fill style={{ objectFit: 'cover' }} loading="lazy" />
                </div>
                <p>Discover the inspiring success stories of individuals who have transformed their lives through our slimming and body care treatments.</p>
                <h3>Body Sculpting</h3>
                <span>Personalized Treatments</span>
              </div>

              <div className="transform-card" style={{ transform: 'translateZ(0)' }}>
                <div className="circle-image">
                  <Image src="/assets/skin_care.webp" alt="Skin Care" fill style={{ objectFit: 'cover' }} loading="lazy" />
                </div>
                <p>Read about the incredible skin care transformations and the renewed confidence our clients have gained at Shape Wellness.</p>
                <h3>Skin Care</h3>
                <span>Professional Team</span>
              </div>

              <div className="transform-card" style={{ transform: 'translateZ(0)' }}>
                <div className="circle-image">
                  <Image src="/assets/hair_care.webp" alt="Hair Care" fill style={{ objectFit: 'cover' }} loading="lazy" />
                </div>
                <p>Explore how our unique approach to hair restoration has helped both men and women achieve their desired results.</p>
                <h3>Hair Care</h3>
                <span>Exceptional Service</span>
              </div>
            </div>
          </div>
        </section>

        {/* --- BEFORE & AFTER --- */}
        <section className="before-after-section" style={{ perspective: '1000px' }}>
          <div className="container">
            <h2 className="section-center-title">Before and After <br/>Transformations</h2>
            
            <div className="icon-grid">
              <div className="icon-card" style={{ transform: 'translateZ(0)' }}>
                <div className="icon-wrapper"><i className="fas fa-paperclip"></i></div>
                <h3>Stunning Results</h3>
                <p>See the amazing makeovers and stunning results achieved by individuals who trusted Shape Wellness.</p>
                <a href="#" className="btn-outline-small">Discover More</a>
              </div>

              <div className="icon-card" style={{ transform: 'translateZ(0)' }}>
                <div className="icon-wrapper"><i className="fas fa-magic"></i></div>
                <h3>Incredible Changes</h3>
                <p>Experience the incredible changes in body shape, skin texture, and hair quality through our treatments.</p>
                <a href="#" className="btn-outline-small">See Results</a>
              </div>

              <div className="icon-card" style={{ transform: 'translateZ(0)' }}>
                <div className="icon-wrapper"><i className="fas fa-arrow-down"></i></div>
                <h3>Dramatic Improvements</h3>
                <p>Discover the dramatic improvements in confidence and self-esteem that our clients have experienced.</p>
                <a href="/contact" className="btn-outline-small">Book Now</a>
              </div>

              <div className="icon-card" style={{ transform: 'translateZ(0)' }}>
                <div className="icon-wrapper"><i className="far fa-eye"></i></div>
                <h3>Visible Differences</h3>
                <p>Explore the visible differences in our clients' appearances and overall well-being.</p>
                <a href="#" className="btn-outline-small">Get Started</a>
              </div>
            </div>
          </div>
        </section>

        {/* --- REVIEWS SECTION (HORIZONTAL SCROLL ENABLED) --- */}
        <section className="reviews-section" style={{ background: 'var(--bg-off-white)', padding: '100px 0', overflow: 'hidden' }}>
          <div className="container">
            <h2 className="section-center-title" style={{ fontSize: '2.5rem', marginBottom: '40px' }}>What Our Clients Say</h2>
          </div>

          {/* CRITICAL FIXES APPLIED HERE */}
          <div 
            className="reviews-scroll-outer" 
            ref={scrollRef}
            data-lenis-prevent="true" /* Tells Lenis to ignore this area */
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            style={{ 
              width: '100%', 
              overflowX: 'auto', 
              cursor: 'grab',
              padding: '20px 0 60px 0',
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            <div className="reviews-container" id="reviewsContainer" style={{
              display: 'flex',
              gap: '30px',
              paddingLeft: 'max(40px, calc((100vw - 1300px) / 2))',
              paddingRight: '40px',
              width: 'max-content'
            }}>
              {reviews.map((review) => (
                <div className="review-card" key={review.id} style={{
                  width: '380px',
                  flexShrink: 0, /* Prevents squishing */
                  background: 'var(--white)',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  transform: 'translateZ(0)'
                }}>
                 

                  <div className="review-card-content" style={{ padding: '30px', pointerEvents: 'none' }}>
                    <div className="stars" style={{ color: '#FFB400', marginBottom: '15px', fontSize: '0.9rem' }}>
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className="fas fa-star" style={{ color: i < review.rating ? '#FFB400' : '#ddd' }}></i>
                      ))}
                    </div>
                    <p className="review-text" style={{ fontStyle: 'italic', fontSize: '1.1rem', lineHeight: 1.6, color: 'var(--text-dark)', marginBottom: '25px' }}>
                      "{review.message}"
                    </p>
                    <div className="reviewer-meta" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                      <div className="reviewer-img-circle" style={{ background: 'var(--primary-orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', width: '45px', height: '45px', borderRadius: '50%', fontWeight: 'bold', fontSize: '1.2rem', flexShrink: 0 }}>
                        {review.name.charAt(0)}
                      </div>
                      <div className="reviewer-info">
                        <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0 }}>{review.name}</h4>
                        <span style={{ fontSize: '0.8rem', color: 'var(--primary-orange)', textTransform: 'uppercase', fontWeight: 600 }}>Verified Patient</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- ADD REVIEW FORM --- */}
        <section className="add-review-section">
          <div className="container">
            <div className="review-form-box" style={{ contain: 'content' }}>
              <div className="form-title">
                <h2 className="section-title">Share Your Story</h2>
                <p style={{ color: '#888' }}>We value your feedback. Let us know about your experience.</p>
              </div>
              
              <form onSubmit={handleSubmitReview}>
                <div className="rating-select">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <i 
                      key={star}
                      className={`fas fa-star rating-star ${star <= rating ? 'active' : ''}`} 
                      onClick={() => setRating(star)}
                    ></i>
                  ))}
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label>Name</label>
                    <input type="text" name="rName" className="form-control" required placeholder="Your Name" />
                  </div>
                  <div className="form-group">
                    <label>Service Taken</label>
                    <input type="text" name="rService" className="form-control" placeholder="e.g. Skin Care" />
                  </div>
                </div>
                
                <div className="form-group" style={{ marginTop: '20px' }}>
                  <label>Your Review</label>
                  <textarea name="rMessage" className="form-control" required placeholder="Tell us about your experience..."></textarea>
                </div>

                <button type="submit" className="btn-submit">Submit Review</button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <Script 
        src="https://static.elfsight.com/platform/platform.js" 
        strategy="lazyOnload" 
      />
    </>
  );
}