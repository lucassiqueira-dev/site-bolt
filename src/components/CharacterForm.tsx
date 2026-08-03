import { User, AtSign, FileText, Server, Sword, Terminal, Cog } from 'lucide-react';
import type { ClassId, Character } from '../types';
import { CLASS_LIST } from '../classes';
import { CyberPanel, NeonInput, NeonTextArea, NeonLabel, neonColorMap } from './ui';

const CLASS_ICONS: Record<ClassId, typeof Server> = {
  backend: Server,
  frontend: Sword,
  hacker: Terminal,
  devops: Cog,
};

interface Props {
  character: Character;
  onChange: (character: Character) => void;
}

export function CharacterForm({ character, onChange }: Props) {
  const update = <K extends keyof Character>(key: K, value: Character[K]) => {
    onChange({ ...character, [key]: value });
  };

  return (
    <CyberPanel title="Identidade do Personagem" icon={<User className="h-4 w-4" />} accent="cyan">
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <NeonLabel>Nome do Dev</NeonLabel>
            <NeonInput
              value={character.name}
              onChange={(e) => update('name', e.target.value)}
              placeholder="Ex: Byte Wraith"
              maxLength={40}
            />
          </div>
          <div>
            <NeonLabel>Nickname</NeonLabel>
            <div className="relative">
              <AtSign className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neon-cyan/60" />
              <NeonInput
                value={character.nickname}
                onChange={(e) => update('nickname', e.target.value)}
                placeholder="the_bugslayer"
                maxLength={25}
                className="pl-9"
              />
            </div>
          </div>
        </div>

        <div>
          <NeonLabel>Bio Curta</NeonLabel>
          <NeonTextArea
            rows={2}
            value={character.bio}
            onChange={(e) => update('bio', e.target.value)}
            placeholder="Conte a lenda do seu dev em poucas palavras..."
            maxLength={180}
          />
          <p className="mt-1 text-right font-mono text-[10px] text-slate-600">{character.bio.length}/180</p>
        </div>

        <div>
          <NeonLabel>Classe</NeonLabel>
          <div className="grid gap-2.5 sm:grid-cols-2">
            {CLASS_LIST.map((cls) => {
              const Icon = CLASS_ICONS[cls.id];
              const c = neonColorMap[cls.color];
              const isActive = character.classId === cls.id;
              return (
                <button
                  key={cls.id}
                  type="button"
                  onClick={() => update('classId', cls.id)}
                  className={`clip-corner-sm group flex items-start gap-3 border p-3 text-left transition-all duration-200 ${
                    isActive
                      ? `${c.border} ${c.bg} ${c.glow}`
                      : 'border-ink-500 bg-ink-900/60 hover:border-ink-500'
                  }`}
                >
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border transition-all ${
                      isActive ? `${c.border} ${c.bg} ${c.text}` : 'border-ink-500 text-slate-500'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className={`text-sm font-bold ${isActive ? c.text : 'text-slate-300'}`}>{cls.name}</p>
                    <p className="truncate text-[11px] text-slate-500">{cls.title}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </CyberPanel>
  );
}
