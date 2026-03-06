"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { SendHorizontal, ArrowRight } from "lucide-react";
import { getMailtoHref } from "@/lib/email";

const SERVICE_CHIPS = [
  { label: "AI Strategy", prefill: "We know AI matters but aren't sure where to start. Our business..." },
  { label: "AI Development", prefill: "We need help building an AI-powered tool that..." },
  { label: "Agent Development", prefill: "We want to automate a workflow using AI agents that..." },
  { label: "UX/UI Design", prefill: "We're building an AI product and need help designing the interface..." },
];

const TYPEWRITER_PROMPTS = [
  "We want to add AI to our product but don't know where to start...",
  "Can you build us an AI agent that handles customer onboarding?",
  "We need a strategy for integrating AI into our operations...",
  "Help us build an internal tool that uses AI to process documents...",
  "We want to automate parts of our workflow with AI...",
  "Our competitors are using AI and we're falling behind...",
];

function useTypewriter(prompts: string[], enabled: boolean) {
  const [display, setDisplay] = useState("");
  const [promptIndex, setPromptIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const current = prompts[promptIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && charIndex < current.length) {
      // Typing
      timeout = setTimeout(() => {
        setDisplay(current.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
      }, 40 + Math.random() * 30);
    } else if (!isDeleting && charIndex === current.length) {
      // Pause at end
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && charIndex > 0) {
      // Deleting
      timeout = setTimeout(() => {
        setDisplay(current.slice(0, charIndex - 1));
        setCharIndex((c) => c - 1);
      }, 20);
    } else if (isDeleting && charIndex === 0) {
      // Move to next prompt
      setIsDeleting(false);
      setPromptIndex((i) => (i + 1) % prompts.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, promptIndex, prompts, enabled]);

  return display;
}

export function Hero() {
  const [message, setMessage] = useState("");
  const [userHasTyped, setUserHasTyped] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const typewriterText = useTypewriter(TYPEWRITER_PROMPTS, !userHasTyped);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  }, [message]);

  const handleSend = () => {
    const base = getMailtoHref("Project Inquiry");
    if (message.trim()) {
      window.location.href = `${base}&body=${encodeURIComponent(message)}`;
    } else {
      window.location.href = base;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setMessage(val);
    if (!userHasTyped && val.length > 0) setUserHasTyped(true);
    if (val.length === 0) setUserHasTyped(false);
  };

  const handleChipClick = (prefill: string) => {
    setMessage(prefill);
    setUserHasTyped(true);
    setTimeout(() => textareaRef.current?.focus(), 0);
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-16 overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 hero-gradient" aria-hidden="true" />
      <div className="absolute inset-0 dot-pattern" aria-hidden="true" />

      <div className="relative z-10 flex flex-col items-center w-full px-4 sm:px-6">
        {/* Available badge */}
        <div
          className="mb-8 animate-fade-up"
          style={{ animationDelay: "0.1s" }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium text-foreground/80 bg-background/80 backdrop-blur-sm border border-border/60 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.5)]" />
            Available for projects
          </span>
        </div>

        {/* Title */}
        <h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground tracking-tight text-center mb-4 animate-fade-up"
          style={{ animationDelay: "0.2s" }}
        >
          The gap between your business and AI?{" "}
          <span className="font-serif italic text-gradient whitespace-nowrap">
            I close it.
          </span>
        </h1>
        <p
          className="text-base sm:text-lg text-muted-foreground text-center max-w-lg mb-10 animate-fade-up"
          style={{ animationDelay: "0.3s" }}
        >
          From &ldquo;where do we even start&rdquo; to live in production.
        </p>

        {/* Chat Input */}
        <div
          className="w-full max-w-[680px] mb-8 animate-fade-up"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="relative rounded-2xl bg-card border border-border/80 shadow-[0_2px_20px_rgba(0,0,0,0.06),0_0_0_1px_rgba(0,0,0,0.03)] transition-shadow duration-300 focus-within:shadow-[0_4px_30px_rgba(0,0,0,0.08),0_0_0_1px_var(--color-accent)/0.2]">
            <div className="relative">
              {/* Typewriter overlay — shown when user hasn't typed */}
              {!userHasTyped && (
                <div
                  className="absolute inset-0 px-5 pt-5 pb-3 text-[15px] text-muted-foreground/70 pointer-events-none select-none"
                  aria-hidden="true"
                >
                  {typewriterText}
                  <span className="inline-block w-[2px] h-[1.1em] bg-muted-foreground/60 align-text-bottom ml-[1px] animate-pulse" />
                </div>
              )}
              <textarea
                ref={textareaRef}
                value={message}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder=""
                className="w-full resize-none bg-transparent text-[15px] text-foreground px-5 pt-5 pb-3 focus:outline-none min-h-[80px] max-h-[200px] rounded-t-2xl relative z-10"
                style={{ height: "80px" }}
              />
            </div>
            <div className="flex items-center justify-between px-3 pb-3 pt-1 border-t border-border/40">
              <span className="text-[11px] text-muted-foreground/40 pl-2 hidden sm:block">
                Press Enter to send
              </span>
              <div className="flex items-center gap-3 ml-auto">
                <Link
                  href="/work"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200"
                >
                  View My Work
                  <ArrowRight className="size-3.5" />
                </Link>
                <button
                  onClick={handleSend}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-accent hover:bg-accent/90 text-accent-foreground transition-all duration-200 active:scale-95 shadow-lg shadow-accent/20"
                >
                  <span className="hidden sm:inline">Get in Touch</span>
                  <SendHorizontal className="size-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Service chips */}
        <div
          className="flex flex-wrap items-center gap-2 justify-center animate-fade-up"
          style={{ animationDelay: "0.5s" }}
        >
          <span className="text-sm text-muted-foreground/50 mr-1">or pick a service</span>
          {SERVICE_CHIPS.map((chip) => (
            <button
              key={chip.label}
              onClick={() => handleChipClick(chip.prefill)}
              className="px-3 py-1.5 rounded-full text-xs font-medium border border-border/80 bg-card hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-all duration-200 active:scale-95 shadow-sm"
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
