"use client";
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AppointmentModal from './AppointmentModal';

export default function Header() {
  const [isNavActive, setIsNavActive] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsNavActive(!isNavActive);
  
  // Close menu and open modal
  const handleAppointmentClick = () => {
    setIsNavActive(false); // Close mobile menu when clicking the button
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const isActive = (path: string) => pathname === path ? 'active' : '';

  return (
    <header id="header">
      <div className="container">
        <nav>
          <Link href="/" className="logo">
           <img 
  src="/assets/Shape Wellness Logo Final.png" 
  alt="Shape Wellness Logo" 
  width={150} // Pass as number
  height={80} // Pass as number
  fetchPriority="high" // Correct camelCase
  loading="eager" 
  style={{ width: '150px', height: '80px' }} 
/>
          </Link>
          
          <div className="mobile-toggle" onClick={toggleMenu}>
            <i className={`fas ${isNavActive ? 'fa-times' : 'fa-bars'}`}></i>
          </div>
          
          <div className={`nav-links ${isNavActive ? 'active' : ''}`} id="navLinks">
            <Link href="/" className={isActive('/')} onClick={() => setIsNavActive(false)}>Home</Link>
            <Link href="/experience" className={isActive('/experience')} onClick={() => setIsNavActive(false)}>Experience</Link>
            <Link href="/treatments" className={isActive('/treatments')} onClick={() => setIsNavActive(false)}>Treatments</Link>
            <Link href="/about" className={isActive('/about')} onClick={() => setIsNavActive(false)}>About Us</Link>
            <Link href="/contact" className={isActive('/contact')} onClick={() => setIsNavActive(false)}>Contact</Link>
            
            {/* Button is now structurally placed below Contact */}
            <button className="btn-appoint" onClick={handleAppointmentClick}>
              Book Appointment
            </button>
          </div>
        </nav>
      </div>

      <AppointmentModal isOpen={isModalOpen} onClose={closeModal} />
    </header>
  );
}