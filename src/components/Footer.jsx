import React from 'react';
import { Heart, Sparkles, ArrowUp } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        padding: '60px 20px 40px',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1,
        borderTop: '1px solid var(--border-glass)',
        background: 'linear-gradient(180deg, transparent 0%, var(--bg-secondary) 100%)'
      }}
    >
      <div className="container" style={{ maxWidth: '600px' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--accent-primary)',
            marginBottom: '12px'
          }}
        >
          <Sparkles size={18} />
          <Heart size={20} fill="var(--accent-primary)" />
          <Sparkles size={18} />
        </div>

        <h4 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '8px' }}>
          Happy 21st Birthday, {birthdayData.name}!
        </h4>

        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '24px' }}>
          Crafted with all love, laughs, and endless affection for Noorani from Saalik. Here’s to making chapter 21 the most magical year yet!
        </p>

        <button
          onClick={scrollToTop}
          className="btn-secondary"
          style={{ padding: '8px 20px', fontSize: '0.82rem' }}
        >
          <ArrowUp size={14} />
          <span>Back to Top</span>
        </button>
      </div>
    </footer>
  );
}
