"use client";
import { useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AppointmentModal({ isOpen, onClose }: ModalProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    id: "SW-" + Math.floor(1000 + Math.random() * 9000),
    date: "",
    time: "10:00 AM",
    service: ""
  });

  if (!isOpen) return null;

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    const target = e.target as any;
    
    setFormData({
      ...formData,
      date: target.cDate.value,
      service: target.cServiceText?.value || "General Consultation"
    });
    
    setIsSubmitted(true);
  };

  const handleClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        
        {!isSubmitted ? (
          <>
            <header className="modal-header">
              <div className="title-group">
                <h2 className="txt-orange">MAKE AN</h2>
                <h2 className="txt-orange">APPOINTMENT</h2>
              </div>
              <div className="header-right">
                <img src="/assets/Shape Wellness Logo Final.png" alt="Logo" className="logo-img" />
                <button className="close-x" onClick={handleClose}>&times;</button>
              </div>
            </header>

            <div className="modal-body">
              <div className="image-side">
                <div className="brand-accent-bg" />
                <img src="/assets/2025-09-21.webp" alt="Wellness" className="side-img" />
              </div>

              <form className="appointment-form" onSubmit={handleConfirm}>
                <div className="form-row">
                  <div className="field">
                    <label>NAME</label>
                    <input type="text" name="cName" placeholder="Full name" required />
                  </div>
                  <div className="field">
                    <label>PHONE</label>
                    <input type="tel" name="cPhone" placeholder="Enter Phone No" required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="field">
                    <label>DATE</label>
                    <input type="date" name="cDate" required />
                  </div>
                  <div className="field">
                    <label>SERVICE</label>
                    <input type="text" name="cServiceText" placeholder="Enter Service" />
                  </div>
                </div>
                <div className="field">
                  <label>MESSAGE</label>
                  <textarea placeholder="Tell us more..." rows={3}></textarea>
                </div>
                <div className="form-footer">
                  <button type="submit" className="confirm-btn">Confirm Appointment</button>
                </div>
              </form>
            </div>
          </>
        ) : (
          <div className="success-message">
            <i className="fas fa-check-circle success-icon"></i>
            <h2 className="success-title">Appointment Confirmed!</h2>
            <p className="success-text">Thank you. Your consultation is booked.</p>
            
            <div className="appoint-details">
              <p><strong>ID:</strong> <span className="brand-orange">{formData.id}</span></p>
              <p><strong>Date:</strong> <span>{formData.date}</span></p>
              <p><strong>Time:</strong> <span>{formData.time}</span></p>
              <p><strong>Service:</strong> <span>{formData.service}</span></p>
            </div>
            
            <button className="confirm-btn" onClick={handleClose} style={{marginTop: '20px', width: 'auto', padding: '12px 40px'}}>
              Close
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.85); /* Slightly darker for better contrast */
          backdrop-filter: blur(5px);
          display: flex; 
          justify-content: center;
          align-items: center; /* Fix for vertical centering */
          z-index: 1000000; /* Increased to ensure it is above all site headers */
          padding: 20px;
        }

        .modal-box {
          background: #fff;
          width: 100%;
          max-width: 950px;
          border-radius: 12px;
          position: relative; /* Changed from overflow:hidden to allow clean borders */
          box-shadow: 0 30px 60px rgba(0,0,0,0.5);
          animation: popUp 0.3s ease;
          display: flex;
          flex-direction: column;
        }

        @keyframes popUp {
          from { opacity: 0; transform: scale(0.95) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        .modal-header { 
          display: flex; 
          justify-content: space-between; 
          align-items: flex-end; 
          padding: 30px 50px 20px; 
          /* Removed border-bottom black line */
          border-bottom: none; 
        }

        .txt-black { font-family: serif; font-size: 24px; color: #1a1a1a; margin: 0; letter-spacing: 1.5px; }
        .txt-orange { font-family: serif; font-size: 28px; color: #e65100; margin: 0; font-weight: 600; letter-spacing: 1.5px; }
        .logo-img { height: 40px; width: auto; }
        .close-x { font-size: 40px; border: none; background: none; cursor: pointer; color: #bbb; line-height: 0.5; }

        .modal-body { display: grid; grid-template-columns: 1fr 1.3fr; gap: 50px; padding: 20px 50px 40px; }
        
        .image-side { position: relative; }
        .brand-accent-bg { position: absolute; top: -15px; left: -15px; width: 75%; height: 55%; background: #fff3e0; border-radius: 20px; }
        .side-img { width: 100%; height: 100%; min-height: 420px; object-fit: cover; border-radius: 20px; position: relative; z-index: 2; box-shadow: 10px 10px 25px rgba(0,0,0,0.1); }

        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .field { margin-bottom: 20px; display: flex; flex-direction: column; }
        label { font-size: 13px; font-weight: 700; color: #555; margin-bottom: 8px; letter-spacing: 0.5px; }
        input, textarea { padding: 12px; border: 1px solid #ddd; border-radius: 8px; font-size: 14px; background: #fff; }

        .form-footer { display: flex; justify-content: flex-end; margin-top: 10px; }
        .confirm-btn { background: #e65100; color: white; padding: 14px 30px; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; transition: 0.3s; }
        .confirm-btn:hover { background: #bf360c; transform: translateY(-1px); }

        /* Success Message Styles */
        .success-message { padding: 60px 40px; text-align: center; display: flex; flex-direction: column; align-items: center; }
        .success-icon { font-size: 65px; color: #e65100; margin-bottom: 20px; }
        .success-title { font-family: serif; font-size: 36px; margin-bottom: 12px; color: #1a1a1a; }
        .success-text { color: #555; margin-bottom: 35px; }
        .appoint-details { background: #fafafa; padding: 30px; border-radius: 12px; width: 100%; max-width: 400px; border: 1px solid #eee; }
        .appoint-details p { margin: 12px 0; font-size: 16px; display: flex; justify-content: space-between; border-bottom: 1px solid #f0f0f0; padding-bottom: 8px; }
        .brand-orange { color: #e65100; font-weight: bold; }

        @media (max-width: 850px) {
          .modal-body { grid-template-columns: 1fr; padding: 20px; }
          .image-side { display: none; }
          .modal-header { padding: 20px 30px; }
          .txt-black { font-size: 18px; }
          .txt-orange { font-size: 22px; }
        }
      `}</style>
    </div>
  );
}