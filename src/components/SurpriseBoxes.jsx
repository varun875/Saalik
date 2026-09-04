import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Gift, Ticket, Heart, Sparkles, X, ChevronRight, ChevronLeft, Award } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';

export default function SurpriseBoxes() {
  const [activeSurprise, setActiveSurprise] = useState(null);
  const [currentReasonIndex, setCurrentReasonIndex] = useState(0);

  const handleOpenSurprise = (surprise) => {
    setActiveSurprise(surprise);
    confetti({
      particleCount: 80,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#fbbf24', '#c084fc', '#ffffff']
    });
  };

  const handleNextReason = (e) => {
    e.stopPropagation();
    setCurrentReasonIndex((prev) => (prev + 1) % birthdayData.reasons.length);
  };

  const handlePrevReason = (e) => {
    e.stopPropagation();
    setCurrentReasonIndex((prev) => (prev - 1 + birthdayData.reasons.length) % birthdayData.reasons.length);
  };

  return (
    <section id="surprises-section" className="section-spacing">
      <div className="container">
        <div className="section-header">
          <span className="tag">Birthday Perks & Surprises</span>
          <h2>3 Special 21st Milestone Gifts 🎁</h2>
          <p>
            You deserve the entire universe today. Pick a box to unlock your official birthday surprises!
          </p>
        </div>

        {/* 3 Surprise Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '28px'
          }}
        >
          {birthdayData.surprises.map((item, idx) => (
            <div
              key={item.id}
              className="glass-panel"
              onClick={() => handleOpenSurprise(item)}
              style={{
                padding: '36px 24px',
                textAlign: 'center',
                cursor: 'pointer',
                border: '1px solid var(--border-glass)',
                borderRadius: 'var(--radius-lg)',
                position: 'relative',
                transition: 'all 0.35s ease'
              }}
            >
              {/* Top Badge */}
              <div
                style={{
                  display: 'inline-block',
                  padding: '4px 14px',
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(255, 255, 255, 0.08)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: 'var(--accent-primary)',
                  marginBottom: '20px'
                }}
              >
                {item.badge}
              </div>

              {/* Gift Icon Box */}
              <div
                style={{
                  width: '84px',
                  height: '84px',
                  borderRadius: '24px',
                  background: item.gradient,
                  margin: '0 auto 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
                  animation: `floatGentle ${3.5 + idx * 0.5}s ease-in-out infinite`
                }}
              >
                {idx === 0 ? (
                  <Ticket size={40} color="#ffffff" />
                ) : idx === 1 ? (
                  <Sparkles size={40} color="#ffffff" />
                ) : (
                  <Gift size={40} color="#ffffff" />
                )}
              </div>

              <h3 style={{ fontSize: '1.35rem', color: 'var(--text-primary)', marginBottom: '10px' }}>
                {item.title}
              </h3>

              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '24px', lineHeight: 1.5 }}>
                {item.summary}
              </p>

              <button className="btn-secondary" style={{ padding: '10px 22px', fontSize: '0.88rem' }}>
                <span>Claim & Unbox ✨</span>
              </button>
            </div>
          ))}
        </div>

        {/* Extra Interactive Section: Reasons Why You Light Up My World */}
        <div
          className="glass-panel"
          style={{
            marginTop: '50px',
            padding: '40px 28px',
            textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.08) 0%, rgba(192, 132, 252, 0.08) 100%)',
            border: '1px solid var(--border-glow)'
          }}
        >
          <div className="glass-pill" style={{ marginBottom: '14px' }}>
            <Heart size={14} style={{ color: 'var(--accent-primary)' }} />
            <span>Reason {currentReasonIndex + 1} of {birthdayData.reasons.length}</span>
          </div>

          <h3 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', marginBottom: '12px' }}>
            {birthdayData.reasons[currentReasonIndex].title}
          </h3>

          <p
            style={{
              fontSize: '1.15rem',
              color: 'var(--text-secondary)',
              maxWidth: '620px',
              margin: '0 auto 28px',
              minHeight: '60px',
              lineHeight: 1.6
            }}
          >
            "{birthdayData.reasons[currentReasonIndex].desc}"
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px' }}>
            <button onClick={handlePrevReason} className="btn-secondary" style={{ padding: '8px 18px' }}>
              <ChevronLeft size={16} />
              <span>Previous</span>
            </button>
            <button onClick={handleNextReason} className="btn-primary" style={{ padding: '8px 22px' }}>
              <span>Next Reason</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Modal for Surprise Box */}
        {activeSurprise && (
          <div
            onClick={() => setActiveSurprise(null)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(10, 5, 15, 0.88)',
              backdropFilter: 'blur(16px)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px'
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="glass-panel"
              style={{
                maxWidth: '540px',
                width: '100%',
                background: 'var(--bg-secondary)',
                borderRadius: 'var(--radius-lg)',
                padding: '36px 28px',
                position: 'relative',
                textAlign: 'center',
                border: '1px solid var(--border-glow)',
                boxShadow: 'var(--shadow-lg)'
              }}
            >
              <button
                onClick={() => setActiveSurprise(null)}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer'
                }}
              >
                <X size={22} />
              </button>

              <div
                style={{
                  width: '70px',
                  height: '70px',
                  borderRadius: '20px',
                  background: activeSurprise.gradient,
                  margin: '0 auto 18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.3)'
                }}
              >
                <Award size={36} color="#ffffff" />
              </div>

              <span style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--accent-primary)', textTransform: 'uppercase' }}>
                {activeSurprise.badge}
              </span>

              <h3 style={{ fontSize: '1.6rem', color: 'var(--text-primary)', margin: '8px 0 16px' }}>
                {activeSurprise.title}
              </h3>

              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  padding: '20px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-glass)',
                  color: 'var(--text-secondary)',
                  fontSize: '1rem',
                  lineHeight: 1.7,
                  marginBottom: '24px',
                  textAlign: 'left'
                }}
              >
                {activeSurprise.details}
              </div>

              <button
                onClick={() => setActiveSurprise(null)}
                className="btn-primary"
                style={{ width: '100%' }}
              >
                <span>Redeem & Keep Forever 💖</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
