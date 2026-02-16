"use client";
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AppointmentModal from './AppointmentModal'; // Import the new modal

export default function Header() {
  const [isNavActive, setIsNavActive] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // State for popup
  const pathname = usePathname();

  const toggleMenu = () => setIsNavActive(!isNavActive);
  
  // Open the popup instead of scrolling
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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
          
          {/* Trigger Modal */}
          <button className="btn-appoint" onClick={openModal}>Book Appointment</button>
        </nav>
      </div>

      {/* Render the Modal Component */}
      <AppointmentModal isOpen={isModalOpen} onClose={closeModal} />
    </header>
  );
}