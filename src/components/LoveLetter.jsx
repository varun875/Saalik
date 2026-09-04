import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Mail, Heart, Sparkles, Feather, Check } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';

export default function LoveLetter() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (!isOpen) {
      setIsOpen(true);
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f43f5e', '#fbbf24', '#ffffff']
      });
    } else {
      setIsOpen(false);
    }
  };

  return (
    <section id="letter-section" className="section-spacing">
      <div className="container" style={{ maxWidth: '820px' }}>
        <div className="section-header">
          <span className="tag">From the Heart</span>
          <h2>A Sealed Letter for Noorani 💌</h2>
          <p>
            Some words can only be whispered with love. Tap the wax seal to unfold your 21st birthday letter.
          </p>
        </div>

        {/* Envelope & Letter Container */}
        <div
          style={{
            position: 'relative',
            margin: '0 auto',
            minHeight: isOpen ? 'auto' : '360px',
            transition: 'all 0.6s ease'
          }}
        >
          {/* Closed Envelope Presentation */}
          {!isOpen && (
            <div
              onClick={handleOpen}
              className="glass-panel"
              style={{
                maxWidth: '560px',
                margin: '0 auto',
                padding: '48px 32px',
                textAlign: 'center',
                cursor: 'pointer',
                border: '2px dashed var(--border-glow)',
                position: 'relative',
                background: 'linear-gradient(135deg, rgba(32, 16, 40, 0.75) 0%, rgba(56, 24, 68, 0.85) 100%)',
                animation: 'floatGentle 4s ease-in-out infinite'
              }}
            >
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #fbbf24 0%, #d97706 100%)',
                  margin: '0 auto 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 25px rgba(251, 191, 36, 0.6), inset 0 2px 4px rgba(255,255,255,0.4)',
                  border: '3px solid #fef08a'
                }}
              >
                <Heart size={36} fill="#ffffff" color="#d97706" />
              </div>

              <h3 style={{ fontSize: '1.6rem', color: 'var(--text-primary)', marginBottom: '10px' }}>
                To My Dearest Noorani
              </h3>
              <p style={{ color: 'var(--accent-secondary)', fontSize: '0.95rem', fontWeight: 600, marginBottom: '20px' }}>
                Marked Private & Confidential • Strictly for the 21st Birthday Girl
              </p>

              <button className="btn-primary" style={{ padding: '12px 28px', fontSize: '0.92rem' }}>
                <Sparkles size={16} />
                <span>Tap Seal to Open Letter</span>
              </button>
            </div>
          )}

          {/* Unfolded Parchment Letter */}
          {isOpen && (
            <div
              className="glass-panel"
              style={{
                maxWidth: '720px',
                margin: '0 auto',
                background: 'linear-gradient(135deg, #fffdfa 0%, #fff7ed 100%)',
                color: '#292524',
                padding: '44px 38px',
                borderRadius: 'var(--radius-lg)',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.5), 0 0 35px rgba(244, 63, 94, 0.3)',
                border: '1px solid #fde68a',
                position: 'relative',
                animation: 'fadeIn 0.5s ease-out'
              }}
            >
              {/* Corner Floral Ornaments */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid #fed7aa', paddingBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#be123c' }}>
                  <Feather size={20} />
                  <span style={{ fontSize: '0.85rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    A Letter of Love
                  </span>
                </div>
                <button
                  onClick={handleOpen}
                  style={{
                    background: 'none',
                    border: '1px solid #fca5a5',
                    borderRadius: 'var(--radius-full)',
                    padding: '4px 14px',
                    color: '#e11d48',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    fontWeight: 700
                  }}
                >
                  Close Letter
                </button>
              </div>

              {/* Greeting */}
              <h3
                className="font-serif"
                style={{
                  fontSize: '2rem',
                  color: '#9f1239',
                  marginBottom: '20px',
                  fontWeight: 700
                }}
              >
                {birthdayData.loveLetter.greeting}
              </h3>

              {/* Paragraphs */}
              <div style={{ fontSize: '1.08rem', lineHeight: '1.85', color: '#44403c' }}>
                {birthdayData.loveLetter.paragraphs.map((para, idx) => (
                  <p key={idx} style={{ marginBottom: '18px' }}>
                    {para}
                  </p>
                ))}
              </div>

              {/* Closing Signature */}
              <div style={{ marginTop: '32px', paddingTop: '20px', borderTop: '1px dashed #fed7aa' }}>
                <p style={{ fontStyle: 'italic', color: '#78716c', marginBottom: '4px' }}>
                  {birthdayData.loveLetter.closing}
                </p>
                <p
                  className="font-cursive"
                  style={{
                    fontSize: '2.2rem',
                    color: '#be123c',
                    fontWeight: 700,
                    margin: 0
                  }}
                >
                  {birthdayData.loveLetter.signature}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
