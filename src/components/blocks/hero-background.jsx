"use client";
import dynamic from 'next/dynamic';
import { Component, useCallback, useEffect, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { LogoMark } from '@/components/layout/logo';

const PatternWaves = dynamic(() => import('@/components/react-bits/PatternWaves/PatternWaves'), { ssr: false });

class WaveBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onUnavailable(); }
  render() { return this.state.failed ? null : this.props.children; }
}

export function HeroBackground() {
  const [paused, setPaused] = useState(false);
  const [status, setStatus] = useState('loading');
  const ready = useCallback(() => setStatus('ready'), []);
  const unavailable = useCallback(() => setStatus('unavailable'), []);
  useEffect(() => {
    if (status !== 'loading') return;
    const timeout = setTimeout(() => setStatus('unavailable'), 8000);
    return () => clearTimeout(timeout);
  }, [status]);
  return <>
    <noscript><style>{'.scene-loader { display: none; }'}</style></noscript>
    <div className="hero-background" aria-hidden="true" data-status={status}>
      <div className="wave-ambient" />
      <WaveBoundary onUnavailable={unavailable}><PatternWaves preset="silk" color="#eeeeee" backgroundColor="#000000" spacing={5} markSize={.85} speed={.22} scale={1.45} depth={1} light={12} shine={.85} contrast={1.5} fade="edges" fadeSize={.65} interactive={!paused} cursorSize={65} cursorStrength={.4} paused={paused} onReady={ready} onUnavailable={unavailable} /></WaveBoundary>
    </div>
    {status === 'loading' && <div className="scene-loader" role="status"><span className="scene-loader-mark"><LogoMark /></span><span>Setting the scene<span className="loading-dots" aria-hidden="true">…</span></span></div>}
    {status === 'ready' && <button className="motion-toggle" type="button" onClick={() => setPaused(value => !value)} aria-label={paused ? "Play background animation" : "Pause background animation"} aria-pressed={paused}>{paused ? <Play size={12} aria-hidden="true" /> : <Pause size={12} aria-hidden="true" />}<span>{paused ? "Play motion" : "Pause motion"}</span></button>}
  </>;
}
