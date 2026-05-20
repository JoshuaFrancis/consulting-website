"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const SOURCE = "Cho & Sun, 2026";

function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="my-8 border-l-2 border-accent bg-accent/5 px-5 py-4 rounded-r-md">
      <p className="text-lg text-foreground leading-relaxed">{children}</p>
      <cite className="mt-3 block not-italic text-xs uppercase tracking-[0.12em] text-muted-foreground">
        {SOURCE}
      </cite>
    </blockquote>
  );
}

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-5 text-[17px] leading-[1.75] text-muted-foreground [&_strong]:text-foreground [&_strong]:font-semibold">
      {children}
    </div>
  );
}

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-14 mb-4 text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
      {children}
    </h2>
  );
}

/* ============== REPEATED CHECKS ============== */
const CHECK_OPTIONS = [1, 2, 3, 5, 10, 20, 40];

function RepeatedChecksWidget() {
  const [n, setN] = useState(10);
  const pct = Math.round((1 - Math.exp(-0.08 * n)) * 100);
  const tone = pct > 60 ? "danger" : pct > 30 ? "warn" : "safe";
  return (
    <div className="my-8 rounded-xl border border-border bg-card overflow-hidden">
      <div className="px-4 py-3 border-b border-border text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
        The cost of checking again
      </div>
      <div className="p-5">
        <div className="text-xs text-muted-foreground mb-2">
          How many times does the agent check before it stops?
        </div>
        <div className="flex flex-wrap gap-1.5">
          {CHECK_OPTIONS.map((opt) => (
            <button
              key={opt}
              onClick={() => setN(opt)}
              className={cn(
                "px-3.5 py-1.5 rounded-md text-sm border transition-colors",
                n === opt
                  ? "border-foreground bg-foreground text-background font-medium"
                  : "border-border text-muted-foreground hover:text-foreground",
              )}
            >
              {opt}
            </button>
          ))}
        </div>
        <div className="mt-6 flex items-baseline gap-3">
          <span
            className={cn(
              "text-5xl md:text-6xl leading-none",
              tone === "danger" && "text-red-600",
              tone === "warn" && "text-amber-700",
              tone === "safe" && "text-emerald-700",
            )}
          >
            {pct}%
          </span>
          <span className="text-sm text-muted-foreground">
            chance of a misleading pass
          </span>
        </div>
        <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
          <div
            className={cn(
              "h-full rounded-full transition-[width] duration-500 ease-out",
              tone === "danger" && "bg-red-500",
              tone === "warn" && "bg-amber-500",
              tone === "safe" && "bg-emerald-600",
            )}
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="mt-5 text-sm text-muted-foreground leading-relaxed">
          A task this agent can never actually solve still has a{" "}
          <strong className="text-foreground">{pct}%</strong> chance of being
          handed at least one convincing &ldquo;pass&rdquo; to stop on after{" "}
          {n} round{n === 1 ? "" : "s"} of checking. Every extra look is another
          roll of the dice. This is why &ldquo;stop when a check passes&rdquo;
          fails: the rule rewards persistence, not correctness.
        </p>
      </div>
    </div>
  );
}

/* ============== FEASIBILITY ============== */
const REGIMES = [
  {
    tag: "Feasible task",
    name: "The agent can get there",
    tone: "safe" as const,
    info: (
      <>
        <strong className="text-emerald-700">Feasible:</strong> the
        generate-check-revise pipeline is genuinely capable of producing a
        correct answer for this task. It may not have yet. Early wrong answers
        here are fine and expected. The agent should keep going, and given
        enough rounds it will get there. Stopping is the right move once real
        evidence has built up.
      </>
    ),
  },
  {
    tag: "Infeasible task",
    name: "The agent never can",
    tone: "danger" as const,
    info: (
      <>
        <strong className="text-red-600">Infeasible:</strong> the task is beyond
        what this generator and verifier can do. It will never produce a
        reliably correct answer. But it can still rack up high-looking scores by
        overfitting the visible checks. Every release here is an error. The
        whole job of a stopping rule is to hold back on these.
      </>
    ),
  },
];

function FeasibilityWidget() {
  const [active, setActive] = useState(1);
  return (
    <div className="my-8 rounded-xl border border-border bg-card overflow-hidden">
      <div className="px-4 py-3 border-b border-border text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
        Two reasons an answer is still wrong
      </div>
      <div className="p-5">
        <div className="grid grid-cols-2 gap-px bg-border">
          {REGIMES.map((r, i) => {
            const isDanger = r.tone === "danger";
            const isActive = active === i;
            return (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={cn(
                  "p-4 text-left flex flex-col gap-1 transition-colors",
                  isDanger
                    ? "bg-red-50/60 hover:bg-red-100/70"
                    : "bg-emerald-50/40 hover:bg-emerald-100/60",
                  isActive &&
                    (isDanger
                      ? "ring-2 ring-red-500/60 ring-inset"
                      : "ring-2 ring-emerald-600/60 ring-inset"),
                )}
              >
                <span
                  className={cn(
                    "text-[10px] uppercase tracking-[0.08em]",
                    isDanger ? "text-red-600" : "text-emerald-700",
                  )}
                >
                  {r.tag}
                </span>
                <span
                  className={cn(
                    "text-base font-semibold leading-tight",
                    isDanger ? "text-red-700" : "text-emerald-800",
                  )}
                >
                  {r.name}
                </span>
              </button>
            );
          })}
        </div>
        <div className="mt-4 p-4 border-t border-border text-sm text-muted-foreground leading-relaxed min-h-[6rem]">
          {REGIMES[active].info}
        </div>
        <p className="mt-1 px-4 text-xs text-muted-foreground/70 leading-relaxed">
          The catch: from the score alone, the agent cannot tell which world it
          is in. A wrong answer on a feasible task and a wrong answer on an
          infeasible task can look identical.
        </p>
      </div>
    </div>
  );
}

/* ============== WRAPPER STAGES ============== */
const STAGES = [
  {
    label: "Stage 1",
    sub: "Pool",
    body: (
      <>
        <strong>A pool of convincing failures.</strong> Offline, before
        anything ships, the team collects answers that were wrong but still
        scored well. These hard negatives become the benchmark for a high score
        that means nothing. You cannot judge a score without knowing how
        impressive a known liar can look.
      </>
    ),
  },
  {
    label: "Stage 2",
    sub: "Calibrate",
    body: (
      <>
        <strong className="text-accent">Grade the score on a curve.</strong>{" "}
        During deployment, the wrapper never asks &ldquo;is this score
        high?&rdquo; It asks &ldquo;is this score more extreme than the
        convincing failures we already know about?&rdquo; That turns a raw,
        task-dependent number into a calibrated p-value: small only when the
        score genuinely beats the liars.
      </>
    ),
  },
  {
    label: "Stage 3",
    sub: "Accumulate",
    body: (
      <>
        <strong className="text-emerald-700">Let the evidence compound.</strong>{" "}
        Each calibrated result feeds an evidence counter built to stay honest no
        matter how many times you peek at it. The agent releases only when
        accumulated evidence crosses a set bar. One lucky check is never enough.
        Many independent, moderate checks can be.
      </>
    ),
  },
];

function WrapperStagesWidget() {
  const [active, setActive] = useState(0);
  return (
    <div className="my-8 rounded-xl border border-border bg-card overflow-hidden">
      <div className="flex border-b border-border">
        {STAGES.map((s, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={cn(
              "flex-1 px-3 py-3 text-center border-b-2 transition-colors",
              active === i
                ? "text-foreground border-foreground font-medium"
                : "text-muted-foreground border-transparent hover:text-foreground",
            )}
          >
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground/80">
              {s.label}
            </div>
            <div className="text-xs mt-0.5">{s.sub}</div>
          </button>
        ))}
      </div>
      <div className="p-5 text-sm text-muted-foreground leading-relaxed min-h-[7rem]">
        {STAGES[active].body}
      </div>
    </div>
  );
}

/* ============== STATS ============== */
const STATS = [
  {
    num: "0%",
    label: "Hopeless tasks the calibrated wrapper wrongly ships (α = 0.10)",
    tone: "safe",
  },
  {
    num: "77%",
    label: "Hopeless tasks the confidence heuristic wrongly ships",
    tone: "danger",
  },
  {
    num: "23%",
    label: "Hopeless tasks the score-stability heuristic wrongly ships",
    tone: "danger",
  },
  {
    num: "77%",
    label: "Solvable tasks the wrapper still ships, on a correct answer",
    tone: "accent",
  },
] as const;

function StatGrid() {
  return (
    <div className="my-8 grid grid-cols-2 md:grid-cols-4 gap-px bg-border border border-border rounded-xl overflow-hidden">
      {STATS.map((s) => (
        <div key={s.label} className="bg-card p-5 text-center">
          <div
            className={cn(
              "text-3xl md:text-4xl leading-none",
              s.tone === "danger" && "text-red-600",
              s.tone === "accent" && "text-accent",
              s.tone === "safe" && "text-emerald-700",
            )}
          >
            {s.num}
          </div>
          <div className="mt-2 text-[11px] text-muted-foreground leading-snug">
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ============== TRAJECTORIES ============== */
type Step = { score: number; correct: boolean; p: number; e: number };

const TRAJECTORIES: {
  label: string;
  kind: "abstain" | "release";
  steps: Step[];
  release: number | null;
  caption: string;
}[] = [
  {
    label: "Verifier deception",
    kind: "abstain",
    release: null,
    steps: [
      { score: 0.967, correct: false, p: 0.216, e: 1.19 },
      { score: 0.967, correct: false, p: 0.216, e: 1.4 },
      { score: 0.967, correct: false, p: 0.216, e: 1.66 },
      { score: 0.967, correct: false, p: 0.216, e: 1.97 },
      { score: 0.967, correct: false, p: 0.216, e: 2.34 },
      { score: 0.967, correct: false, p: 0.216, e: 2.77 },
      { score: 0.967, correct: false, p: 0.216, e: 3.28 },
      { score: 0.967, correct: false, p: 0.216, e: 3.89 },
      { score: 0.967, correct: false, p: 0.216, e: 4.61 },
      { score: 0.967, correct: false, p: 0.216, e: 5.47 },
    ],
    caption:
      "Every answer scores 0.967 on the visible checks. Every answer is actually wrong. Confidence-based and stability-based rules both release early, in error. The wrapper sees a score that is not extreme against known liars, so evidence creeps up but never reaches the bar. It abstains. Correctly.",
  },
  {
    label: "A real solution",
    kind: "release",
    release: 6,
    steps: [
      { score: 0.867, correct: false, p: 0.298, e: 0.95 },
      { score: 1.0, correct: true, p: 0.146, e: 1.48 },
      { score: 1.0, correct: true, p: 0.146, e: 2.3 },
      { score: 1.0, correct: true, p: 0.146, e: 3.59 },
      { score: 1.0, correct: true, p: 0.146, e: 5.6 },
      { score: 1.0, correct: true, p: 0.146, e: 8.72 },
      { score: 1.0, correct: true, p: 0.146, e: 13.62 },
      { score: 1.0, correct: true, p: 0.146, e: 21.24 },
      { score: 1.0, correct: true, p: 0.146, e: 33.12 },
      { score: 1.0, correct: true, p: 0.146, e: 51.64 },
    ],
    caption:
      "From step two on, the agent is producing genuinely correct answers. No single check is decisive: even a perfect score only calibrates to a moderate value. But the evidence compounds, crosses the bar at step seven, and the wrapper releases a correct answer. A one-shot calibrated rule never fires here at all.",
  },
];

const THRESHOLD = 10;
const MAX_VIEW = 20;

function TrajectoryWidget() {
  const [task, setTask] = useState(0);
  const [step, setStep] = useState(0);
  const tr = TRAJECTORIES[task];
  const s = tr.steps[step];

  return (
    <div className="my-8 rounded-xl border border-border bg-card overflow-hidden">
      <div className="flex border-b border-border">
        {TRAJECTORIES.map((t, i) => (
          <button
            key={i}
            onClick={() => {
              setTask(i);
              setStep(0);
            }}
            className={cn(
              "flex-1 px-4 py-3 text-sm border-b-2 transition-colors",
              task === i
                ? "text-foreground border-foreground font-medium"
                : "text-muted-foreground border-transparent hover:text-foreground",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between text-[11px] text-muted-foreground mb-3">
          <span>Evidence accumulated (tap a step)</span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-0 border-t border-dashed border-foreground/50" />
            Release bar
          </span>
        </div>
        <div className="relative h-40">
          <div
            className="absolute left-0 right-0 border-t border-dashed border-foreground/45 z-10"
            style={{ bottom: `${(THRESHOLD / MAX_VIEW) * 100}%` }}
          />
          <div className="flex items-end gap-1.5 h-full">
            {tr.steps.map((st, i) => {
              const h = Math.min(st.e / MAX_VIEW, 1) * 100;
              const crossed = st.e >= THRESHOLD;
              const isActive = step === i;
              return (
                <button
                  key={i}
                  onClick={() => setStep(i)}
                  className="flex-1 h-full flex items-end"
                  aria-label={`Step ${i + 1}`}
                >
                  <span
                    className={cn(
                      "w-full rounded-t transition-all duration-500 ease-out",
                      crossed
                        ? "bg-emerald-500/80"
                        : "bg-amber-400/70",
                      isActive && "ring-2 ring-foreground/50 ring-inset",
                    )}
                    style={{ height: `${Math.max(h, 3)}%` }}
                  />
                </button>
              );
            })}
          </div>
        </div>
        <div className="flex gap-1.5 mt-1.5">
          {tr.steps.map((_, i) => (
            <div
              key={i}
              className={cn(
                "flex-1 text-center text-[10px]",
                step === i
                  ? "text-foreground font-medium"
                  : "text-muted-foreground/60",
              )}
            >
              {i + 1}
            </div>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-3 gap-px bg-border border border-border rounded-lg overflow-hidden">
          <div className="bg-card p-3 text-center">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground/70">
              Visible score
            </div>
            <div className="mt-1 text-lg font-semibold text-foreground">
              {s.score.toFixed(3)}
            </div>
          </div>
          <div className="bg-card p-3 text-center">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground/70">
              Actually correct
            </div>
            <div
              className={cn(
                "mt-1 text-lg font-semibold",
                s.correct ? "text-emerald-700" : "text-red-600",
              )}
            >
              {s.correct ? "Yes" : "No"}
            </div>
          </div>
          <div className="bg-card p-3 text-center">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground/70">
              Evidence
            </div>
            <div
              className={cn(
                "mt-1 text-lg font-semibold",
                s.e >= THRESHOLD ? "text-emerald-700" : "text-foreground",
              )}
            >
              {s.e.toFixed(2)}
            </div>
          </div>
        </div>

        <div
          className={cn(
            "mt-4 px-3 py-2 text-xs border-l-2 rounded-r-md",
            tr.release === null
              ? "border-amber-500 bg-amber-50/60 text-amber-800"
              : "border-emerald-600 bg-emerald-50/60 text-emerald-800",
          )}
        >
          {tr.release === null
            ? "The wrapper never releases on this task. Evidence tops out below the bar."
            : `The wrapper releases at step ${tr.release + 1}, the first time evidence crosses the bar, on a correct answer.`}
        </div>
        <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
          {tr.caption}
        </p>
      </div>
    </div>
  );
}

/* ============== METHODS ============== */
const METHODS = [
  {
    tag: "Heuristic",
    tone: "danger",
    title: "Stop when it sounds confident",
    body: "Release once the model's confidence crosses a threshold. In the study it shipped 77% of hopeless tasks. Confidence is not correctness, and a stuck-wrong answer can be stated with total conviction.",
  },
  {
    tag: "Heuristic",
    tone: "danger",
    title: "Stop when the score settles",
    body: "Release once the score stops moving and sits high. Shipped 23% of hopeless tasks. A score that is stuck high is very often just a wrong answer the verifier keeps rubber-stamping.",
  },
  {
    tag: "Half measure",
    tone: "warn",
    title: "Stop on one calibrated check",
    body: "Use the calibrated score, but decide from a single step. Tuned loose it fires constantly, including on bad tasks. Tuned strict it can never fire at all. One check has no resolution.",
  },
  {
    tag: "The fix",
    tone: "safe",
    title: "Stop when evidence adds up",
    body: "Calibrate every check against known failures, then accumulate. Zero releases on hopeless tasks, while still shipping 77% of solvable ones. Survives unlimited re-checking by design.",
  },
] as const;

function MethodGrid() {
  return (
    <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border rounded-xl overflow-hidden">
      {METHODS.map((m) => (
        <div key={m.title} className="bg-card p-5">
          <span
            className={cn(
              "text-[11px] uppercase tracking-[0.08em] font-medium",
              m.tone === "danger" && "text-red-600",
              m.tone === "warn" && "text-amber-700",
              m.tone === "safe" && "text-emerald-700",
            )}
          >
            {m.tag}
          </span>
          <h4 className="mt-2 text-base font-semibold text-foreground">
            {m.title}
          </h4>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            {m.body}
          </p>
        </div>
      ))}
    </div>
  );
}

/* ============== POST ============== */
export function WorkflowReleasePost() {
  return (
    <div>
      <SectionHeader>The setup</SectionHeader>
      <Prose>
        <p>
          AI is moving from one-shot answers to <strong>workflows</strong>. An
          agent does not just respond once. It produces a draft, runs a check
          on it, reads the feedback, revises, and checks again. Coding agents,
          research agents, and tool-using agents all share this shape.
        </p>
        <p>
          Every loop creates a decision that rarely gets discussed:{" "}
          <strong>when does the agent stop and ship the current answer?</strong>{" "}
          Each extra round costs time, tokens, and money. Stop too early and you
          ship something wrong. Stop too late and you burn budget on a task that
          was never going to work.
        </p>
        <p>
          Two researchers at Purdue took this stopping decision seriously and
          treated it as a statistics problem. Their finding is uncomfortable for
          a lot of agent designs shipping today.
        </p>
      </Prose>
      <PullQuote>
        &ldquo;The deployment problem is a stopping problem: the system must
        decide when the evidence accumulated along an adaptive trajectory is
        strong enough to justify releasing the current output.&rdquo;
      </PullQuote>

      <SectionHeader>Why &ldquo;stop when it passes&rdquo; is broken</SectionHeader>
      <Prose>
        <p>
          The obvious stopping rule is the one most teams use: keep looping,
          and release as soon as a check comes back clean. It feels safe. It is
          not.
        </p>
        <p>
          The check is imperfect. It is a unit test on a sample of cases, a
          model grading another model, an execution trace. Sometimes a wrong
          answer passes anyway. Now run that imperfect check over and over. A
          wrong answer gets <strong>repeated chances</strong> to score well by
          luck. Wait long enough and one of them will.
        </p>
        <p>
          Statisticians have a name for this. If you keep re-running a test and
          stop the moment you like the result, you will eventually get a result
          you like, even from pure noise.
        </p>
      </Prose>
      <PullQuote>
        &ldquo;This is the workflow analogue of p-hacking. A rule that simply
        waits for a high score can be misled by repeated monitoring.&rdquo;
      </PullQuote>
      <Prose>
        <p>
          The paper proves this formally: a rule that releases on the first
          clean check is, given enough rounds, almost guaranteed to release on a
          task it should have refused. Move the slider and watch the risk climb.
        </p>
      </Prose>
      <RepeatedChecksWidget />

      <SectionHeader>Two reasons an answer is still wrong</SectionHeader>
      <Prose>
        <p>
          To fix the stopping rule, the paper draws a line that most agent
          systems never make explicit. When a candidate answer is wrong, it is
          wrong for one of two very different reasons.
        </p>
      </Prose>
      <FeasibilityWidget />
      <Prose>
        <p>
          A good stopping rule should be patient on feasible tasks and refuse on
          infeasible ones. The problem is that the raw score does not separate
          them. On a hopeless task, an answer can overfit the visible checks and
          look just as good as a real solution.
        </p>
      </Prose>

      <SectionHeader>
        The fix: stop trusting the score, start counting evidence
      </SectionHeader>
      <Prose>
        <p>
          The paper&rsquo;s answer is a <strong>wrapper</strong>. It does not
          retrain the agent or the checker. It does not need to understand how
          they work. It sits on top of an existing pipeline as a decision layer
          and changes one thing: what counts as enough evidence to stop.
        </p>
      </Prose>
      <WrapperStagesWidget />
      <Prose>
        <p>
          The reference pool in stage one is the clever part. A raw score of
          0.9 means nothing on its own. Is 0.9 impressive, or do wrong answers
          hit 0.9 all the time on this kind of task? You cannot know without a
          benchmark of <strong>convincing failures</strong>: answers that were
          confirmed wrong but still scored high.
        </p>
        <p>
          Calibrate against that pool and a score finally becomes meaningful. A
          0.9 that still beats every known liar is real evidence. A 0.9 that
          known liars also reach is worth almost nothing. Same number, opposite
          conclusion.
        </p>
      </Prose>
      <PullQuote>
        &ldquo;The right question is not whether a candidate has a large raw
        score at a single step, but whether the evidence accumulated along the
        trajectory is strong enough to support release.&rdquo;
      </PullQuote>

      <SectionHeader>Does it actually work?</SectionHeader>
      <Prose>
        <p>
          The researchers tested this on a coding benchmark. An agent gets ten
          attempts per task. It sees a small set of visible tests as its
          checker. Real correctness is judged later by a larger hidden test
          suite it never sees. The numbers below compare the calibrated wrapper
          against the heuristics teams normally reach for.
        </p>
      </Prose>
      <StatGrid />
      <Prose>
        <p>
          Zero is the number that matters. On tasks the agent could never solve,
          the wrapper released <strong>nothing</strong>. The confidence
          heuristic shipped more than three quarters of them. And the wrapper
          did not buy that safety by refusing everything: it still shipped 77%
          of the genuinely solvable tasks, every one of them on a correct
          answer.
        </p>
      </Prose>

      <SectionHeader>Watch it decide</SectionHeader>
      <Prose>
        <p>
          Averages hide the mechanism. Here are two real task runs from the
          study, step by step. One is a trap. One is a genuine solution that
          arrives slowly. Tap through the steps and watch the evidence move.
        </p>
      </Prose>
      <TrajectoryWidget />
      <Prose>
        <p>
          The contrast is the whole idea. A persistently high score is not
          enough to stop, because liars score high too. A correct answer that
          shows up again and again <em>is</em> enough, because that pattern is
          hard to fake. The wrapper waits for the second thing.
        </p>
      </Prose>

      <SectionHeader>The shortcuts people actually ship</SectionHeader>
      <Prose>
        <p>
          Most agent systems in production today use one of the first three
          rules below. The study put each one head to head with the wrapper.
        </p>
      </Prose>
      <MethodGrid />

      <SectionHeader>What this means for your business</SectionHeader>
      <Prose>
        <p>
          The benchmark is about code, but the structure is everywhere. Any
          agent that loops generate, check, and revise faces this exact
          decision, whether it is drafting contracts, resolving tickets,
          researching, or writing software. If the stopping rule is
          &ldquo;ship when a check passes,&rdquo; the risk described here is
          already in your product.
        </p>
        <p>If you are building or buying agentic systems, three concrete moves:</p>
        <ul className="list-disc pl-6 space-y-2 marker:text-accent">
          <li>
            <strong>Treat a passing check as one data point, not a verdict.</strong>{" "}
            The more times an agent is allowed to re-check, the less a single
            pass should count. Repetition should raise the bar, not lower it.
          </li>
          <li>
            <strong>Calibrate against your own failures.</strong> Keep the
            answers that looked good but turned out wrong. They are the only
            honest benchmark for what a meaningless high score looks like on
            your tasks.
          </li>
          <li>
            <strong>Give your agent permission to abstain.</strong> Some tasks
            are beyond the current system. A stopping rule that can say
            &ldquo;not good enough, do not ship&rdquo; is worth more than one
            that always produces an answer.
          </li>
        </ul>
        <p>
          The shift is small but it changes the question. Not{" "}
          <em>did a check pass</em>, but <em>has enough real evidence built up</em>.
          One is easy to fake. The other is what actually makes an agent safe to
          ship.
        </p>
      </Prose>
    </div>
  );
}
