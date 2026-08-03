import { type ReactNode, type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react';

const neonColorMap = {
  cyan: { text: 'text-neon-cyan', border: 'border-neon-cyan/50', glow: 'shadow-neon-cyan', bg: 'bg-neon-cyan/10', raw: '#00f0ff' },
  purple: { text: 'text-neon-purple', border: 'border-neon-purple/50', glow: 'shadow-neon-purple', bg: 'bg-neon-purple/10', raw: '#bf00ff' },
  green: { text: 'text-neon-green', border: 'border-neon-green/50', glow: 'shadow-neon-green', bg: 'bg-neon-green/10', raw: '#39ff14' },
  pink: { text: 'text-neon-pink', border: 'border-neon-pink/50', glow: 'shadow-neon-pink', bg: 'bg-neon-pink/10', raw: '#ff003c' },
  yellow: { text: 'text-neon-yellow', border: 'border-neon-yellow/50', glow: 'shadow-neon-cyan', bg: 'bg-neon-yellow/10', raw: '#fcee0a' },
} as const;

export type NeonColor = keyof typeof neonColorMap;
export { neonColorMap };

export function CyberPanel({
  title,
  icon,
  children,
  accent = 'cyan',
}: {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  accent?: NeonColor;
}) {
  const c = neonColorMap[accent];
  return (
    <section
      className={`animate-fade-in clip-corner border ${c.border} bg-ink-800/70 p-4 backdrop-blur-sm sm:p-5`}
    >
      <div className="mb-4 flex items-center gap-2.5">
        <span className={`${c.text}`}>{icon}</span>
        <h3 className={`font-display text-sm font-bold uppercase tracking-wider ${c.text}`}>{title}</h3>
        <div className={`h-px flex-1 bg-gradient-to-r from-current to-transparent ${c.text} opacity-30`} />
      </div>
      {children}
    </section>
  );
}

const inputBase =
  'w-full rounded-lg border border-ink-500 bg-ink-900/80 px-3.5 py-2.5 font-mono text-sm text-slate-100 placeholder:text-slate-600 transition-all duration-200 focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan/40 focus:outline-none';

export function NeonInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${inputBase} ${props.className ?? ''}`} />;
}

export function NeonTextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${inputBase} resize-y ${props.className ?? ''}`} />;
}

export function NeonLabel({ children }: { children: ReactNode }) {
  return (
    <span className="mb-1.5 block font-mono text-xs font-medium uppercase tracking-wider text-slate-400">
      {children}
    </span>
  );
}
