import React from 'react';
import { Sparkles, HeartHandshake, Compass, Crown, Flame, Star } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';

export default function WishesWall() {
  const iconMap = {
    Sparkles,
    HeartHandshake,
    Compass,
    Crown,
    Flame,
    Star
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
    </section>
  );
}
