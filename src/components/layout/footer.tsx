import Link from "next/link";
import { navLinks } from "@/lib/data/navigation";
import { Logo } from "@/components/ui/logo";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <Link href="/" className="block w-fit">
              <Logo />
            </Link>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-xs">
              AI product design & development. I design it, build it, and
              ship it.
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

          {/* Location */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">
              Based in
            </h4>
            <p className="text-sm text-muted-foreground">
              Toronto, Ontario
            </p>
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
