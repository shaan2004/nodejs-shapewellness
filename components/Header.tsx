"use client";
import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isNavActive, setIsNavActive] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsNavActive(!isNavActive);
  };

  const scrollToBooking = () => {
    const section = document.getElementById('book-appointment');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header id="header">
      <div className="container">
        <nav>
          <Link href="/" className="logo">
            {/* Ensure image is in public/assets/ */}
            <img src="/assets/Shape Wellness Logo Final.png" alt="Shape Wellness" className="logo-img" />
          </Link>
          <div className="mobile-toggle" onClick={toggleMenu}>
            <i className="fas fa-bars"></i>
          </div>
          <div className={`nav-links ${isNavActive ? 'active' : ''}`} id="navLinks">
            <Link href="/">Home</Link>
            <Link href="/experience">Experience</Link>
            <Link href="/treatments">Treatments</Link>
            <Link href="/about">About Us</Link>
            <Link href="/contact" className="active">Contact</Link>
          </div>
          <button className="btn-appoint" onClick={scrollToBooking}>Book Appointment</button>
        </nav>
      </div>
    </header>
  );
}