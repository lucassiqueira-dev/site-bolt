import type { Character } from '../types';
import { ATTRIBUTE_KEYS, ATTRIBUTE_LABELS } from '../types';
import { CLASSES } from '../classes';

export function generateCardCode(character: Character): string {
  const cls = CLASSES[character.classId];
  const attrs = ATTRIBUTE_KEYS.map((k) => `  ${k}: ${character.attributes[k]}`).join('\n');

  const inventory = character.inventory.length > 0
    ? character.inventory.map((e) => `    { name: "${e.name}", icon: "${e.icon}" }`).join(',\n')
    : '';

  return `// ═══════════════════════════════════════════
// DEVQUEST — Character Sheet
// Generated card code
// ═══════════════════════════════════════════

const character = {
  name: "${character.name || 'DEV_NAME'}",
  nickname: "${character.nickname}",
  level: ${character.level},
  class: {
    id: "${cls.id}",
    name: "${cls.name}",
    title: "${cls.title}",
    hp: ${cls.hp},
    mp: ${cls.mp},
  },
  bio: "${character.bio}",
  attributes: {
${attrs}
  },
  inventory: [
${inventory}
  ]
};

// Total points: ${ATTRIBUTE_KEYS.reduce((s, k) => s + character.attributes[k], 0)}/20
// ${ATTRIBUTE_KEYS.map((k) => `${ATTRIBUTE_LABELS[k]}: ${character.attributes[k]}`).join(' | ')}`;
}
