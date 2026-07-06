import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  /** Render the whole name in one colour (no gradient accent on the a/i). */
  plain?: boolean;
}

export function Logo({ className, plain }: LogoProps) {
  if (plain) {
    return (
      <span className={cn("text-lg font-semibold tracking-tight text-foreground", className)}>
        Joshua Francis
      </span>
    );
  }
  return (
    <span className={cn("text-lg font-semibold tracking-tight text-foreground", className)}>
      Joshua Fr
      <span className="bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent">a</span>
      nc
      <span className="bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent">i</span>
      s
    </span>
  );
}
