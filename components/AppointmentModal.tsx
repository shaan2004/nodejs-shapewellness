"use client";
import { useState, useCallback } from 'react';
import Image from 'next/image';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AppointmentModal({ isOpen, onClose }: ModalProps) {
  // --- 1. HOOKS AT TOP ---
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [formData, setFormData] = useState({
    id: "SW-" + Math.floor(1000 + Math.random() * 9000),
    date: "",
    time: "10:30 AM",
    service: ""
  });

  const handleClose = useCallback(() => {
    setIsSubmitted(false);
    setSelectedService("");
    onClose();
  }, [onClose]);

  const handleConfirm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    
    setFormData(prev => ({
      ...prev,
      date: data.get('cDate') as string,
      service: data.get('cService') === "Other" 
               ? (data.get('cOtherText') as string) 
               : (data.get('cService') as string)
    }));
    
    setIsSubmitted(true);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose} aria-modal="true" role="dialog">
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        
        {/* HEADER - Specific Layout: Logo (Left) | Text (Center) | Close (Right) */}
        <header className="modal-header">
          <div className="header-left">
            <Image 
              src="/assets/Shape Wellness Logo Final.png" 
              alt="Shape Wellness Logo" 
              width={120} 
              height={24} 
              className="logo-img"
              fetchPriority="high"
            />
          </div>
          
          <div className="header-center">
            <h2 className="txt-orange">MAKE AN APPOINTMENT</h2>
          </div>
          
          <div className="header-right">
            <button className="close-x" onClick={handleClose} aria-label="Close modal">&times;</button>
          </div>
        </header>

        {/* BODY */}
        <div className="modal-body">
          {!isSubmitted ? (
            <>
              <div className="image-side">
                <Image 
                  src="/assets/2025-09-21.webp" 
                  alt="Clinic Reception" 
                  width={400} 
                  height={350} 
                  className="side-img"
                  priority
                />
              </div>

              <form className="appointment-form" onSubmit={handleConfirm}>
                <div className="form-row">
                  <div className="field">
                    <label htmlFor="cName">NAME</label>
                    <input type="text" id="cName" name="cName" placeholder="Full name" required autoComplete="name" />
                  </div>
                  <div className="field">
                    <label htmlFor="cPhone">PHONE</label>
                    <input type="tel" id="cPhone" name="cPhone" placeholder="Enter Phone No" required autoComplete="tel" />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="field">
                    <label htmlFor="cDate">DATE</label>
                    <input type="date" id="cDate" name="cDate" required />
                  </div>
                  <div className="field">
                    <label htmlFor="cService">SERVICE</label>
                    <select 
                      id="cService"
                      name="cService" 
                      required 
                      value={selectedService} 
                      onChange={(e) => setSelectedService(e.target.value)}
                    >
                      <option value="" disabled>Select Service</option>
                      <option value="Slimming">Slimming</option>
                      <option value="Skin Care">Skin Care</option>
                      <option value="Hair Restoration">Hair Restoration</option>
                      <option value="Laser Tech">Laser Tech</option>
                      <option value="Dental Aesthetics">Dental Aesthetics</option>
                      <option value="Bridal Studio">Bridal Studio</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                {selectedService === "Other" && (
                  <div className="field reveal-animation">
                    <label htmlFor="cOtherText">PLEASE SPECIFY SERVICE</label>
                    <input type="text" id="cOtherText" name="cOtherText" placeholder="e.g. Specialized Facial" required />
                  </div>
                )}

                <div className="field">
                  <label htmlFor="cMessage">MESSAGE (OPTIONAL)</label>
                  <textarea id="cMessage" name="cMessage" placeholder="Tell us more about your concerns..." rows={3}></textarea>
                </div>
                
                <div className="form-footer">
                  <button type="submit" className="confirm-btn">Confirm Appointment</button>
                </div>
              </form>
            </>
          ) : (
            <div className="success-container">
              <i className="fas fa-check-circle success-icon" aria-hidden="true"></i>
              <h2 className="success-title">Confirmed!</h2>
              <div className="appoint-details">
                <p><strong>Booking ID:</strong> <span className="brand-orange">{formData.id}</span></p>
                <p><strong>Date:</strong> <span>{formData.date}</span></p>
                <p><strong>Service:</strong> <span>{formData.service}</span></p>
              </div>
              <button className="confirm-btn" onClick={handleClose} style={{marginTop: '20px', width: 'auto'}}>Close</button>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0; left: 0; width: 100vw; height: 100vh;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(8px);
          display: flex; justify-content: center; align-items: center;
          z-index: 10000; padding: 20px;
        }

        .modal-box {
          background: #fff;
          width: 100%;
          max-width: 950px;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          display: flex;
          flex-direction: column;
        }

        .modal-header { 
          display: grid; 
          grid-template-columns: 1fr auto 1fr; /* Logic for Logo (left) | Text (Center) | Close (Right) */
          margin-top:60px;
          max-width: 950px;
          border-radius: 12px;
          align-items: center; 
          padding: 20px 40px; 
          background: #1a1a1a;
          width: 100%;
        }

        .header-left { display: flex; justify-content: flex-start; }
        .header-center { display: flex; justify-content: center; }
        .header-right { display: flex; justify-content: flex-end; }

        .txt-orange { font-family: serif; font-size: 22px; color: #e65100; margin: 0; font-weight: 700; line-height: 1.2; text-align: center; }
        .logo-img { height: auto; filter: brightness(0) invert(1); }
        .close-x { font-size: 35px; border: none; background: none; cursor: pointer; color: #fff; line-height: 1; }

        .modal-body { 
          display: grid; 
          grid-template-columns: ${isSubmitted ? '1fr' : '1fr 1.2fr'}; 
          padding: 30px 40px;
          gap: 30px;
          align-items: start;
        }
        
        .image-side { width: 100%; height: auto; }
        .side-img { width: 100%; height: auto; border-radius: 12px; object-fit: cover; }

        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .field { margin-bottom: 15px; display: flex; flex-direction: column; }
        label { font-size: 11px; font-weight: 800; color: #444; margin-bottom: 5px; letter-spacing: 0.5px; }
        
        input, select, textarea { 
          padding: 10px; 
          border: 1px solid #ddd; 
          border-radius: 6px; 
          font-size: 14px;
          width: 100%;
        }

        .confirm-btn { 
          background: #e65100; 
          color: white; 
          width: 100%; 
          padding: 12px; 
          border: none; 
          border-radius: 6px; 
          font-weight: 700; 
          cursor: pointer; 
          text-transform: uppercase;
          margin-top: 10px;
        }

        .success-container { grid-column: span 2; text-align: center; padding: 40px 0; }
        .success-icon { font-size: 50px; color: #e65100; margin-bottom: 15px; }
        .appoint-details { margin: 20px auto; max-width: 300px; text-align: left; background: #f9f9f9; padding: 15px; border-radius: 8px; }
        .appoint-details p { display: flex; justify-content: space-between; margin: 5px 0; font-size: 14px; }

        @media (max-width: 850px) {
          .modal-box { max-height: 90vh; overflow-y: auto; }
          .modal-header { 
             grid-template-columns: 1fr 1fr; /* Logo and Close only for mobile to save space */
             padding: 15px 20px;
          }
          .header-center { display: none; } /* Hide center text on small mobile screens to prevent overlap */
          .modal-body { grid-template-columns: 1fr; padding: 20px; }
          .image-side { display: none; }
          .form-row { grid-template-columns: 1fr; gap: 0; }
        }
      `}</style>
    </div>
  );
}