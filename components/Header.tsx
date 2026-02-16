"use client";
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Import this to detect current page

export default function Header() {
  const [isNavActive, setIsNavActive] = useState<boolean>(false);
  const pathname = usePathname(); // Get the current URL path

  const toggleMenu = () => {
    setIsNavActive(!isNavActive);
  };

  const scrollToBooking = () => {
    // Check if we are on the home page for scrolling, or redirect if needed
    // For simplicity in this multi-page setup, we'll try to find the modal trigger usually
    // But since the button usually opens a modal, we keep the onClick or change it to open the modal directly if passed.
    // For now, let's keep the modal trigger logic or simple scroll if on page.
    const section = document.getElementById('book-appointment');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    } else {
        // Optional: Redirect to contact page if section not found
        window.location.href = '/contact';
    }
  };

  // Helper to determine if a link is active
  const isActive = (path: string) => pathname === path ? 'active' : '';

  return (
    <header id="header">
      <div className="container">
        <nav>
          <Link href="/" className="logo">
            <img src="/assets/Shape Wellness Logo Final.png" alt="Shape Wellness" className="logo-img" />
          </Link>
          <div className="mobile-toggle" onClick={toggleMenu}>
            <i className="fas fa-bars"></i>
          </div>
          
          <div className={`nav-links ${isNavActive ? 'active' : ''}`} id="navLinks">
            <Link href="/" className={isActive('/')}>Home</Link>
            <Link href="/experience" className={isActive('/experience')}>Experience</Link>
            <Link href="/treatments" className={isActive('/treatments')}>Treatments</Link>
            <Link href="/about" className={isActive('/about')}>About Us</Link>
            <Link href="/contact" className={isActive('/contact')}>Contact</Link>
          </div>
          
          <button className="btn-appoint" onClick={scrollToBooking}>Book Appointment</button>
        </nav>
      </div>
    </header>
  );
}