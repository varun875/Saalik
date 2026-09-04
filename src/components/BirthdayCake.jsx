import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Flame, RotateCcw, Heart, Wand2 } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';

export default function BirthdayCake() {
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [wishMade, setWishMade] = useState(false);

  const playBlowSound = () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.3); // G5
      osc.frequency.exponentialRampToValueAtTime(1046.50, ctx.currentTime + 0.7); // C6

      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.9);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.9);
    } catch (e) {
      console.log('Audio context not allowed yet', e);
    }
  };

  const handleBlowCandles = () => {
    if (candlesBlown) return;

    setCandlesBlown(true);
    setWishMade(true);
    playBlowSound();

    // Fire big celebratory confetti shower
    const count = 200;
    const defaults = {
      origin: { y: 0.7 }
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55, colors: ['#fbbf24', '#f43f5e'] });
    fire(0.2, { spread: 60, colors: ['#ffffff', '#c084fc'] });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8, colors: ['#38bdf8', '#f43f5e', '#fbbf24'] });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  };

  const handleRelight = () => {
    setCandlesBlown(false);
  };

  return (
    <section id="cake-section" className="section-spacing">
      <div className="container" style={{ maxWidth: '850px' }}>
        <div className="section-header">
          <span className="tag">Make a 21st Birthday Wish</span>
          <h2>The Virtual 21st Birthday Cake 🎂</h2>
          <p>
            Close your eyes, make the most beautiful wish of your heart, and tap to blow out the 21st milestone candles!
          </p>
        </div>

        <div
          className="glass-panel"
          style={{
            padding: '48px 24px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid var(--border-glass)',
            boxShadow: 'var(--shadow-lg)'
          }}
        >
          {/* Sparkle background element */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '320px',
              height: '320px',
              background: candlesBlown
                ? 'radial-gradient(circle, rgba(244, 63, 94, 0.15) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(251, 191, 36, 0.22) 0%, transparent 70%)',
              pointerEvents: 'none',
              transition: 'background 0.6s ease'
            }}
          />

          {/* SVG Illustrated Cake */}
          <div
            onClick={!candlesBlown ? handleBlowCandles : undefined}
            style={{
              cursor: candlesBlown ? 'default' : 'pointer',
              display: 'inline-block',
              margin: '0 auto 32px',
              position: 'relative',
              userSelect: 'none'
            }}
            title={candlesBlown ? 'Candles Blown!' : 'Click to blow out the candles!'}
          >
            <svg
              width="280"
              height="240"
              viewBox="0 0 280 240"
              style={{ filter: 'drop-shadow(0 14px 25px rgba(0,0,0,0.4))' }}
            >
              {/* Plate */}
              <ellipse cx="140" cy="225" rx="120" ry="12" fill="#ffffff22" stroke="#ffffff44" strokeWidth="2" />
              <ellipse cx="140" cy="223" rx="105" ry="9" fill="#ffffff33" />

              {/* Tier 1 (Bottom Cake Layer) */}
              <rect x="50" y="150" width="180" height="65" rx="14" fill="#be185d" />
              <rect x="50" y="150" width="180" height="15" fill="#f43f5e" />
              {/* Bottom decorative frosting drips */}
              <path
                d="M 50 165 Q 65 178 80 165 Q 95 178 110 165 Q 125 178 140 165 Q 155 178 170 165 Q 185 178 200 165 Q 215 178 230 165 L 230 150 L 50 150 Z"
                fill="#fbcfe8"
              />

              {/* Tier 2 (Top Cake Layer) */}
              <rect x="75" y="100" width="130" height="52" rx="10" fill="#db2777" />
              <rect x="75" y="100" width="130" height="12" fill="#fda4af" />
              {/* Top layer frosting drips */}
              <path
                d="M 75 112 Q 90 124 105 112 Q 120 124 135 112 Q 150 124 165 112 Q 180 124 195 112 Q 200 120 205 112 L 205 100 L 75 100 Z"
                fill="#ffffff"
              />

              {/* Strawberries & Pearls on Cake */}
              <circle cx="95" cy="98" r="6" fill="#f43f5e" />
              <circle cx="140" cy="98" r="6" fill="#f43f5e" />
              <circle cx="185" cy="98" r="6" fill="#f43f5e" />
              <circle cx="118" cy="99" r="3.5" fill="#fbbf24" />
              <circle cx="162" cy="99" r="3.5" fill="#fbbf24" />

              {/* "21" Milestone Decor Badge on front */}
              <rect x="115" y="165" width="50" height="28" rx="8" fill="#fbbf24" stroke="#ffffff" strokeWidth="2" />
              <text x="140" y="185" textAnchor="middle" fill="#831843" fontSize="18" fontWeight="900" fontFamily="sans-serif">
                21
              </text>

              {/* Candle 1 (Left - representing '2') */}
              <rect x="115" y="55" width="12" height="42" rx="3" fill="#fef08a" stroke="#d97706" strokeWidth="1" />
              <line x1="115" y1="65" x2="127" y2="60" stroke="#f43f5e" strokeWidth="3" />
              <line x1="115" y1="78" x2="127" y2="73" stroke="#f43f5e" strokeWidth="3" />
              <line x1="121" y1="55" x2="121" y2="48" stroke="#78350f" strokeWidth="2" />

              {/* Candle 2 (Right - representing '1') */}
              <rect x="153" y="55" width="12" height="42" rx="3" fill="#fef08a" stroke="#d97706" strokeWidth="1" />
              <line x1="153" y1="65" x2="165" y2="60" stroke="#38bdf8" strokeWidth="3" />
              <line x1="153" y1="78" x2="165" y2="73" stroke="#38bdf8" strokeWidth="3" />
              <line x1="159" y1="55" x2="159" y2="48" stroke="#78350f" strokeWidth="2" />

              {/* FLAMES OR SMOKE */}
              {!candlesBlown ? (
                <>
                  {/* Left Flame */}
                  <g className="animate-flame" style={{ transformOrigin: '121px 48px' }}>
                    <ellipse cx="121" cy="38" rx="7" ry="12" fill="#fbbf24" />
                    <ellipse cx="121" cy="39" rx="4" ry="8" fill="#ef4444" />
                    <ellipse cx="121" cy="41" rx="2" ry="4" fill="#ffffff" />
                  </g>

                  {/* Right Flame */}
                  <g className="animate-flame" style={{ transformOrigin: '159px 48px', animationDelay: '0.2s' }}>
                    <ellipse cx="159" cy="38" rx="7" ry="12" fill="#fbbf24" />
                    <ellipse cx="159" cy="39" rx="4" ry="8" fill="#ef4444" />
                    <ellipse cx="159" cy="41" rx="2" ry="4" fill="#ffffff" />
                  </g>
                </>
              ) : (
                <>
                  {/* Smoke Wisps */}
                  <path
                    d="M 121 46 Q 115 35 125 24 T 120 8"
                    fill="none"
                    stroke="#cbd5e1"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    className="animate-smoke"
                  />
                  <path
                    d="M 159 46 Q 165 35 155 24 T 162 8"
                    fill="none"
                    stroke="#cbd5e1"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    className="animate-smoke"
                  />
                </>
              )}
            </svg>
          </div>

          {/* Action Button & Status */}
          <div style={{ marginTop: '10px' }}>
            {!candlesBlown ? (
              <button onClick={handleBlowCandles} className="btn-primary" style={{ fontSize: '1.05rem', padding: '16px 38px' }}>
                <Flame size={20} style={{ color: 'var(--accent-gold)' }} />
                <span>Blow Out 21st Candles & Make a Wish! ✨</span>
              </button>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '12px 24px',
                    borderRadius: 'var(--radius-full)',
                    background: 'rgba(16, 185, 129, 0.2)',
                    border: '1px solid #10b981',
                    color: '#6ee7b7',
                    fontWeight: 700,
                    fontSize: '1.05rem'
                  }}
                >
                  <Sparkles size={20} style={{ color: '#fbbf24' }} />
                  <span>Candles Blown! May every single wish come true, Noorani! 🌟</span>
                </div>

                <button onClick={handleRelight} className="btn-secondary" style={{ marginTop: '8px' }}>
                  <RotateCcw size={16} />
                  <span>Relight 21st Candles</span>
                </button>
              </div>
            )}
          </div>

          {/* Special Post-Blow Message Card */}
          {wishMade && candlesBlown && (
            <div
              style={{
                marginTop: '32px',
                padding: '24px',
                borderRadius: 'var(--radius-md)',
                background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.15) 0%, rgba(251, 191, 36, 0.15) 100%)',
                border: '1px solid var(--border-glow)',
                animation: 'floatGentle 5s ease-in-out infinite'
              }}
            >
              <Heart size={28} style={{ color: 'var(--accent-primary)', margin: '0 auto 10px', display: 'block' }} />
              <h3 style={{ fontSize: '1.3rem', color: 'var(--text-primary)', marginBottom: '8px' }}>
                A 21st Birthday Blessing for You
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', maxWidth: '620px', margin: '0 auto' }}>
                "May your 21st year be filled with laughter that makes your stomach hurt, dreams that come into reality faster than you imagine, and the unwavering knowledge that you are cherished beyond words."
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
