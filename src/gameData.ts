import type { Character, AttributeKey, Equipment, ClassId } from './types';
import { ATTRIBUTE_KEYS, MAX_POINTS } from './types';
import { CLASSES } from './classes';

const DEV_NAMES = [
  'Byte Wraith', 'Null Pointer', 'Ada Lovelace', 'Cipher Storm', 'Kai Stack',
  'Ruby Bytes', 'Lex Coder', 'Nova Pixel', 'Zed Compile', 'Jade Hack',
  'Orion Script', 'Vex Kernel', 'Luna Lambda', 'Axel Frame', 'Echo Daemon',
];

const NICKNAMES = [
  'the_BugSlayer', 'nullException', 'darkCookie', 'sshMaster', 'flexB0x',
  'asyncWizard', 'ch4ot1c', 'gitWitch', 'redPill', 'c0ffee_overlord',
  'stackOverflower', 'segfault', 'd3bugH4nd', 'theArchitect', 'mrRobot',
];

const BIOS = [
  'Vive de café e código limpo. Quebra sistemas só pra saber como funcionam.',
  'Constrói interfaces que brilham. Não tem medo de CSS nem de IE6.',
  'Automatiza tudo. Se repete 3x, já virou script.',
  'Hackeia por esporte, programa por paixão. O ciberespaço é sua casa.',
  'TypeScript > JavaScript. Tipos estáticos são a luz da razão.',
  'Resolvendo bugs desde 1999. O Stack Overflow é meu santuário.',
];

const SKILL_POOL: Omit<Equipment, 'id'>[] = [
  { name: 'Espada de React', icon: 'Sword' },
  { name: 'Escudo de TypeScript', icon: 'Shield' },
  { name: 'Poção de Python', icon: 'FlaskConical' },
  { name: 'Cajado de Node.js', icon: 'Wand' },
  { name: 'Armadura de Docker', icon: 'Box' },
  { name: 'Amuleto de Git', icon: 'GitBranch' },
  { name: 'Arco de Rust', icon: 'Crosshair' },
  { name: 'Grimório de SQL', icon: 'BookOpen' },
  { name: 'Pergaminho de Go', icon: 'Scroll' },
  { name: 'Cristal de Redis', icon: 'Gem' },
  { name: 'Relíquia de Kubernetes', icon: 'Boxes' },
  { name: 'Talismã de AWS', icon: 'Cloud' },
  { name: 'Lança de Vue', icon: 'Spear' },
  { name: 'Runa de GraphQL', icon: 'AsteriskSquare' },
  { name: 'Bênção de Tailwind', icon: 'Wind' },
  { name: 'Katana de Linux', icon: 'Terminal' },
  { name: 'Elixir de Java', icon: 'Coffee' },
  { name: 'Orbe de MongoDB', icon: 'Database' },
];

const CLASS_IDS: ClassId[] = ['backend', 'frontend', 'hacker', 'devops'];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickMany<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, arr.length));
}

function uid(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export function randomAttributes(): Record<AttributeKey, number> {
  const attrs = { logic: 0, creativity: 0, coffee: 0, debugging: 0, focus: 0 };
  let remaining = MAX_POINTS;
  const keys = [...ATTRIBUTE_KEYS].sort(() => Math.random() - 0.5);

  for (let i = 0; i < keys.length; i++) {
    if (i === keys.length - 1) {
      attrs[keys[i]] = Math.min(10, remaining);
    } else {
      const max = Math.min(10, remaining);
      const val = Math.max(1, Math.floor(Math.random() * (max - (keys.length - 1 - i)) + 1));
      attrs[keys[i]] = val;
      remaining -= val;
    }
  }
  return attrs;
}

export function randomCharacter(): Character {
  const classId = pick(CLASS_IDS);
  const skills = pickMany(SKILL_POOL, Math.floor(Math.random() * 3) + 3);

  return {
    name: pick(DEV_NAMES),
    nickname: pick(NICKNAMES),
    bio: pick(BIOS),
    classId,
    attributes: randomAttributes(),
    inventory: skills.map((s) => ({ ...s, id: uid() })),
    level: Math.floor(Math.random() * 50) + 1,
  };
}

export function defaultCharacter(): Character {
  return {
    name: '',
    nickname: '',
    bio: '',
    classId: 'frontend',
    attributes: { logic: 4, creativity: 4, coffee: 5, debugging: 3, focus: 4 },
    inventory: [
      { id: uid(), name: 'Espada de React', icon: 'Sword' },
      { id: uid(), name: 'Escudo de TypeScript', icon: 'Shield' },
    ],
    level: 1,
  };
}

export function randomEquipment(): Equipment {
  return { ...pick(SKILL_POOL), id: uid() };
}

export function getLevelTitle(level: number): string {
  if (level >= 90) return 'Lendário';
  if (level >= 70) return 'Épico';
  if (level >= 50) return 'Raro';
  if (level >= 30) return 'Incomum';
  if (level >= 10) return 'Comum';
  return 'Novato';
}

export function getRarityColor(level: number): 'cyan' | 'purple' | 'green' | 'pink' | 'yellow' {
  if (level >= 90) return 'yellow';
  if (level >= 70) return 'purple';
  if (level >= 50) return 'pink';
  if (level >= 30) return 'green';
  return 'cyan';
}

// Re-export for convenience
export { CLASSES };
