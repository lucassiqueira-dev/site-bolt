export type ClassId = 'backend' | 'frontend' | 'hacker' | 'devops';

export type AttributeKey = 'logic' | 'creativity' | 'coffee' | 'debugging' | 'focus';

export type CardMode = 'collector' | 'tech';

export interface RPGClass {
  id: ClassId;
  name: string;
  title: string;
  description: string;
  icon: string;
  color: 'cyan' | 'purple' | 'green' | 'pink';
  hp: number;
  mp: number;
}

export interface Equipment {
  id: string;
  name: string;
  icon: string;
}

export interface Character {
  name: string;
  nickname: string;
  bio: string;
  classId: ClassId;
  attributes: Record<AttributeKey, number>;
  inventory: Equipment[];
  level: number;
}

export const ATTRIBUTE_KEYS: AttributeKey[] = ['logic', 'creativity', 'coffee', 'debugging', 'focus'];

export const ATTRIBUTE_LABELS: Record<AttributeKey, string> = {
  logic: 'Lógica',
  creativity: 'Criatividade',
  coffee: 'Café',
  debugging: 'Debugging',
  focus: 'Foco',
};

export const ATTRIBUTE_ICONS: Record<AttributeKey, string> = {
  logic: 'Brain',
  creativity: 'Sparkles',
  coffee: 'Coffee',
  debugging: 'Bug',
  focus: 'Target',
};

export const MAX_POINTS = 20;
export const MAX_ATTR = 10;
