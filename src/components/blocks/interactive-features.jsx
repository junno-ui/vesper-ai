"use client";

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Check, FileText, Pause, Play, RotateCcw, ShieldCheck, Sparkles } from 'lucide-react';
import PromptBar from '@/components/react-bits/PromptBar/PromptBar';
import ThoughtLine from '@/components/react-bits/ThoughtLine/ThoughtLine';
import VoicePill from '@/components/react-bits/VoicePill/VoicePill';
import SlingButton from '@/components/react-bits/SlingButton/SlingButton';
import ScrollFloat from '@/components/animations/scroll-float/ScrollFloat';

const models = [{ key: 'vesper', name: 'Vesper agent', tag: 'Demo' }];
const trace = ['Read the request', 'Check your team playbook', 'Prepare a response for review'];
const sample = 'Summarize today’s support requests and flag anything urgent.';
const LOOP_MS = 14000;

export function InteractiveFeatures() {
  const root = useRef(null);
  const [enabled, setEnabled] = useState(true);
  const [visible, setVisible] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [replay, setReplay] = useState(0);

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => { setReduced(query.matches); setHidden(document.hidden); };
    const initial = requestAnimationFrame(update);
    query.addEventListener('change', update);
    document.addEventListener('visibilitychange', update);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.05 });
    observer.observe(element);
    return () => { cancelAnimationFrame(initial); query.removeEventListener('change', update); document.removeEventListener('visibilitychange', update); observer.disconnect(); };
  }, []);

  const playing = enabled && visible && !hidden && !reduced;
  useEffect(() => {
    if (!playing) return;
    let last = performance.now();
    const timer = setInterval(() => {
      const now = performance.now();
      const delta = Math.min(now - last, 200);
      last = now;
      setElapsed(value => (value + delta) % LOOP_MS);
    }, 65);
    return () => clearInterval(timer);
  }, [playing, replay]);

  // One shared timeline keeps the four previews in sync and resumes after a pause.
  const time = reduced ? 10500 : elapsed;
  const draft = time < 900 ? '' : time < 3500 ? sample.slice(0, Math.floor((time - 900) / 38)) : '';
  const busy = time >= 3500 && time < 7300;
  const prepared = time >= 7300;
  const approved = time >= 10200;
  const voiceActive = time >= 700 && time < 3200;
  const step = time < 4600 ? 0 : time < 5900 ? 1 : 2;
  const stage = approved ? 'approved' : prepared ? 'review' : busy ? 'working' : 'typing';
  const restart = () => { setElapsed(0); setReplay(value => value + 1); setEnabled(true); };

  return <section ref={root} className="features-section container" id="benefits" aria-label="Vesper features" data-demo-stage={stage} data-playing={playing}>
    <div className="features-heading"><div><p className="section-kicker">Less busywork. More breathing room.</p><ScrollFloat containerClassName="display-heading" ease="power3.out" scrollStart="top bottom-=10%" scrollEnd="center center">An extra pair of hands. Your standards.</ScrollFloat></div><p>From the first instruction to the final approval, work stays clear, connected, and yours.</p></div>
    <div className="showcase-toolbar"><span><i className={playing ? 'preview-indicator is-playing' : 'preview-indicator'} />{reduced ? 'Workflow preview' : 'Watch a workflow come together'}</span><div>{!reduced && <><button type="button" onClick={() => setEnabled(value => !value)} aria-label={enabled ? 'Pause feature preview' : 'Play feature preview'}>{enabled ? <Pause size={12} aria-hidden="true" /> : <Play size={12} aria-hidden="true" />}{enabled ? 'Pause' : 'Play'}</button><button type="button" onClick={restart} aria-label="Replay feature preview"><RotateCcw size={12} aria-hidden="true" />Replay</button></>}<Link href="/experience#start">Try it yourself<ArrowUpRight size={13} aria-hidden="true" /></Link></div></div>
    <div className="feature-studio">
      <article className="studio-card composer-card" id="start"><div className="feature-copy"><span className="feature-icon"><Sparkles size={20} aria-hidden="true" /></span><h3>If you can explain it,<br />you can start it.</h3><p>Give your agent a task in your own words.<br />Start with a request. Refine it as you go.</p></div>
        <div className="composer-preview" inert aria-hidden="true"><span className="preview-label">What’s on your list?</span><p className={`sample-prompt ${time >= 3500 ? 'prompt-sent' : ''}`}>{sample}</p><PromptBar value={draft} placeholder={time < 3500 ? 'Give your agent a task…' : 'Your agent is on it.'} sources={[]} commands={[]} models={models} efforts={[]} busy={busy} width={560} background="#191b1e" menuBackground="#24262a" color="#f5f5f5" sparkColor="#d9dde3" /><div className="composer-state"><span className={busy ? 'live-dot' : ''} />{approved ? 'Workflow complete' : prepared ? 'Response ready for review' : busy ? 'Sent to your agent' : 'A little context is all it takes'}</div></div>
      </article>
      <article className="studio-card activity-card"><div className="feature-copy"><span className="feature-icon"><FileText size={20} aria-hidden="true" /></span><h3>Never wonder<br />what’s happening.</h3><p>Every step, in plain sight.<br />Follow the thinking. See the outcome.</p></div>
        <div className="activity-preview" inert aria-hidden="true"><div className="activity-top"><span className={`activity-dot ${busy ? 'is-working' : ''}`} />Agent activity<span>Live preview</span></div><ThoughtLine label="Working on your task" doneLabel={approved ? 'Workflow complete' : prepared ? 'Ready for your review' : 'Ready when you are'} working={busy && playing} steps={time < 3500 ? [] : trace.slice(0, step + 1)} showTimer={false} collapseOnSettle={false} fontSize={14} color="#dce0e5" glyphColor="#c3d0ed" /><p className="activity-result">{approved ? 'Summary prepared. Urgent requests flagged.' : prepared ? 'The draft is ready. Waiting for human approval.' : busy ? 'Turning your instructions into a clear next step.' : 'Your next workflow starts with a few words.'}</p></div>
      </article>
      <article className="studio-card voice-card"><div className="feature-copy"><h3>Think out loud.</h3><p>Some ideas are easier to say.<br />Give them a place to start.</p></div><div className="voice-preview" inert aria-hidden="true"><span className="voice-caption">{voiceActive ? 'Listening to your idea…' : time >= 3200 ? '“Prepare my morning briefing.”' : 'Your next idea starts here.'}</span><VoicePill active={voiceActive && playing} reactive="simulated" mode="toggle" size={40} background="#292c32" iconColor="#e1e5ec" ariaLabel="Voice preview" /></div><p className="preview-note">A voice preview. No microphone access needed.</p></article>
      <article className={`studio-card approval-card ${approved ? 'is-approved' : ''}`}><div className="feature-copy"><span className="feature-icon"><ShieldCheck size={20} aria-hidden="true" /></span><h3>The final say is yours.</h3><p>Set a checkpoint. Review the result.<br />Let your agent handle the follow-through.</p></div><div className="approval-preview" inert aria-hidden="true"><div><span className="approval-tag"><Check size={12} aria-hidden="true" />{approved ? 'Approval received' : 'Human approval'}</span><p>{approved ? 'All set. On to the next thing.' : prepared ? 'Your draft is ready to go.' : 'A checkpoint before anything goes out.'}</p></div><div className={`approval-control ${prepared && !approved ? 'awaiting-approval' : ''}`}><SlingButton size={48} ariaLabel="Sample approval" disabled={!prepared} padColor={approved ? '#bcd4c5' : '#edf0f5'} iconColor="#121316" wellColor="#26292f" particles={0}>{approved ? <Check size={20} /> : undefined}</SlingButton></div></div></article>
    </div>
    <p className="features-footnote">An animated example with sample data. Explore the hands-on demo when you’re ready.</p>
  </section>;
}
