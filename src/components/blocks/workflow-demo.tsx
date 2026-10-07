"use client";

import { useEffect, useState } from "react";
import { Check, FileText, Play, RotateCcw, ShieldCheck, Workflow } from "lucide-react";
import { Button } from "@/components/ui/button";
import { demoStages } from "@/data/content";

export function WorkflowDemo() {
  const [stage, setStage] = useState(-1);
  const [runId, setRunId] = useState(0);
  useEffect(() => {
    if (stage !== 0 && stage !== 1 && stage !== 3) return;
    const timer = window.setTimeout(() => setStage(value => value + 1), 900);
    return () => window.clearTimeout(timer);
  }, [stage, runId]);
  const waiting = stage === 2;
  const complete = stage === 4;
  const active = stage >= 0 && !complete;

  return <div className="workflow-demo" id="start">
    <div className="demo-top"><span><Workflow size={17} aria-hidden="true" />Customer request agent</span><span className="demo-label">Interactive demo</span></div>
    <div className="demo-body">
      <div className="demo-request"><div className="request-icon"><FileText size={21} aria-hidden="true" /></div><p className="small-label">Incoming request</p><h3>“Can you help me change my plan?”</h3><p>Use the customer support playbook to prepare a response, then ask a person to approve it.</p><div className="request-meta"><span>Support inbox</span><span>Just now</span></div></div>
      <div className="demo-flow"><ol>{demoStages.map((label, index) => <li key={label} className={stage > index ? "step-done" : stage === index ? "step-active" : ""}><span className="step-indicator">{stage > index ? <Check size={14} aria-hidden="true" /> : index + 1}</span><span>{label}</span><span className="step-status">{stage > index ? "Done" : stage === index ? (waiting ? "Your turn" : "Running") : "Waiting"}</span></li>)}</ol>
        <p className="demo-status" role="status" aria-live="polite">{complete ? "Workflow complete. Your approved sample response is ready." : waiting ? "Review ready: “Of course. I can walk you through the plan options.”" : active ? "Your agent is working through the playbook…" : "Run a sample workflow to see each step."}</p>
        <div className="demo-controls">
          {waiting ? <Button onClick={() => setStage(3)}><ShieldCheck size={16} aria-hidden="true" />Approve response</Button> : <Button onClick={() => { setStage(0); setRunId(value => value + 1); }} disabled={active}>{complete ? <RotateCcw size={15} aria-hidden="true" /> : <Play size={15} aria-hidden="true" />}{complete ? "Run again" : active ? "Running workflow" : "Run workflow"}</Button>}
          {active && <Button variant="ghost" onClick={() => setStage(-1)}>Reset</Button>}
        </div>
      </div>
    </div>
    <div className="demo-foot"><ShieldCheck size={14} aria-hidden="true" /><span>Sample data. Runs locally in your browser. No account needed.</span></div>
  </div>;
}
