import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Music, Disc, Upload } from 'lucide-react';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [customAudioName, setCustomAudioName] = useState(null);

  const audioContextRef = useRef(null);
  const isLoopingRef = useRef(false);
  const fileInputRef = useRef(null);
  const audioElementRef = useRef(null);

  // Notes for "Happy Birthday" in scientific pitch notation (frequency in Hz)
  const notes = [
    { note: 'C4', freq: 261.63, dur: 0.35 },
    { note: 'C4', freq: 261.63, dur: 0.15 },
    { note: 'D4', freq: 293.66, dur: 0.5 },
    { note: 'C4', freq: 261.63, dur: 0.5 },
    { note: 'F4', freq: 349.23, dur: 0.5 },
    { note: 'E4', freq: 329.63, dur: 0.9 },

    { note: 'C4', freq: 261.63, dur: 0.35 },
    { note: 'C4', freq: 261.63, dur: 0.15 },
    { note: 'D4', freq: 293.66, dur: 0.5 },
    { note: 'C4', freq: 261.63, dur: 0.5 },
    { note: 'G4', freq: 392.00, dur: 0.5 },
    { note: 'F4', freq: 349.23, dur: 0.9 },

    { note: 'C4', freq: 261.63, dur: 0.35 },
    { note: 'C4', freq: 261.63, dur: 0.15 },
    { note: 'C5', freq: 523.25, dur: 0.5 },
    { note: 'A4', freq: 440.00, dur: 0.5 },
    { note: 'F4', freq: 349.23, dur: 0.5 },
    { note: 'E4', freq: 329.63, dur: 0.5 },
    { note: 'D4', freq: 293.66, dur: 0.7 },

    { note: 'Bb4', freq: 466.16, dur: 0.35 },
    { note: 'Bb4', freq: 466.16, dur: 0.15 },
    { note: 'A4', freq: 440.00, dur: 0.5 },
    { note: 'F4', freq: 349.23, dur: 0.5 },
    { note: 'G4', freq: 392.00, dur: 0.5 },
    { note: 'F4', freq: 349.23, dur: 1.1 }
  ];

  const playTone = (ctx, freq, startTime, duration, masterGain) => {
    // Warm chime harmonic sound (dual oscillator)
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const noteGain = ctx.createGain();

    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(freq, startTime);

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2, startTime); // soft octave harmonic

    // Attack - Decay - Sustain - Release envelope
    noteGain.gain.setValueAtTime(0.001, startTime);
    noteGain.gain.exponentialRampToValueAtTime(0.3, startTime + 0.05);
    noteGain.gain.exponentialRampToValueAtTime(0.18, startTime + duration * 0.7);
    noteGain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    osc1.connect(noteGain);
    osc2.connect(noteGain);
    noteGain.connect(masterGain);

    osc1.start(startTime);
    osc2.start(startTime);
    osc1.stop(startTime + duration + 0.1);
    osc2.stop(startTime + duration + 0.1);
  };

  const playMelodyLoop = () => {
    if (!isLoopingRef.current) return;

    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    const ctx = audioContextRef.current;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(isMuted ? 0 : volume, ctx.currentTime);
    masterGain.connect(ctx.destination);

    let currTime = ctx.currentTime + 0.1;
    for (let i = 0; i < notes.length; i++) {
      playTone(ctx, notes[i].freq, currTime, notes[i].dur, masterGain);
      currTime += notes[i].dur + 0.08;
    }

    // Schedule next loop
    const totalDuration = (currTime - ctx.currentTime) * 1000 + 1200;
    setTimeout(() => {
      if (isLoopingRef.current && !audioElementRef.current?.src) {
        playMelodyLoop();
      }
    }, totalDuration);
  };

  const togglePlay = () => {
    if (audioElementRef.current && customAudioName) {
      if (isPlaying) {
        audioElementRef.current.pause();
        setIsPlaying(false);
      } else {
        audioElementRef.current.play();
        setIsPlaying(true);
      }
      return;
    }

    if (isPlaying) {
      isLoopingRef.current = false;
      if (audioContextRef.current) {
        audioContextRef.current.suspend();
      }
      setIsPlaying(false);
    } else {
      isLoopingRef.current = true;
      setIsPlaying(true);
      playMelodyLoop();
    }
  };

  const handleCustomAudioUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Stop synth loop if playing
    isLoopingRef.current = false;
    if (audioContextRef.current) {
      audioContextRef.current.suspend();
    }

    const fileUrl = URL.createObjectURL(file);
    if (!audioElementRef.current) {
      audioElementRef.current = new Audio();
    }
    audioElementRef.current.src = fileUrl;
    audioElementRef.current.loop = true;
    audioElementRef.current.volume = isMuted ? 0 : volume;
    audioElementRef.current.play().then(() => {
      setIsPlaying(true);
      setCustomAudioName(file.name.replace(/\.[^/.]+$/, ""));
    });
  };

  useEffect(() => {
    if (audioElementRef.current) {
      audioElementRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '8px 16px',
        borderRadius: 'var(--radius-full)',
        background: 'var(--bg-glass)',
        backdropFilter: 'blur(16px)',
        border: '1px solid var(--border-glass)',
        boxShadow: 'var(--shadow-sm)'
      }}
    >
      {/* Vinyl record disc icon */}
      <div
        style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, #fbbf24 15%, #180814 16%, #2a0b22 60%, #f43f5e 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: isPlaying ? '0 0 14px var(--accent-primary)' : 'none',
          animation: isPlaying ? 'spin 3s linear infinite' : 'none',
          flexShrink: 0
        }}
      >
        <Disc size={18} color="#ffffff" />
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      {/* Info text */}
      <div style={{ display: 'flex', flexDirection: 'column', minWidth: '130px' }}>
        <span style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.2 }}>
          {customAudioName ? customAudioName : 'Birthday Chime Melody'}
        </span>
        <span style={{ fontSize: '0.72rem', color: 'var(--accent-primary)', fontWeight: 600 }}>
          {isPlaying ? 'Playing ♪' : 'Tap to Play 🎵'}
        </span>
      </div>

      {/* Play/Pause Button */}
      <button
        onClick={togglePlay}
        style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          background: 'var(--gradient-brand)',
          border: 'none',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(244, 63, 94, 0.4)',
          transition: 'transform 0.2s ease',
          flexShrink: 0
        }}
        title={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? <Pause size={17} /> : <Play size={17} style={{ marginLeft: '2px' }} />}
      </button>

      {/* Mute toggle */}
      <button
        onClick={() => setIsMuted(!isMuted)}
        style={{
          background: 'transparent',
          border: 'none',
          color: isMuted ? 'var(--text-muted)' : 'var(--text-secondary)',
          cursor: 'pointer',
          padding: '4px',
          display: 'flex',
          alignItems: 'center'
        }}
        title={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </button>

      {/* Upload custom song button */}
      <button
        onClick={() => fileInputRef.current?.click()}
        style={{
          background: 'rgba(255, 255, 255, 0.08)',
          border: '1px solid var(--border-glass)',
          borderRadius: 'var(--radius-full)',
          padding: '4px 8px',
          color: 'var(--text-muted)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          fontSize: '0.72rem',
          fontWeight: 600
        }}
        title="Upload your own song MP3"
      >
        <Upload size={12} />
        <span>Song</span>
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept="audio/*"
        onChange={handleCustomAudioUpload}
        style={{ display: 'none' }}
      />
    </div>
  );
}
