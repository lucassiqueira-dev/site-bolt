import { Brain, Sparkles, Coffee, Bug, Target, Minus, Plus, Gauge } from 'lucide-react';
import type { Character, AttributeKey } from '../types';
import { ATTRIBUTE_KEYS, ATTRIBUTE_LABELS, MAX_POINTS, MAX_ATTR } from '../types';
import { CyberPanel, neonColorMap, type NeonColor } from './ui';

const ICONS: Record<AttributeKey, typeof Brain> = {
  logic: Brain,
  creativity: Sparkles,
  coffee: Coffee,
  debugging: Bug,
  focus: Target,
};

const COLORS: Record<AttributeKey, NeonColor> = {
  logic: 'cyan',
  creativity: 'purple',
  coffee: 'yellow',
  debugging: 'green',
  focus: 'pink',
};

interface Props {
  character: Character;
  onChange: (character: Character) => void;
}

export function AttributeEditor({ character, onChange }: Props) {
  const used = ATTRIBUTE_KEYS.reduce((sum, key) => sum + character.attributes[key], 0);
  const available = MAX_POINTS - used;

  const adjust = (key: AttributeKey, delta: number) => {
    const current = character.attributes[key];
    const next = current + delta;
    if (next < 0 || next > MAX_ATTR) return;
    if (delta > 0 && available <= 0) return;
    onChange({
      ...character,
      attributes: { ...character.attributes, [key]: next },
    });
  };

  return (
    <CyberPanel
      title="Atributos"
      icon={<Gauge className="h-4 w-4" />}
      accent="purple"
    >
      {/* Points pool */}
      <div className="mb-4 clip-corner-sm border border-neon-purple/30 bg-ink-900/60 p-3">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-wider text-slate-400">Pontos Disponíveis</span>
          <span
            className={`font-display text-2xl font-bold ${
              available === 0 ? 'text-neon-pink text-glow-pink' : 'text-neon-purple text-glow-purple'
            }`}
          >
            {available}
          </span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-ink-600">
          <div
            className="h-full rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple transition-all duration-300"
            style={{ width: `${(used / MAX_POINTS) * 100}%` }}
          />
        </div>
        <p className="mt-1.5 font-mono text-[10px] text-slate-500">
          {used}/{MAX_POINTS} pontos distribuídos
        </p>
      </div>

      {/* Attributes */}
      <div className="space-y-2.5">
        {ATTRIBUTE_KEYS.map((key) => {
          const Icon = ICONS[key];
          const color = COLORS[key];
          const c = neonColorMap[color];
          const value = character.attributes[key];
          const canAdd = value < MAX_ATTR && available > 0;
          const canSub = value > 0;

          return (
            <div
              key={key}
              className="clip-corner-sm flex items-center gap-3 border border-ink-500 bg-ink-900/50 p-2.5 transition-all hover:border-ink-500"
            >
              <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${c.bg} ${c.text}`}>
                <Icon className="h-5 w-5" />
              </span>

              <div className="min-w-0 flex-1">
                <div className="mb-1 flex items-center justify-between">
                  <span className="font-mono text-xs font-medium text-slate-300">{ATTRIBUTE_LABELS[key]}</span>
                  <span className={`font-display text-sm font-bold ${c.text}`}>{value}</span>
                </div>
                {/* Progress bar */}
                <div className="h-1.5 overflow-hidden rounded-full bg-ink-600">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${c.text.replace('text-', 'bg-')}`}
                    style={{
                      width: `${(value / MAX_ATTR) * 100}%`,
                      boxShadow: `0 0 6px ${c.raw}`,
                    }}
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex shrink-0 gap-1.5">
                <button
                  type="button"
                  onClick={() => adjust(key, -1)}
                  disabled={!canSub}
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-ink-500 text-slate-400 transition-all hover:border-neon-pink hover:text-neon-pink active:scale-90 disabled:cursor-not-allowed disabled:opacity-20"
                  aria-label={`Diminuir ${ATTRIBUTE_LABELS[key]}`}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => adjust(key, 1)}
                  disabled={!canAdd}
                  className={`flex h-8 w-8 items-center justify-center rounded-md border transition-all active:scale-90 disabled:cursor-not-allowed disabled:opacity-20 ${
                    canAdd
                      ? `${c.border} ${c.text} hover:${c.bg}`
                      : 'border-ink-500 text-slate-400'
                  }`}
                  aria-label={`Aumentar ${ATTRIBUTE_LABELS[key]}`}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </CyberPanel>
  );
}
