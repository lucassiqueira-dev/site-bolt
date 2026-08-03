import type { RPGClass, ClassId } from './types';

export const CLASSES: Record<ClassId, RPGClass> = {
  backend: {
    id: 'backend',
    name: 'Mago do Backend',
    title: 'Archmage of APIs',
    description: 'Domina as profundezas dos servidores, invocando APIs e controlando fluxos de dados com magia arcana.',
    icon: 'Server',
    color: 'cyan',
    hp: 85,
    mp: 95,
  },
  frontend: {
    id: 'frontend',
    name: 'Guerreiro Frontend',
    title: 'Knight of the Canvas',
    description: 'Empunha a espada do design e o escudo da usabilidade, criando interfaces lendárias.',
    icon: 'Sword',
    color: 'pink',
    hp: 90,
    mp: 70,
  },
  hacker: {
    id: 'hacker',
    name: 'Hacker Cyberpunk',
    title: 'Netrunner Ghost',
    description: 'Vagueia pelo ciberespaço, quebrando firewalls e manipulando dados no submundo digital.',
    icon: 'Terminal',
    color: 'green',
    hp: 70,
    mp: 90,
  },
  devops: {
    id: 'devops',
    name: 'Ninja do DevOps',
    title: 'Shadow Pipeline Master',
    description: 'Mestre das sombras que automatiza, faz deploy e mantém servidores invisíveis em harmonia.',
    icon: 'Cog',
    color: 'purple',
    hp: 80,
    mp: 85,
  },
};

export const CLASS_LIST = Object.values(CLASSES);
