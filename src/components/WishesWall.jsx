import React, { useState } from 'react';
import { Sparkles, HeartHandshake, Compass, Crown, Flame, Star, Heart } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';

export default function WishesWall() {
  const [heartCount, setHeartCount] = useState(21);
  const [floatingHearts, setFloatingHearts] = useState([]);

  const iconMap = {
    Sparkles,
    HeartHandshake,
    Compass,
    Crown,
    Flame,
    Star
  };

  const handleSendHeart = (e) => {
    setHeartCount((prev) => prev + 1);

    const newHeart = {
      id: Date.now() + Math.random(),
      x: e.clientX || window.innerWidth / 2,
      y: e.clientY || window.innerHeight / 2,
      size: Math.random() * 20 + 20,
      color: ['#f43f5e', '#fb7185', '#fbbf24', '#c084fc', '#ffffff'][Math.floor(Math.random() * 5)]
    };

    setFloatingHearts((prev) => [...prev, newHeart]);

    setTimeout(() => {
      setFloatingHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 2500);
  };

  return (
    <section id="wishes-section" className="section-spacing">
      <div className="container">
        <div className="section-header">
          <span className="tag">Heartfelt Blessings</span>
          <h2>Wishes for Your 21st Year 🌟</h2>
          <p>
            May each day ahead be filled with as much happiness as you give to the people around you.
          </p>

          {/* Interactive Heart Button */}
          <div style={{ marginTop: '20px' }}>
            <button
              onClick={handleSendHeart}
              className="btn-primary pulse-glow"
              style={{ padding: '12px 28px', fontSize: '0.95rem' }}
            >
              <Heart size={18} fill="#ffffff" />
              <span>Send Love to Noorani ({heartCount} Hearts Sent)</span>
            </button>
          </div>
        </div>

        {/* Wishes Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '26px'
          }}
        >
          {birthdayData.wishes.map((item, idx) => {
            const IconComponent = iconMap[item.icon] || Sparkles;
            return (
              <div
                key={idx}
                className="glass-panel"
                style={{
                  padding: '30px 24px',
                  borderRadius: 'var(--radius-md)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '16px'
                  }}
                >
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '14px',
                      background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.2) 0%, rgba(251, 191, 36, 0.2) 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid var(--border-glass)'
                    }}
                  >
                    <IconComponent size={22} style={{ color: 'var(--accent-primary)' }} />
                  </div>

                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      color: 'var(--accent-gold)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-full)',
                      background: 'rgba(251, 191, 36, 0.1)',
                      border: '1px solid rgba(251, 191, 36, 0.2)'
                    }}
                  >
                    {item.badge}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '10px' }}>
                  {item.title}
                </h3>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.65 }}>
                  {item.message}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Render Floating Hearts */}
      {floatingHearts.map((h) => (
        <div
          key={h.id}
          className="floating-heart"
          style={{
            left: `${h.x}px`,
            top: `${h.y}px`,
            color: h.color
          }}
        >
          <Heart size={h.size} fill={h.color} />
        </div>
      ))}
    </section>
  );
}
