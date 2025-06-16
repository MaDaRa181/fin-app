
import React from 'react';
import { Link } from 'react-router-dom';
import { NAV_LINKS, FOOTER_CONTACT_EMAIL, FOOTER_CONTACT_PHONE, FOOTER_ADDRESS, FOOTER_COPYRIGHT, APP_NAME } from '../../constants';

const FacebookIcon: React.FC = () => (
  <svg width="24" height="24" fill="currentColor" aria-hidden="true" viewBox="0 0 24 24">
    <path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 5 3.657 9.127 8.438 9.877v-6.987h-2.54v-2.89h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.632.771-1.632 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.343 21.127 22 17 22 12"></path>
  </svg>
);

const InstagramIcon: React.FC = () => (
  <svg width="24" height="24" fill="currentColor" aria-hidden="true" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608C4.515 2.567 5.782 2.295 7.148 2.233 8.414 2.175 8.794 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.771.13 4.633.402 3.678 1.357c-.955.955-1.227 2.093-1.285 3.374C2.013 5.668 2 6.077 2 12c0 5.923.013 6.332.072 7.613.058 1.281.33 2.419 1.285 3.374.955.955 2.093 1.227 3.374 1.285C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.281-.058 2.419-.33 3.374-1.285.955-.955 1.227-2.093 1.285-3.374.059-1.281.072-1.69.072-7.613 0-5.923-.013-6.332-.072-7.613-.058-1.281-.33-2.419-1.285-3.374-.955-.955-2.093-1.227-3.374-1.285C15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"></path>
  </svg>
);

const TelegramIcon: React.FC = () => (
  <svg width="24" height="24" fill="currentColor" aria-hidden="true" viewBox="0 0 24 24">
    <path d="M21.05 2.56c-.36-.3-.88-.36-1.32-.16L3.1 9.6c-.5.22-.82.7-.78 1.24.04.54.44.98.98 1.04l4.7.54 1.7 5.1c.16.48.62.8 1.12.8.02 0 .04 0 .06-.01.54-.06.98-.5 1.04-1.04l.54-4.7 7.2-16.63c.2-.44.14-.96-.16-1.32z"></path>
  </svg>
);


const Footer: React.FC = () => {
  return (
    <footer className="bg-bg-card text-text-muted text-sm py-8 border-t border-slate-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-6">
        <nav className="flex flex-wrap gap-x-6 gap-y-2 justify-center">
          {NAV_LINKS.map((link) => (
            <Link key={link.path} to={link.path} className="text-primary hover:text-accent font-medium">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="text-center space-y-1">
          <div><strong>{APP_NAME}</strong></div>
          <div>
            <span>Зв'язок: </span>
            <a href={`mailto:${FOOTER_CONTACT_EMAIL}`} className="text-primary hover:text-accent">{FOOTER_CONTACT_EMAIL}</a>
            <span className="mx-1">|</span>
            <span>Телефон: </span>
            <a href={`tel:${FOOTER_CONTACT_PHONE.replace(/\s+/g, '')}`} className="text-primary hover:text-accent">{FOOTER_CONTACT_PHONE}</a>
          </div>
          <div>
            <span>Адреса: </span>
            <span>{FOOTER_ADDRESS}</span>
          </div>
        </div>

        <div className="flex gap-5 justify-center">
          <a href="#" title="Facebook" className="text-primary hover:text-accent"><FacebookIcon /></a>
          <a href="#" title="Instagram" className="text-primary hover:text-accent"><InstagramIcon /></a>
          <a href="#" title="Telegram" className="text-primary hover:text-accent"><TelegramIcon /></a>
        </div>
        
        <div className="text-center space-y-1">
          <div>
            <Link to="/privacy-policy" className="text-primary hover:text-accent">Політика конфіденційності</Link>
            <span className="mx-1">|</span>
            <Link to="/terms-of-service" className="text-primary hover:text-accent">Умови використання</Link>
          </div>
          <div>{FOOTER_COPYRIGHT}</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
