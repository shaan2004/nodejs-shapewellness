"use client";

import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Lenis from 'lenis';

// Define Review Type
type Review = {
  id: number;
  name: string;
  service: string;
  rating: number;
  message: string;
};

export default function Experience() {
  // --- STATE ---
  const [rating, setRating] = useState(5);
  
  // Initial Reviews Data
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      name: "Sarah Jenkins",
      service: "Bridal Package",
      rating: 5,
      message: "I never thought I'd see my skin this glowing again. The HydraFacial treatment was a game-changer for my wedding prep."
    },
    {
      id: 2,
      name: "Michael Ross",
      service: "Laser Treatment",
      rating: 5,
      message: "The staff is incredibly professional. Laser hair removal results after just 3 sessions are unbelievable. Highly recommend!"
    }
  ]);

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

      sr.reveal('.page-header h1, .page-header p');
      sr.reveal('.section-center-title');
      
      sr.reveal('.transform-card', { interval: 100 });
      sr.reveal('.icon-card', { interval: 100 });
      sr.reveal('.review-card', { interval: 100 });
      sr.reveal('.review-form-box');
      sr.reveal('.footer-grid div', { interval: 100, origin: 'bottom', distance: '30px' });
    });

    return () => {
      lenis.destroy();
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
      id: Date.now(), // simple unique id
      name,
      service,
      rating,
      message
    };

    // Add new review to the top of the list
    setReviews([newReview, ...reviews]);
    
    // Reset form
    e.currentTarget.reset();
    setRating(5);
    alert("Thank you! Your review has been submitted.");
  };

  return (
    <>
      <Header />

      <main>
        {/* --- PAGE HEADER --- */}
        <section className="page-header">
          <div className="container">
            <h1>Client Transformations at <br/><span style={{ color: 'var(--primary-orange)' }}>Shape Wellness</span></h1>
            <p>Real stories, real results. Discover how we've helped our clients achieve their beauty and wellness goals through personalized care.</p>
          </div>
        </section>

        {/* --- TRANSFORM SECTION (Circles) --- */}
        <section className="transform-section">
          <div className="container">
            <div className="transform-grid">
              <div className="transform-card">
                <div className="circle-image">
                  <img src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=600&q=80" alt="Body Sculpting" />
                </div>
                <p>Discover the inspiring success stories of individuals who have transformed their lives through our slimming and body care treatments.</p>
                <h3>Body Sculpting</h3>
                <span>Personalized Treatments</span>
              </div>

              <div className="transform-card">
                <div className="circle-image">
                  <img src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=600&q=80" alt="Skin Care" />
                </div>
                <p>Read about the incredible skin care transformations and the renewed confidence our clients have gained at Shape Wellness.</p>
                <h3>Skin Care</h3>
                <span>Professional Team</span>
              </div>

              <div className="transform-card">
                <div className="circle-image">
                  <img src="https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=600&q=80" alt="Hair Care" />
                </div>
                <p>Explore how our unique approach to hair restoration has helped both men and women achieve their desired results.</p>
                <h3>Hair Care</h3>
                <span>Exceptional Service</span>
              </div>
            </div>
          </div>
        </section>

        {/* --- BEFORE & AFTER (Icons) --- */}
        <section className="before-after-section">
          <div className="container">
            <h2 className="section-center-title">Before and After <br/>Transformations</h2>
            
            <div className="icon-grid">
              <div className="icon-card">
                <div className="icon-wrapper"><i className="fas fa-paperclip"></i></div>
                <h3>Stunning Results</h3>
                <p>See the amazing makeovers and stunning results achieved by individuals who trusted Shape Wellness.</p>
                <a href="#" className="btn-outline-small">Discover More</a>
              </div>

              <div className="icon-card">
                <div className="icon-wrapper"><i className="fas fa-magic"></i></div>
                <h3>Incredible Changes</h3>
                <p>Experience the incredible changes in body shape, skin texture, and hair quality through our treatments.</p>
                <a href="#" className="btn-outline-small">See Results</a>
              </div>

              <div className="icon-card">
                <div className="icon-wrapper"><i className="fas fa-arrow-down"></i></div>
                <h3>Dramatic Improvements</h3>
                <p>Discover the dramatic improvements in confidence and self-esteem that our clients have experienced.</p>
                <a href="/contact" className="btn-outline-small">Book Now</a>
              </div>

              <div className="icon-card">
                <div className="icon-wrapper"><i className="far fa-eye"></i></div>
                <h3>Visible Differences</h3>
                <p>Explore the visible differences in our clients' appearances and overall well-being.</p>
                <a href="#" className="btn-outline-small">Get Started</a>
              </div>
            </div>
          </div>
        </section>

        {/* --- REVIEWS SECTION --- */}
        <section className="reviews-section">
          <div className="container">
            <h2 className="section-center-title" style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Client Reviews</h2>
            <div className="reviews-container" id="reviewsContainer">
              {reviews.map((review) => (
                <div className="review-card" key={review.id}>
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="fas fa-star" style={{ color: i < review.rating ? '#FFB400' : '#ddd' }}></i>
                    ))}
                  </div>
                  <p className="review-text">"{review.message}"</p>
                  <div className="reviewer-meta">
                    {/* Placeholder Avatar Logic using Initials */}
                    <div 
                        className="reviewer-img" 
                        style={{ 
                            background: 'var(--primary-orange)', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            color: 'white', 
                            fontWeight: 'bold',
                            fontSize: '1.2rem'
                        }}
                    >
                        {review.name.charAt(0)}
                    </div>
                    <div className="reviewer-info">
                        <h4>{review.name}</h4>
                        <span>{review.service}</span>
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
            <div className="review-form-box">
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
                        style={{ color: star <= rating ? '#FFB400' : '#ddd', cursor: 'pointer', fontSize: '1.5rem', transition: '0.2s' }}
                    ></i>
                  ))}
                </div>

                <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div className="form-group">
                    <label>Name</label>
                    <input type="text" name="rName" className="form-control" required placeholder="Your Name" />
                  </div>
                  <div className="form-group">
                    <label>Service Taken</label>
                    <input type="text" name="rService" className="form-control" placeholder="e.g. Skin Care" />
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Your Review</label>
                  <textarea name="rMessage" className="form-control" required placeholder="Tell us about your experience..." style={{ resize: 'none', height: '120px' }}></textarea>
                </div>

                <button type="submit" className="btn-submit">Submit Review</button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}