import React from 'react';
import { Palette, Sparkles, Heart, Moon } from 'lucide-react';

export default function ThemeSwitcher({ currentTheme, onThemeChange }) {
  const themes = [
    { id: 'rose', name: 'Rose Bloom', icon: Heart, color: '#f43f5e' },
    { id: 'celestial', name: 'Starlit Cosmos', icon: Moon, color: '#38bdf8' },
    { id: 'pastel', name: 'Dreamy Blush', icon: Sparkles, color: '#ec4899' }
  ];

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '6px 10px',
        borderRadius: 'var(--radius-full)',
        background: 'var(--bg-glass)',
        backdropFilter: 'blur(16px)',
        border: '1px solid var(--border-glass)',
        boxShadow: 'var(--shadow-sm)'
      }}
    >
      <Palette size={16} style={{ color: 'var(--accent-primary)', marginLeft: '4px' }} />
      <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginRight: '4px' }}>
        Theme:
      </span>
      {themes.map(t => {
        const Icon = t.icon;
        const isActive = currentTheme === t.id;
        return (
          <button
            key={t.id}
            onClick={() => onThemeChange(t.id)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: 'var(--radius-full)',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.82rem',
              fontWeight: 700,
              background: isActive ? t.color : 'transparent',
              color: isActive ? '#ffffff' : 'var(--text-secondary)',
              transition: 'all 0.25s ease',
              boxShadow: isActive ? `0 2px 12px ${t.color}66` : 'none'
            }}
            title={t.name}
          >
            <Icon size={13} />
            <span>{t.name}</span>
          </button>
        );
      })}
    </div>
  );
}
