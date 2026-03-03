import Link from "next/link";
import { navLinks } from "@/lib/data/navigation";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="text-lg font-semibold tracking-tight text-foreground"
            >
              Joshua Francis
            </Link>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-xs">
              AI consulting & implementation for companies that are ready to
              ship.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">
              Navigate
            </h4>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">
              Get in Touch
            </h4>
            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <a
                href="mailto:hello@joshuafrancis.co"
                className="hover:text-foreground transition-colors"
              >
                hello@joshuafrancis.co
              </a>
              <a
                href="https://linkedin.com/in/joshuafrancis"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/joshuafrancis"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Joshua Francis. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
