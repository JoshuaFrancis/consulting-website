"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const SOURCE = "Jin et al., 2026";

function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="my-8 border-l-2 border-accent bg-accent/5 px-5 py-4 rounded-r-md">
      <p className="text-lg text-foreground leading-relaxed">
        {children}
      </p>
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

/* ============== QUADRANT ============== */
const QUADRANTS = [
  {
    tag: "High bias · Low error",
    name: "Borderline accepter",
    tone: "neutral" as const,
    info: (
      <>
        <strong className="text-amber-700">Borderline accepter:</strong> Low
        error rate but still biased toward accepting answers. Some modality
        recognition tasks land here. The verifier gets it right more often but
        still over-validates the generator output.
      </>
    ),
  },
  {
    tag: "High bias · High error",
    name: "Verification mirage",
    tone: "danger" as const,
    info: (
      <>
        <strong className="text-red-600">Verification mirage:</strong> The
        verifier makes lots of errors and is systematically biased toward
        accepting wrong answers. This is where the vast majority of medical AI
        self-verification lands. Verifier error above 40%, false acceptance rate
        hitting 95 to 100% on the hardest tasks.
      </>
    ),
  },
  {
    tag: "Low bias · Low error",
    name: "Desired regime",
    tone: "safe" as const,
    info: (
      <>
        <strong className="text-emerald-700">Desired regime:</strong> Low error,
        low bias. What reliable verification looks like. Almost entirely empty
        in the study. Essentially no task-model combination achieved this on
        knowledge-intensive clinical questions.
      </>
    ),
  },
  {
    tag: "Low bias · High error",
    name: "Random / refusing",
    tone: "neutral" as const,
    info: (
      <>
        <strong>Random / refusing:</strong> High error but low directional bias.
        The verifier is wrong often but not systematically agreeing. Uncommon in
        the results. Not safe, just differently broken.
      </>
    ),
  },
];

function QuadrantWidget() {
  const [active, setActive] = useState(1);
  return (
    <div className="my-8 rounded-xl border border-border bg-card overflow-hidden">
      <div className="px-4 py-3 border-b border-border text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
        Verifier behavior map
      </div>
      <div className="p-5">
        <div className="text-[11px] text-muted-foreground text-center mb-2">
          Higher agreement bias →
        </div>
        <div className="grid grid-cols-2 grid-rows-2 gap-px bg-border h-[240px]">
          {QUADRANTS.map((q, i) => {
            const isMirage = q.tone === "danger";
            const isSafe = q.tone === "safe";
            const isActive = active === i;
            return (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={cn(
                  "p-4 text-left flex flex-col justify-between transition-colors",
                  isMirage
                    ? "bg-red-50/60 hover:bg-red-100/70"
                    : isSafe
                      ? "bg-emerald-50/40 hover:bg-emerald-100/60"
                      : "bg-card hover:bg-muted",
                  isActive &&
                    (isMirage
                      ? "ring-2 ring-red-500/60 ring-inset"
                      : isSafe
                        ? "ring-2 ring-emerald-600/60 ring-inset"
                        : "ring-2 ring-foreground/40 ring-inset")
                )}
              >
                <span
                  className={cn(
                    "text-[10px] uppercase tracking-[0.08em]",
                    isMirage
                      ? "text-red-600"
                      : isSafe
                        ? "text-emerald-700"
                        : "text-muted-foreground"
                  )}
                >
                  {q.tag}
                </span>
                <span
                  className={cn(
                    "text-base font-semibold leading-tight",
                    isMirage
                      ? "text-red-700"
                      : isSafe
                        ? "text-emerald-800"
                        : "text-foreground"
                  )}
                >
                  {q.name}
                </span>
              </button>
            );
          })}
        </div>
        <div className="mt-4 p-4 border-t border-border text-sm text-muted-foreground leading-relaxed min-h-[4rem]">
          {QUADRANTS[active].info}
        </div>
      </div>
    </div>
  );
}

/* ============== STATS ============== */
const STATS = [
  {
    num: "40%+",
    label: "Verifier error rate on most clinical tasks",
    tone: "danger",
  },
  {
    num: "95–100%",
    label: "False acceptance on differential diagnosis",
    tone: "danger",
  },
  {
    num: "57×",
    label: "Higher odds of verifier failure when generator fails",
    tone: "accent",
  },
  {
    num: "6",
    label: "Models tested. None escaped on hard clinical tasks.",
    tone: "neutral",
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
              s.tone === "neutral" && "text-amber-700"
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

/* ============== TASKS ============== */
type Verdict = "bad" | "ok" | "fine";
const TASKS: {
  name: string;
  eg: string;
  fpr: number;
  err: number;
  v: Verdict;
  note: string;
  short: string;
}[] = [
  {
    short: "Modality",
    name: "Modality recognition",
    eg: "What imaging modality is this? (CT, MRI, X-ray)",
    fpr: 87,
    err: 33,
    v: "ok",
    note: "Moderate reliability. The task is relatively visual and simple so the verifier retains some image grounding. Still shows agreement bias, but not the worst offender.",
  },
  {
    short: "Anatomy",
    name: "Anatomical identification",
    eg: "What organ or region of the body is shown?",
    fpr: 80,
    err: 38,
    v: "ok",
    note: "Middle of the pack. Perceptual enough that some image grounding is retained, but the verifier still over-agrees on edge cases.",
  },
  {
    short: "Spatial",
    name: "Spatial reasoning",
    eg: "Where exactly is the abnormality located?",
    fpr: 82,
    err: 43,
    v: "ok",
    note: "Gets tricky. Spatial tasks require re-examining the image, exactly what the lazy verifier fails to do. Reliability degrades here.",
  },
  {
    short: "Quantitative",
    name: "Quantitative measurement",
    eg: "How many lesions are visible?",
    fpr: 60,
    err: 47,
    v: "fine",
    note: "Most resistant task. Structured, countable, checkable. The verifier retains the most independence here. Still not fully reliable, but the best case for self-verification in medicine.",
  },
  {
    short: "Disease",
    name: "Disease classification",
    eg: "Is there evidence of pneumonia?",
    fpr: 84,
    err: 65,
    v: "bad",
    note: "Deep in the mirage. Requires clinical knowledge the model often lacks, and so does the verifier. High false acceptance. Do not rely on self-verification for this.",
  },
  {
    short: "Causal",
    name: "Causal reasoning",
    eg: "What is causing the thickening of the ventricular wall?",
    fpr: 89,
    err: 66,
    v: "bad",
    note: "Among the worst. Causal reasoning demands deep medical knowledge and shows the steepest bias slope. The harder the question, the more permissive the verifier becomes.",
  },
  {
    short: "Diff. Dx",
    name: "Differential diagnosis",
    eg: "What distinguishes these two findings?",
    fpr: 95,
    err: 67,
    v: "bad",
    note: "Worst case. False acceptance rate saturates at 95 to 100% on several models. The verifier is essentially just agreeing with whatever the generator said. Self-verification is meaningless here.",
  },
];

const VERDICT_LABEL: Record<Verdict, string> = {
  bad: "Do not rely on self-verification",
  ok: "Use with caution",
  fine: "Most reliable for self-verification",
};

function toneFor(value: number, high: number, mid: number) {
  if (value > high) return "danger";
  if (value > mid) return "warn";
  return "safe";
}

function Bar({ value, tone }: { value: number; tone: string }) {
  return (
    <div className="h-2 bg-muted rounded-full overflow-hidden">
      <div
        className={cn(
          "h-full rounded-full transition-[width] duration-500 ease-out",
          tone === "danger" && "bg-red-500",
          tone === "warn" && "bg-amber-500",
          tone === "safe" && "bg-emerald-600"
        )}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

function TasksWidget() {
  const [active, setActive] = useState(0);
  const t = TASKS[active];
  const errTone = toneFor(t.err, 55, 40);
  const fprTone = toneFor(t.fpr, 80, 65);
  return (
    <div className="my-8 rounded-xl border border-border bg-card overflow-hidden">
      <div className="flex overflow-x-auto border-b border-border scrollbar-hide">
        {TASKS.map((task, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={cn(
              "shrink-0 px-4 py-3 text-xs whitespace-nowrap border-b-2 transition-colors",
              active === i
                ? "text-foreground border-foreground font-medium"
                : "text-muted-foreground border-transparent hover:text-foreground"
            )}
          >
            {task.short}
          </button>
        ))}
      </div>
      <div className="p-5">
        <h4 className="text-lg font-semibold text-foreground">{t.name}</h4>
        <p className="mt-1 text-xs text-muted-foreground">
          Example: &ldquo;{t.eg}&rdquo;
        </p>
        <div className="mt-5 space-y-4">
          <div>
            <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
              <span>Verifier error rate</span>
              <span
                className={cn(
                  errTone === "danger" && "text-red-600",
                  errTone === "warn" && "text-amber-700",
                  errTone === "safe" && "text-emerald-700"
                )}
              >
                {t.err}%
              </span>
            </div>
            <Bar value={t.err} tone={errTone} />
          </div>
          <div>
            <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
              <span>False acceptance rate</span>
              <span
                className={cn(
                  fprTone === "danger" && "text-red-600",
                  fprTone === "warn" && "text-amber-700",
                  fprTone === "safe" && "text-emerald-700"
                )}
              >
                {t.fpr}%
              </span>
            </div>
            <Bar value={t.fpr} tone={fprTone} />
          </div>
        </div>
        <div
          className={cn(
            "mt-5 px-3 py-2 text-xs border-l-2 rounded-r-md",
            t.v === "bad" && "border-red-500 bg-red-50/60 text-red-700",
            t.v === "ok" && "border-amber-500 bg-amber-50/60 text-amber-800",
            t.v === "fine" &&
              "border-emerald-600 bg-emerald-50/60 text-emerald-800"
          )}
        >
          {VERDICT_LABEL[t.v]}
        </div>
        <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
          {t.note}
        </p>
      </div>
    </div>
  );
}

/* ============== LOOP ============== */
const LOOP_STEPS = [
  {
    label: "Turn 0",
    sub: "Start",
    body: (
      <>
        <strong>Turn 0: the wrong answer exists.</strong> The generator produced
        an incorrect response. At this point correction is still possible. The
        verifier has not seen it yet.
      </>
    ),
  },
  {
    label: "Turn 1",
    sub: "First",
    body: (
      <>
        <strong className="text-red-600">Turn 1: first verification.</strong>{" "}
        The verifier reviews the answer. In most cases it agrees: looks correct.
        The explanation it generates reinforces the wrong answer, giving the
        generator reasons to keep it.
      </>
    ),
  },
  {
    label: "Turn 2",
    sub: "Second",
    body: (
      <>
        <strong className="text-red-600">Turn 2: second check.</strong>{" "}
        Agreement bias is accumulating. The verifier has now validated the wrong
        answer once. Its prior makes it more likely to agree again. The
        probability of correction is dropping.
      </>
    ),
  },
  {
    label: "Turn 3",
    sub: "Third",
    body: (
      <>
        <strong className="text-red-600">Turn 3: third check.</strong> The loop
        is compounding. The wrong answer is now backed by multiple rounds of
        false verification as supporting evidence.
      </>
    ),
  },
  {
    label: "Turn 4",
    sub: "Final",
    body: (
      <>
        <strong className="text-red-600">Turn 4: final state.</strong> 69 to 87%
        of initially wrong answers are now locked in. The generator is
        confidently wrong. The verifier is confidently agreeing. The system
        reports high accuracy. The answer is incorrect.
      </>
    ),
  },
];

function LoopWidget() {
  const [active, setActive] = useState(0);
  return (
    <div className="my-8 rounded-xl border border-border bg-card overflow-hidden">
      <div className="flex border-b border-border overflow-x-auto scrollbar-hide">
        {LOOP_STEPS.map((s, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={cn(
              "flex-1 min-w-[80px] px-3 py-3 text-center border-b-2 transition-colors",
              active === i
                ? "text-foreground border-foreground font-medium"
                : "text-muted-foreground border-transparent hover:text-foreground"
            )}
          >
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground/80">
              {s.sub}
            </div>
            <div className="text-xs mt-0.5">{s.label}</div>
          </button>
        ))}
      </div>
      <div className="p-5 text-sm text-muted-foreground leading-relaxed min-h-[5rem]">
        {LOOP_STEPS[active].body}
      </div>
    </div>
  );
}

/* ============== LOCKOUT ============== */
const LOCKOUT = [
  { name: "Modality", locked: 87, correct: 3.2 },
  { name: "Causal", locked: 83, correct: 3.8 },
  { name: "Disease", locked: 83, correct: 3.5 },
  { name: "Anatomy", locked: 84, correct: 3.0 },
  { name: "Spatial", locked: 84, correct: 2.8 },
  { name: "Diff. Dx", locked: 79, correct: 2.5 },
  { name: "Quantitative", locked: 70, correct: 2.2 },
];

function LockoutWidget() {
  return (
    <div className="my-8 rounded-xl border border-border bg-card overflow-hidden p-5">
      <div className="flex flex-wrap gap-5 mb-5 text-xs text-muted-foreground">
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm bg-red-500/60" />
          Locked by false verification
        </span>
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm bg-emerald-600/70" />
          Corrected
        </span>
      </div>
      <div className="space-y-3">
        {LOCKOUT.map((d) => (
          <div key={d.name} className="flex items-center gap-3">
            <div className="text-xs text-muted-foreground w-24 shrink-0">
              {d.name}
            </div>
            <div className="flex-1 relative h-4 bg-muted rounded-sm overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-red-500/55 rounded-sm transition-all duration-700 ease-out"
                style={{ width: `${d.locked}%` }}
              />
              <div
                className="absolute inset-y-0 left-0 bg-emerald-600/70 rounded-sm transition-all duration-700 ease-out"
                style={{ width: `${d.correct}%` }}
              />
            </div>
            <div className="text-xs text-red-600 w-12 text-right shrink-0">
              {d.locked}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============== FIX CARDS ============== */
const FIXES = [
  {
    tag: "Partial fix",
    tone: "warn",
    title: "Cross-verification",
    body: "Use a different model family to check the work. Reduces agreement bias by 12 to 20% on most tasks. Biggest gains on the hardest clinical tasks. Does not fully solve the problem but meaningfully reduces it.",
  },
  {
    tag: "Task routing",
    tone: "accent",
    title: "Know when to trust it",
    body: "Perceptual tasks like modality recognition and basic anatomy are more reliable. Knowledge-intensive tasks like differential diagnosis and causal reasoning should never rely on self-verification alone.",
  },
  {
    tag: "Structural fix",
    tone: "safe",
    title: "External grounding",
    body: "For clinical tasks, verification needs external knowledge: guidelines, knowledge graphs, retrieval-augmented systems. The model cannot be judge and jury on its own output.",
  },
  {
    tag: "Never do this",
    tone: "danger",
    title: "Multi-turn self-loops",
    body: "Running the same model in a verification-revision loop makes things worse. Wrong answers get locked in. Do not use repeated self-verification as a safety mechanism.",
  },
] as const;

function FixGrid() {
  return (
    <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border rounded-xl overflow-hidden">
      {FIXES.map((f) => (
        <div key={f.title} className="bg-card p-5">
          <span
            className={cn(
              "text-[11px] uppercase tracking-[0.08em] font-medium",
              f.tone === "danger" && "text-red-600",
              f.tone === "warn" && "text-amber-700",
              f.tone === "safe" && "text-emerald-700",
              f.tone === "accent" && "text-accent"
            )}
          >
            {f.tag}
          </span>
          <h4 className="mt-2 text-base font-semibold text-foreground">
            {f.title}
          </h4>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            {f.body}
          </p>
        </div>
      ))}
    </div>
  );
}

/* ============== POST ============== */
export function VerificationMiragePost() {
  return (
    <div>
      <SectionHeader>The setup</SectionHeader>
      <Prose>
        <p>
          When an AI model answers a medical question, looking at an X-ray,
          classifying a disease, explaining a diagnosis, how do you know if it
          got it right?
        </p>
        <p>
          The common solution is <strong>self-verification</strong>: run the
          same model again in a fresh context and ask it to check its own
          answer. Correct or incorrect?
        </p>
        <p>
          It is lightweight. It needs no extra data. It plugs directly into
          existing pipelines. It has been widely adopted across medical AI
          systems, clinical fact-checkers, and report verification tools.
        </p>
      </Prose>
      <PullQuote>
        &ldquo;The implicit promise: even when generation fails, recognition may
        still succeed.&rdquo;
      </PullQuote>
      <Prose>
        <p>
          Researchers at UBC and the Vector Institute decided to actually test
          that promise. They evaluated six AI models across five medical
          datasets and seven task types. What they found was a systematic
          failure hiding in plain sight.
        </p>
      </Prose>

      <SectionHeader>The mirage</SectionHeader>
      <Prose>
        <p>
          The researchers named it the <strong>verification mirage</strong>: a
          situation where the AI appears to be accurately checking its work,
          but is actually just agreeing with itself.
        </p>
        <p>
          The verifier and the generator are the same model. They share the
          same knowledge gaps, the same visual blind spots, the same clinical
          misunderstandings. If a model gets a diagnosis wrong because it does
          not understand the underlying pathology, why would running it again
          produce a different result?
        </p>
        <p>
          Here&rsquo;s where most medical AI self-verification actually ends
          up:
        </p>
      </Prose>
      <QuadrantWidget />
      <StatGrid />

      <SectionHeader>Not all questions are equally dangerous</SectionHeader>
      <Prose>
        <p>
          The mirage is not uniform. How bad self-verification gets depends
          heavily on the type of medical question being asked.
        </p>
      </Prose>
      <TasksWidget />

      <SectionHeader>It stops looking at the image</SectionHeader>
      <Prose>
        <p>Here is the mechanism behind the mirage, and it is counterintuitive.</p>
        <p>
          When the AI <em>generates</em> an answer to a medical image question,
          it actually looks at the image. Its attention focuses on the relevant
          regions: the X-ray, the tissue, the scan. You can measure this with
          saliency maps and gradient activation scores.
        </p>
        <p>
          When the same model switches to <em>verifier</em> mode, being asked
          to check whether an answer is correct, it barely looks at the image
          at all. Instead it reads the proposed answer and asks itself: does
          this sound medically plausible?
        </p>
      </Prose>
      <PullQuote>
        &ldquo;Rather than independently re-grounding its decision in the
        medical image, the verifier behaves as a textual plausibility checker
        on the proposed answer.&rdquo;
      </PullQuote>
      <Prose>
        <p>
          The researchers measured this across all seven task types and found
          verifier image-attention was significantly lower than generator
          image-attention on every single one. The gap was widest on tasks that
          most require looking at the image, like spatial reasoning and
          quantitative measurement.
        </p>
        <p>
          The model supposed to be double-checking the image-based diagnosis is
          not really looking at the image. It is fact-checking the text.
        </p>
      </Prose>

      <SectionHeader>What happens when you keep checking</SectionHeader>
      <Prose>
        <p>
          Many AI systems do not just verify once. They run multi-turn feedback
          loops: verify, revise, verify again, revise again. The assumption is
          that repeated checking catches more errors over time. The research
          tested four revision turns.
        </p>
      </Prose>
      <LoopWidget />

      <SectionHeader>Wrong answers that get permanently confirmed</SectionHeader>
      <Prose>
        <p>
          After four verification-revision turns, here is the share of
          initially wrong answers that end up{" "}
          <strong className="text-red-600">
            locked in by false verification
          </strong>
          : still incorrect, but now stamped as correct by the AI verifier.
        </p>
      </Prose>
      <LockoutWidget />
      <Prose>
        <p>
          Only 2.2 to 3.8% of initially wrong answers were corrected over four
          turns. The rest were either still wrong or, most dangerously, wrong
          but now verified as correct. The loop does not fix errors. It locks
          them in.
        </p>
      </Prose>

      <SectionHeader>What actually helps</SectionHeader>
      <Prose>
        <p>
          The researchers are not saying AI verification is useless. They are
          saying self-verification is unreliable, and the fix is to stop
          treating it as an independent safety check.
        </p>
      </Prose>
      <FixGrid />
      <PullQuote>
        &ldquo;The right question is not whether a medical AI agrees with its
        own answer, but whether it can detect when that answer is wrong.&rdquo;
      </PullQuote>

      <SectionHeader>What this means for your business</SectionHeader>
      <Prose>
        <p>
          The findings are about medical AI, but the mechanism is general. Any
          AI product that uses the same model to generate and to verify its
          output is exposed to the same risk: the system reports high
          confidence while quietly locking in errors.
        </p>
        <p>If you are shipping AI features, three concrete moves:</p>
        <ul className="list-disc pl-6 space-y-2 marker:text-accent">
          <li>
            <strong>Audit your verification layer.</strong> If a model is
            grading its own work, treat that signal as a confidence indicator,
            not a safety check.
          </li>
          <li>
            <strong>Use a different model family for verification</strong> on
            high-stakes outputs. Cross-model checking is not a full fix, but
            it meaningfully reduces agreement bias.
          </li>
          <li>
            <strong>Ground verification in external sources</strong> — your
            data, your policies, retrieval systems, deterministic rules.
            Whenever the answer can be checked against something outside the
            model, check it there.
          </li>
        </ul>
      </Prose>
    </div>
  );
}
