import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Crown, ChevronDown, PartyPopper, Clock } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';

export default function HeroSection() {
  const [time, setTime] = useState({ days: 21 * 365, hours: 14, mins: 25, secs: 30 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime({
        days: 21 * 365 + 5,
        hours: now.getHours(),
        mins: now.getMinutes(),
        secs: now.getSeconds()
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const triggerConfetti = () => {
    // Multi-stage fireworks and confetti burst
    const end = Date.now() + 2 * 1000;
    const colors = ['#f43f5e', '#fbbf24', '#c084fc', '#ffffff', '#38bdf8'];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  const scrollToCake = () => {
    document.getElementById('cake-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '110px 20px 60px',
        zIndex: 1
      }}
    >
      {/* Top Milestone Badge */}
      <div
        className="glass-pill"
        style={{
          marginBottom: '24px',
          borderColor: 'var(--accent-primary)',
          boxShadow: '0 0 20px rgba(244, 63, 94, 0.25)',
          animation: 'floatGentle 4s ease-in-out infinite'
        }}
      >
        <Crown size={17} style={{ color: 'var(--accent-gold)' }} />
        <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>
          {birthdayData.milestoneTitle}
        </span>
        <Sparkles size={16} style={{ color: 'var(--accent-primary)' }} />
      </div>

      {/* Main Heading */}
      <h1
        style={{
          fontSize: 'clamp(2.5rem, 6vw, 4.4rem)',
          fontWeight: 900,
          lineHeight: 1.15,
          maxWidth: '900px',
          margin: '0 auto 20px'
        }}
      >
        Happy 21st Birthday, <br />
        <span className="gradient-text">{birthdayData.name}</span>! 💖
      </h1>

      {/* Romantic Tagline */}
      <p
        style={{
          fontSize: 'clamp(1.1rem, 2.2vw, 1.35rem)',
          color: 'var(--text-secondary)',
          maxWidth: '680px',
          margin: '0 auto 36px',
          lineHeight: 1.6
        }}
      >
        {birthdayData.tagline}
      </p>

      {/* Action Buttons */}
      <div
        style={{
          display: 'flex',
          gap: '16px',
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginBottom: '56px'
        }}
      >
        <button onClick={triggerConfetti} className="btn-primary">
          <PartyPopper size={20} />
          <span>Launch Confetti! 🎉</span>
        </button>

        <button onClick={scrollToCake} className="btn-secondary">
          <Heart size={18} style={{ color: 'var(--accent-primary)' }} />
          <span>Blow 21st Candles 🎂</span>
        </button>
      </div>

      {/* 21 Milestone Celebration Stats Card */}
      <div
        className="glass-panel"
        style={{
          maxWidth: '680px',
          width: '100%',
          padding: '24px 32px',
          borderRadius: 'var(--radius-lg)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: '20px',
          border: '1px solid var(--border-glass)',
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        <div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '4px' }}>
            YEARS OF GRACE
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--accent-gold)', lineHeight: 1 }}>
            21 ✨
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Milestone Chapter
          </div>
        </div>

        <div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '4px' }}>
            DAYS OF SUNSHINE
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--accent-primary)', lineHeight: 1 }}>
            7,670+
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Lighting Up Hearts
          </div>
        </div>

        <div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '4px' }}>
            LOVE FOR YOU
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--accent-purple)', lineHeight: 1 }}>
            ∞
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            To Infinity & Beyond
          </div>
        </div>
      </div>

      {/* Subtle Scroll Down Prompt */}
      <div
        onClick={scrollToCake}
        style={{
          marginTop: '44px',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          color: 'var(--text-muted)',
          fontSize: '0.85rem',
          transition: 'color 0.2s ease'
        }}
      >
        <span>Scroll to explore your surprises</span>
        <ChevronDown size={20} className="animate-float" style={{ color: 'var(--accent-primary)' }} />
      </div>
    </section>
  );
}
