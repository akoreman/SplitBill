'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalculator, faPlay, faInfoCircle, nonExistentIcon } from '@fortawesome/free-solid-svg-icons';

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    if (typeof window !== 'undefined') {
      const element = document.getElementById(sectionId);
      if (element) {
        const headerHeight = 96;
        const targetPosition = element.offsetTop - headerHeight - 20;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <section style={{ textAlign: 'center', marginBottom: '6rem', padding: '0 1rem' }}>
      <div className="glass-card glass-card-hover" style={{ 
        maxWidth: '56rem', 
        margin: '0 auto', 
        padding: '4rem',
        animation: 'fadeInUp 0.6s ease-out'
      }}>
        <div style={{ fontSize: '4rem', color: '#2563eb', marginBottom: '1.5rem' }}>
          <FontAwesomeIcon icon={faCalculator} />
        </div>
        <h1 style={{ 
          fontFamily: "'Inter', sans-serif",
          fontSize: '3.5rem',
          fontWeight: 700,
          marginBottom: '1rem',
          color: '#1e3a8a'
        }}>
          Split Bill
        </h1>
        <p style={{ 
          fontSize: '1.25rem',
          color: '#3b82f6',
          marginBottom: '2.5rem',
          maxWidth: '32rem',
          margin: '0 auto 2.5rem auto',
          lineHeight: 1.6
        }}>
          Effortlessly split bills with friends – calculate shares, tips, and payments in seconds.
        </p>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          gap: '1rem',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Link
            href="/split"
            className="btn-glass btn-primary"
            style={{ 
              borderRadius: '50px',
              fontSize: '1.125rem',
              padding: '1rem 2rem',
              textDecoration: 'none'
            }}
          >
            <FontAwesomeIcon icon={faPlay} style={{ marginRight: '0.5rem' }} />
            Get Started
          </Link>
          <button
            onClick={() => scrollToSection('features')}
            className="btn-glass btn-secondary"
            style={{ 
              borderRadius: '50px',
              fontSize: '1.125rem',
              padding: '1rem 2rem'
            }}
          >
            <FontAwesomeIcon icon={faInfoCircle} style={{ marginRight: '0.5rem' }} />
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}