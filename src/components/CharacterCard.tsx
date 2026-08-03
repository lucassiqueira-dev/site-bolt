import { forwardRef } from 'react';
import {
  Brain, Sparkles, Coffee, Bug, Target,
  Server, Sword, Terminal, Cog,
  Shield, FlaskConical, Wand, Box, GitBranch, Crosshair,
  BookOpen, Scroll, Gem, Boxes, Cloud, Database,
  Heart, Zap, Star,
} from 'lucide-react';
import type { Character, AttributeKey, ClassId, CardMode } from '../types';
import { ATTRIBUTE_KEYS, ATTRIBUTE_LABELS, MAX_ATTR } from '../types';
import { CLASSES } from '../classes';
import { neonColorMap, type NeonColor } from './ui';
import { getLevelTitle, getRarityColor } from '../gameData';

const ATTR_ICONS: Record<AttributeKey, typeof Brain> = {
  logic: Brain, creativity: Sparkles, coffee: Coffee, debugging: Bug, focus: Target,
};

const CLASS_ICONS: Record<ClassId, typeof Server> = {
  backend: Server, frontend: Sword, hacker: Terminal, devops: Cog,
};

const EQUIP_ICONS: Record<string, typeof Sword> = {
  Sword, Shield, FlaskConical, Wand, Box, GitBranch, Crosshair,
  BookOpen, Scroll, Gem, Boxes, Cloud, Database, Coffee, Terminal,
};

const GLOW_CLASS: Record<NeonColor, string> = {
  cyan: 'text-glow-cyan',
  purple: 'text-glow-purple',
  green: 'text-glow-green',
  pink: 'text-glow-pink',
  yellow: '',
};

interface Props {
  character: Character;
  mode: CardMode;
}

export const CharacterCard = forwardRef<HTMLDivElement, Props>(
  ({ character, mode }, ref) => {
    const cls = CLASSES[character.classId];
    const c = neonColorMap[cls.color];
    const rarityColor = getRarityColor(character.level);
    const rc = neonColorMap[rarityColor];
    const usedPoints = ATTRIBUTE_KEYS.reduce((s, k) => s + character.attributes[k], 0);

    const ClassIcon = CLASS_ICONS[cls.id];

    return (
      <div ref={ref} id="card-export" className="w-full select-none">
        {mode === 'collector' ? (
          <CollectorCard
            character={character}
            cls={cls}
            c={c}
            rc={rc}
            ClassIcon={ClassIcon}
            usedPoints={usedPoints}
          />
        ) : (
          <TechSheet
            character={character}
            cls={cls}
            c={c}
            rc={rc}
            ClassIcon={ClassIcon}
            usedPoints={usedPoints}
          />
        )}
      </div>
    );
  },
);
CharacterCard.displayName = 'CharacterCard';

interface CardSharedProps {
  character: Character;
  cls: typeof CLASSES[keyof typeof CLASSES];
  c: (typeof neonColorMap)[NeonColor];
  rc: (typeof neonColorMap)[NeonColor];
  ClassIcon: typeof Server;
  usedPoints: number;
}

function CollectorCard({ character, cls, c, rc, ClassIcon, usedPoints }: CardSharedProps) {
  return (
    <div
      className={`clip-corner relative overflow-hidden border-2 ${rc.border} bg-gradient-to-br from-ink-800 via-ink-900 to-ink-800 p-5`}
      style={{ minHeight: '560px' }}
    >
      {/* Decorative scan line */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-neon-cyan to-transparent animate-scan" />
      </div>

      {/* Corner accents */}
      <div className={`pointer-events-none absolute left-0 top-0 h-16 w-16 border-l-2 border-t-2 ${rc.border}`} />
      <div className={`pointer-events-none absolute right-0 top-0 h-16 w-16 border-r-2 border-t-2 ${rc.border}`} />
      <div className={`pointer-events-none absolute bottom-0 left-0 h-16 w-16 border-b-2 border-l-2 ${rc.border}`} />
      <div className={`pointer-events-none absolute bottom-0 right-0 h-16 w-16 border-b-2 border-r-2 ${rc.border}`} />

      {/* Rarity stripe */}
      <div className={`mb-4 flex items-center justify-between border-b ${rc.border} pb-2`}>
        <div className="flex items-center gap-1.5">
          <Star className={`h-3.5 w-3.5 ${rc.text}`} fill="currentColor" />
          <span className={`font-display text-xs font-bold uppercase tracking-widest ${rc.text}`}>
            {getLevelTitle(character.level)}
          </span>
        </div>
        <span className="font-mono text-xs text-slate-500">LV {character.level}</span>
      </div>

      {/* Avatar + Name */}
      <div className="flex flex-col items-center text-center">
        <div
          className={`mb-3 flex h-24 w-24 items-center justify-center rounded-2xl border-2 ${c.border} ${c.bg} ${c.glow}`}
        >
          <ClassIcon className={`h-12 w-12 ${c.text}`} />
        </div>
        <h2 className={`font-display text-2xl font-bold ${c.text} ${GLOW_CLASS[cls.color]}`}>
          {character.name || 'DEV_NAME'}
        </h2>
        {character.nickname && (
          <p className="font-mono text-sm text-slate-400">@{character.nickname}</p>
        )}
        <p className={`mt-1 font-mono text-xs uppercase tracking-wider ${c.text}`}>
          {cls.name}
        </p>
      </div>

      {/* HP / MP bars */}
      <div className="mt-4 space-y-2">
        <StatBar icon={Heart} label="HP" value={cls.hp} max={100} color="pink" />
        <StatBar icon={Zap} label="MP" value={cls.mp} max={100} color="cyan" />
      </div>

      {/* Bio */}
      {character.bio && (
        <p className="mt-3 border-l-2 border-slate-700 pl-3 font-mono text-xs italic leading-relaxed text-slate-400">
          "{character.bio}"
        </p>
      )}

      {/* Attributes */}
      <div className="mt-4 space-y-2">
        <p className={`font-display text-xs font-bold uppercase tracking-wider ${c.text}`}>Atributos</p>
        {ATTRIBUTE_KEYS.map((key) => {
          const Icon = ATTR_ICONS[key];
          const attrColor = neonColorMap[
            key === 'logic' ? 'cyan' : key === 'creativity' ? 'purple' : key === 'coffee' ? 'yellow' : key === 'debugging' ? 'green' : 'pink'
          ];
          const val = character.attributes[key];
          return (
            <div key={key} className="flex items-center gap-2">
              <Icon className={`h-3.5 w-3.5 shrink-0 ${attrColor.text}`} />
              <span className="w-20 shrink-0 font-mono text-[10px] uppercase text-slate-400">{ATTRIBUTE_LABELS[key]}</span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-ink-600">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${(val / MAX_ATTR) * 100}%`,
                    backgroundColor: attrColor.raw,
                    boxShadow: `0 0 6px ${attrColor.raw}`,
                  }}
                />
              </div>
              <span className={`w-4 shrink-0 text-right font-mono text-xs font-bold ${attrColor.text}`}>{val}</span>
            </div>
          );
        })}
      </div>

      {/* Inventory */}
      {character.inventory.length > 0 && (
        <div className="mt-4">
          <p className={`mb-2 font-display text-xs font-bold uppercase tracking-wider ${c.text}`}>Inventário</p>
          <div className="flex flex-wrap gap-1.5">
            {character.inventory.map((eq) => {
              const Icon = EQUIP_ICONS[eq.icon] ?? Sword;
              return (
                <span
                  key={eq.id}
                  className={`flex items-center gap-1 rounded border ${c.border} ${c.bg} px-2 py-1 font-mono text-[10px] ${c.text}`}
                >
                  <Icon className="h-3 w-3" />
                  {eq.name}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-5 flex items-center justify-between border-t border-ink-600 pt-2">
        <span className="font-mono text-[9px] text-slate-600">DEVQUEST // RPG CARD</span>
        <span className={`font-mono text-[9px] ${c.text}`}>PTS {usedPoints}/20</span>
      </div>
    </div>
  );
}

function TechSheet({ character, cls, c, rc, ClassIcon, usedPoints }: CardSharedProps) {
  return (
    <div
      className="clip-corner relative overflow-hidden border-2 border-neon-cyan/40 bg-ink-900 font-mono"
      style={{ minHeight: '560px' }}
    >
      {/* Terminal header bar */}
      <div className="flex items-center gap-1.5 border-b border-ink-600 bg-ink-800 px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-neon-pink/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-neon-yellow/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-neon-green/70" />
        <span className="ml-2 text-[10px] text-slate-500">character_sheet.json</span>
      </div>

      <div className="p-4 sm:p-5">
        {/* Header block */}
        <div className="flex items-start gap-4">
          <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border ${c.border} ${c.bg}`}>
            <ClassIcon className={`h-8 w-8 ${c.text}`} />
          </div>
          <div className="min-w-0 flex-1">
            <div className={`text-xs ${c.text}`}>{'>'} player_profile</div>
            <div className="text-lg font-bold text-slate-100">{character.name || 'DEV_NAME'}</div>
            {character.nickname && <div className="text-xs text-slate-500">@{character.nickname}</div>}
          </div>
          <div className="text-right">
            <div className={`text-xs ${rc.text}`}>{getLevelTitle(character.level)}</div>
            <div className="text-xs text-slate-500">LV {character.level}</div>
          </div>
        </div>

        {/* Bio as comment */}
        {character.bio && (
          <pre className="mt-3 whitespace-pre-wrap border-l-2 border-neon-cyan/30 pl-3 text-xs leading-relaxed text-slate-500">
{`// bio
"${character.bio}"`}
          </pre>
        )}

        {/* Class info */}
        <div className="mt-4 border border-ink-600 bg-ink-800/50 p-3">
          <div className={`text-xs ${c.text}`}>{'>'} class: "{cls.id}"</div>
          <div className="mt-1 text-sm text-slate-200">{cls.name}</div>
          <div className="text-[11px] text-slate-500">{cls.description}</div>
          <div className="mt-2 flex gap-4">
            <span className="text-xs"><span className="text-neon-pink">HP</span> {cls.hp}</span>
            <span className="text-xs"><span className="text-neon-cyan">MP</span> {cls.mp}</span>
          </div>
        </div>

        {/* Attributes as JSON */}
        <div className="mt-4">
          <div className={`text-xs ${c.text}`}>{'>'} attributes ({usedPoints}/20 pts)</div>
          <div className="mt-2 space-y-1.5">
            {ATTRIBUTE_KEYS.map((key) => {
              const Icon = ATTR_ICONS[key];
              const attrColor = neonColorMap[
                key === 'logic' ? 'cyan' : key === 'creativity' ? 'purple' : key === 'coffee' ? 'yellow' : key === 'debugging' ? 'green' : 'pink'
              ];
              const val = character.attributes[key];
              return (
                <div key={key} className="flex items-center gap-2 text-xs">
                  <Icon className={`h-3 w-3 ${attrColor.text}`} />
                  <span className="w-24 text-slate-400">{key}:</span>
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink-600">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{ width: `${(val / MAX_ATTR) * 100}%`, backgroundColor: attrColor.raw, boxShadow: `0 0 4px ${attrColor.raw}` }}
                    />
                  </div>
                  <span className={attrColor.text}>{val}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Inventory */}
        <div className="mt-4">
          <div className={`text-xs ${c.text}`}>{'>'} inventory ({character.inventory.length} items)</div>
          {character.inventory.length > 0 ? (
            <div className="mt-2 space-y-1">
              {character.inventory.map((eq) => {
                const Icon = EQUIP_ICONS[eq.icon] ?? Sword;
                return (
                  <div key={eq.id} className="flex items-center gap-2 border border-ink-600 bg-ink-800/40 px-2 py-1.5 text-xs">
                    <Icon className={`h-3.5 w-3.5 ${c.text}`} />
                    <span className="text-slate-300">{eq.name}</span>
                    <span className="ml-auto text-slate-600">equip</span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="mt-1 text-[11px] text-slate-600">[] // empty</div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-5 border-t border-ink-600 pt-2 text-[9px] text-slate-600">
          DEVQUEST v1.0 // generated_sheet
        </div>
      </div>
    </div>
  );
}

function StatBar({
  icon: Icon, label, value, max, color,
}: {
  icon: typeof Heart; label: string; value: number; max: number; color: NeonColor;
}) {
  const c = neonColorMap[color];
  return (
    <div className="flex items-center gap-2">
      <Icon className={`h-3.5 w-3.5 shrink-0 ${c.text}`} />
      <span className="w-7 shrink-0 font-mono text-[10px] font-bold text-slate-400">{label}</span>
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-ink-600">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${(value / max) * 100}%`, backgroundColor: c.raw, boxShadow: `0 0 6px ${c.raw}` }}
        />
      </div>
      <span className={`w-8 shrink-0 text-right font-mono text-[10px] ${c.text}`}>{value}/{max}</span>
    </div>
  );
}
