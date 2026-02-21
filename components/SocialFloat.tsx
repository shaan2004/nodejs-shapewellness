import React from 'react';

const SocialFloat = () => {
  const socialLinks = [
    { id: 'whatsapp', icon: 'fab fa-whatsapp', color: '#25D366', url: 'https://wa.me/919500559119' },
    { id: 'instagram', icon: 'fab fa-instagram', color: '#E4405F', url: 'https://www.instagram.com/shapewellness.chennai/#' },
    { id: 'facebook', icon: 'fab fa-facebook-f', color: '#1877F2', url: 'https://www.facebook.com/profile.php?id=61578854806823#' },
  ];

  return (
    <div className="social-float-container">
      {socialLinks.map((link) => (
        <a
          key={link.id}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="social-float-icon"
          style={{ backgroundColor: link.color }}
        >
          <i className={link.icon}></i>
        </a>
      ))}
    </div>
  );
};

export default SocialFloat;