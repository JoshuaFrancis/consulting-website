"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { navLinks } from "@/lib/data/navigation";
import { services } from "@/lib/data/services";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/logo";

// Per-service brand colours for the nav dropdown marks
const SERVICE_ICON: Record<string, { gradient: string; dot: string }> = {
  "ai-agent": {
    gradient: "linear-gradient(135deg, #7C5CBF 0%, #4A154B 100%)",
    dot: "#7C5CBF",
  },
  "voice-ai": {
    gradient: "linear-gradient(135deg, #22C55E 0%, #15803D 100%)",
    dot: "#22C55E",
  },
  "ai-apps": {
    gradient: "linear-gradient(135deg, #6366F1 0%, #4338CA 100%)",
    dot: "#6366F1",
  },
  "creative-studio": {
    gradient: "linear-gradient(135deg, #FB7185 0%, #C084FC 100%)",
    dot: "#FB7185",
  },
  "ai-training": {
    gradient: "linear-gradient(135deg, #14B8A6 0%, #0F766E 100%)",
    dot: "#14B8A6",
  },
};

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="max-w-6xl mx-auto px-6 md:px-8 flex items-center justify-between h-16">
        <Link href="/" className="block">
          <Logo />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            if (link.href === "/services") {
              return (
                <div key={link.href} className="relative group">
                  <Link
                    href="/services"
                    className={cn(
                      "flex items-center gap-1 text-sm font-medium transition-colors hover:text-foreground",
                      isActive(link.href)
                        ? "text-foreground"
                        : "text-muted-foreground",
                    )}
                  >
                    Services
                    <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
                  </Link>

                  {/* Dropdown */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200">
                    <div className="w-[380px] rounded-xl border border-border bg-background shadow-xl shadow-black/[0.08] p-2">
                      {services.map((service) => (
                        <Link
                          key={service.slug}
                          href={`/services/${service.slug}`}
                          className="block p-3 rounded-lg hover:bg-muted/60 transition-colors"
                        >
                          <div className="min-w-0">
                            <div className="text-sm font-semibold text-foreground">
                              {service.title}
                            </div>
                            <div className="text-xs text-muted-foreground mt-0.5 leading-snug">
                              {service.tagline}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-foreground",
                  isActive(link.href)
                    ? "text-foreground"
                    : "text-muted-foreground",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile nav */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[320px] px-6 pt-12">
            <nav className="flex flex-col gap-6">
              {navLinks.map((link) => {
                if (link.href === "/services") {
                  return (
                    <div key={link.href} className="flex flex-col gap-3">
                      <Link
                        href="/services"
                        onClick={() => setOpen(false)}
                        className={cn(
                          "text-lg font-medium transition-colors hover:text-foreground",
                          isActive(link.href)
                            ? "text-foreground"
                            : "text-muted-foreground",
                        )}
                      >
                        Services
                      </Link>
                      <div className="flex flex-col gap-3 pl-4 border-l border-border/60">
                        {services.map((service) => (
                          <Link
                            key={service.slug}
                            href={`/services/${service.slug}`}
                            onClick={() => setOpen(false)}
                            className={cn(
                              "flex items-center gap-2.5 text-sm transition-colors hover:text-foreground",
                              pathname === `/services/${service.slug}`
                                ? "text-foreground font-medium"
                                : "text-muted-foreground",
                            )}
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                              style={{
                                backgroundColor: SERVICE_ICON[service.slug]?.dot,
                              }}
                            />
                            {service.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "text-lg font-medium transition-colors hover:text-foreground",
                      isActive(link.href)
                        ? "text-foreground"
                        : "text-muted-foreground",
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
