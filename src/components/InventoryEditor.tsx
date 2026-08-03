import { useState, type KeyboardEvent } from 'react';
import {
  Backpack, Plus, X, Sword, Shield, FlaskConical, Wand, Box, GitBranch,
  Crosshair, BookOpen, Scroll, Gem, Boxes, Cloud, Database, Coffee, Terminal,
  Dices,
} from 'lucide-react';
import type { Character, Equipment } from '../types';
import { CyberPanel, NeonInput, neonColorMap } from './ui';
import { randomEquipment } from '../gameData';

const ICON_MAP: Record<string, typeof Sword> = {
  Sword, Shield, FlaskConical, Wand, Box, GitBranch, Crosshair,
  BookOpen, Scroll, Gem, Boxes, Cloud, Database, Coffee, Terminal,
};

const ICON_CHOICES = Object.keys(ICON_MAP);

interface Props {
  character: Character;
  onChange: (character: Character) => void;
}

export function InventoryEditor({ character, onChange }: Props) {
  const [draftName, setDraftName] = useState('');
  const [draftIcon, setDraftIcon] = useState('Sword');

  const addEquipment = (name: string, icon: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    const eq: Equipment = { id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, name: trimmed, icon };
    onChange({ ...character, inventory: [...character.inventory, eq] });
    setDraftName('');
  };

  const removeEquipment = (id: string) => {
    onChange({ ...character, inventory: character.inventory.filter((e) => e.id !== id) });
  };

  const addRandom = () => {
    const eq = randomEquipment();
    onChange({ ...character, inventory: [...character.inventory, eq] });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addEquipment(draftName, draftIcon);
    }
  };

  return (
    <CyberPanel title="Inventário & Skills" icon={<Backpack className="h-4 w-4" />} accent="green">
      {/* Add new */}
      <div className="mb-4 space-y-2.5">
        <NeonInput
          value={draftName}
          onChange={(e) => setDraftName(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ex: Espada de React"
          maxLength={30}
        />
        <div className="flex items-center gap-2">
          <div className="flex flex-1 flex-wrap gap-1">
            {ICON_CHOICES.map((iconName) => {
              const Icon = ICON_MAP[iconName];
              const isActive = draftIcon === iconName;
              return (
                <button
                  key={iconName}
                  type="button"
                  onClick={() => setDraftIcon(iconName)}
                  className={`flex h-8 w-8 items-center justify-center rounded-md border transition-all ${
                    isActive
                      ? 'border-neon-green text-neon-green shadow-neon-green'
                      : 'border-ink-500 text-slate-500 hover:border-neon-green/40 hover:text-slate-300'
                  }`}
                  title={iconName}
                >
                  <Icon className="h-4 w-4" />
                </button>
              );
            })}
          </div>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => addEquipment(draftName, draftIcon)}
            disabled={!draftName.trim()}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-neon-green/50 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-neon-green transition-all hover:bg-neon-green/10 active:scale-95 disabled:opacity-30"
          >
            <Plus className="h-4 w-4" />
            Adicionar
          </button>
          <button
            type="button"
            onClick={addRandom}
            title="Adicionar item aleatório"
            className="flex items-center justify-center gap-1.5 rounded-lg border border-ink-500 px-3 py-2 font-mono text-xs text-slate-400 transition-all hover:border-neon-purple hover:text-neon-purple active:scale-95"
          >
            <Dices className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Inventory grid */}
      {character.inventory.length > 0 ? (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {character.inventory.map((eq, idx) => {
            const Icon = ICON_MAP[eq.icon] ?? Sword;
            const colorKeys: (keyof typeof neonColorMap)[] = ['cyan', 'purple', 'green', 'pink'];
            const c = neonColorMap[colorKeys[idx % colorKeys.length]];
            return (
              <div
                key={eq.id}
                className={`animate-slide-in clip-corner-sm group flex items-center gap-2.5 border ${c.border} ${c.bg} p-2.5`}
              >
                <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md ${c.text}`}>
                  <Icon className="h-5 w-5" />
                </span>
                <span className="flex-1 truncate font-mono text-xs font-medium text-slate-200">{eq.name}</span>
                <button
                  type="button"
                  onClick={() => removeEquipment(eq.id)}
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded text-slate-500 opacity-0 transition-all hover:text-neon-pink group-hover:opacity-100"
                  aria-label={`Remover ${eq.name}`}
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="clip-corner-sm flex items-center justify-center border border-dashed border-ink-500 py-6 text-center">
          <p className="font-mono text-xs text-slate-600">Inventário vazio. Adicione suas skills!</p>
        </div>
      )}
    </CyberPanel>
  );
}
