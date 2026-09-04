import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';

export default function PolaroidGallery() {
  const [photos] = useState(birthdayData.polaroids);
  const [activePhoto, setActivePhoto] = useState(null);

  const openModal = (photo) => {
    setActivePhoto(photo);
  };

  const closeModal = () => {
    setActivePhoto(null);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    const currentIndex = photos.findIndex(p => p.id === activePhoto.id);
    const nextIndex = (currentIndex + 1) % photos.length;
    setActivePhoto(photos[nextIndex]);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    const currentIndex = photos.findIndex(p => p.id === activePhoto.id);
    const prevIndex = (currentIndex - 1 + photos.length) % photos.length;
    setActivePhoto(photos[prevIndex]);
  };

  return (
    <section id="gallery-section" className="section-spacing">
      <div className="container">
        <div className="section-header">
          <span className="tag">Memory Lane</span>
          <h2>A Gallery of Radiance ✨</h2>
          <p>
            Moments, smiles, and glimpses of the woman who makes life feel like poetry.
          </p>
        </div>

        {/* Polaroid Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '36px',
            padding: '10px 0'
          }}
        >
          {photos.map((item) => (
            <div
              key={item.id}
              className="polaroid-card"
              style={{ transform: `rotate(${item.rotation})` }}
              onClick={() => openModal(item)}
            >
              {/* Top Washi Tape */}
              <div className="polaroid-tape" />

              {/* Photo Image Container */}
              <div
                style={{
                  width: '100%',
                  height: '290px',
                  borderRadius: '3px',
                  overflow: 'hidden',
                  background: '#f1f5f9',
                  position: 'relative'
                }}
              >
                <img
                  src={item.image}
                  alt={item.caption}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease'
                  }}
                  loading="lazy"
                />

                {/* Hover overlay hint */}
                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    padding: '6px',
                    borderRadius: '50%',
                    background: 'rgba(0, 0, 0, 0.5)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <ZoomIn size={15} />
                </div>
              </div>

              {/* Handwritten Caption */}
              <div style={{ marginTop: '14px', textAlign: 'center' }}>
                <div
                  className="font-cursive"
                  style={{
                    fontSize: '1.65rem',
                    color: '#1e293b',
                    fontWeight: 700,
                    lineHeight: 1.2
                  }}
                >
                  {item.caption}
                </div>
                <div
                  style={{
                    fontSize: '0.78rem',
                    color: '#64748b',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    marginTop: '4px'
                  }}
                >
                  {item.date}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Lightbox */}
        {activePhoto && (
          <div
            onClick={closeModal}
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
                maxWidth: '650px',
                width: '100%',
                background: 'var(--bg-secondary)',
                borderRadius: 'var(--radius-lg)',
                padding: '20px',
                position: 'relative',
                border: '1px solid var(--border-glow)',
                boxShadow: 'var(--shadow-lg)'
              }}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                style={{
                  position: 'absolute',
                  top: '14px',
                  right: '14px',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: 'none',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 10
                }}
              >
                <X size={20} />
              </button>

              {/* Prev / Next navigation buttons */}
              <button
                onClick={handlePrev}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '-18px',
                  transform: 'translateY(-50%)',
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: 'var(--accent-primary)',
                  border: 'none',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.5)',
                  zIndex: 10
                }}
                title="Previous Photo"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                onClick={handleNext}
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: '-18px',
                  transform: 'translateY(-50%)',
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: 'var(--accent-primary)',
                  border: 'none',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.5)',
                  zIndex: 10
                }}
                title="Next Photo"
              >
                <ChevronRight size={24} />
              </button>

              {/* Modal Image */}
              <div
                style={{
                  width: '100%',
                  height: '380px',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  background: '#000'
                }}
              >
                <img
                  src={activePhoto.image}
                  alt={activePhoto.caption}
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>

              {/* Modal Caption & Note */}
              <div style={{ padding: '18px 8px 8px', textAlign: 'center' }}>
                <h3 className="font-cursive" style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '6px' }}>
                  {activePhoto.caption}
                </h3>
                <p style={{ color: 'var(--accent-primary)', fontSize: '0.85rem', fontWeight: 700, marginBottom: '10px' }}>
                  {activePhoto.date}
                </p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', fontStyle: 'italic', maxWidth: '520px', margin: '0 auto' }}>
                  "{activePhoto.note}"
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
