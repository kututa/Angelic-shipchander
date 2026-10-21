import { cva, type VariantProps } from "class-variance-authority";

export const btn = cva(
  "group inline-flex items-center justify-center gap-3 font-display text-sm font-medium uppercase tracking-[0.14em] transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        signal: "bg-signal text-signal-foreground hover:brightness-110",
        marine: "bg-marine text-marine-foreground hover:bg-ocean",
        outlineLight:
          "border border-marine-foreground/50 text-marine-foreground hover:bg-marine-foreground hover:text-marine",
        outline:
          "border border-foreground/30 text-foreground hover:border-foreground hover:bg-foreground hover:text-background",
        link: "text-ocean hover:text-signal px-0",
      },
      size: {
        md: "h-12 px-6",
        lg: "h-14 px-8",
        sm: "h-10 px-4 text-xs",
      },
    },
    defaultVariants: { variant: "signal", size: "md" },
  },
);
export type BtnProps = VariantProps<typeof btn>;
