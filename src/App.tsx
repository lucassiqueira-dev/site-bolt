import { useState, useRef, useCallback } from 'react';
import { toPng } from 'html-to-image';
import {
  Dices, Download, Copy, Check, FlipHorizontal, CreditCard, FileCode,
  Gamepad2, Sparkles,
} from 'lucide-react';
import type { Character, CardMode } from './types';
import { defaultCharacter, randomCharacter } from './gameData';
import { CharacterForm } from './components/CharacterForm';
import { AttributeEditor } from './components/AttributeEditor';
import { InventoryEditor } from './components/InventoryEditor';
import { CharacterCard } from './components/CharacterCard';
import { generateCardCode } from './utils/exportCode';

const STORAGE_KEY = 'devquest-character';

function loadCharacter(): Character {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored) as Character;
  } catch {
    /* ignore */
  }
  return defaultCharacter();
}

export default function App() {
  const [character, setCharacter] = useState<Character>(loadCharacter);
  const [cardMode, setCardMode] = useState<CardMode>('collector');
  const [flipped, setFlipped] = useState(false);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Persist
  const update = (next: Character) => {
    setCharacter(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  };

  const handleQuickBuild = () => {
    update(randomCharacter());
  };

  const handleFlip = () => setFlipped((f) => !f);

  const handleDownload = useCallback(async () => {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      const dataUrl = await toPng(cardRef.current, {
        quality: 0.95,
        pixelRatio: 2,
        backgroundColor: '#070710',
      });
      const link = document.createElement('a');
      link.download = `devquest-${character.name || 'card'}-${character.level}.png`;
      link.href = dataUrl;
      link.click();
    } catch {
      // fallback: trigger print
      window.print();
    } finally {
      setDownloading(false);
    }
  }, [cardRef, character]);

  const handleCopyCode = useCallback(async () => {
    const code = generateCardCode(character);
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = code;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [character]);

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  return (
    <div className="cyber-grid min-h-screen bg-ink-900 text-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-neon-cyan/20 bg-ink-900/90 backdrop-blur-lg">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-neon-cyan/40 bg-neon-cyan/10 shadow-neon-cyan">
              <Gamepad2 className="h-5 w-5 text-neon-cyan" />
            </span>
            <div className="hidden sm:block">
              <h1 className="font-display text-base font-bold uppercase tracking-wider text-neon-cyan text-glow-cyan">
                DevQuest
              </h1>
              <p className="font-mono text-[10px] text-slate-500">RPG Character Generator</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleQuickBuild}
              className="flex items-center gap-1.5 rounded-lg border border-neon-purple/50 px-3 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-neon-purple transition-all hover:bg-neon-purple/10 active:scale-95"
            >
              <Dices className="h-4 w-4 animate-pulse-neon" />
              <span className="hidden sm:inline">Quick Build</span>
            </button>
            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1.5 rounded-lg border border-ink-500 bg-ink-800 px-3 py-2 font-mono text-xs font-medium text-slate-300 transition-all hover:border-neon-green/50 hover:text-neon-green active:scale-95"
            >
              {copied ? <Check className="h-4 w-4 text-neon-green" /> : <Copy className="h-4 w-4" />}
              <span className="hidden sm:inline">{copied ? 'Copiado!' : 'Copiar Código'}</span>
            </button>
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-neon-cyan to-neon-purple px-3 py-2 font-mono text-xs font-bold uppercase tracking-wider text-ink-900 shadow-neon-cyan transition-all hover:shadow-neon-purple active:scale-95 disabled:opacity-50"
            >
              <Download className={`h-4 w-4 ${downloading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">{downloading ? 'Gerando...' : 'Baixar PNG'}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1500px] px-4 py-6 sm:px-6">
        {/* Title */}
        <div className="mb-6 text-center">
          <h2 className="font-display text-2xl font-bold uppercase tracking-wider text-slate-100 sm:text-3xl">
            Forje seu <span className="text-neon-cyan text-glow-cyan">Herói</span> Dev
          </h2>
          <p className="mt-1 font-mono text-xs text-slate-500">
            // distribua pontos, equipe skills e gere sua ficha de personagem
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1fr_440px]">
          {/* Left: editors */}
          <div className="space-y-5">
            <CharacterForm character={character} onChange={update} />
            <AttributeEditor character={character} onChange={update} />
            <InventoryEditor character={character} onChange={update} />
          </div>

          {/* Right: card preview */}
          <div className="lg:sticky lg:top-20 lg:self-start">
            {/* Mode toggle + flip */}
            <div className="mb-3 flex items-center gap-2">
              <div className="flex flex-1 rounded-lg border border-ink-500 bg-ink-800 p-0.5">
                <button
                  onClick={() => { setCardMode('collector'); setFlipped(false); }}
                  className={`flex flex-1 items-center justify-center gap-1.5 rounded-md px-2 py-1.5 font-mono text-xs font-semibold transition-all ${
                    cardMode === 'collector'
                      ? 'bg-neon-cyan/15 text-neon-cyan'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  <CreditCard className="h-3.5 w-3.5" />
                  Carta
                </button>
                <button
                  onClick={() => { setCardMode('tech'); setFlipped(false); }}
                  className={`flex flex-1 items-center justify-center gap-1.5 rounded-md px-2 py-1.5 font-mono text-xs font-semibold transition-all ${
                    cardMode === 'tech'
                      ? 'bg-neon-green/15 text-neon-green'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  <FileCode className="h-3.5 w-3.5" />
                  Ficha Técnica
                </button>
              </div>
              <button
                onClick={handleFlip}
                title="Girar carta"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-ink-500 bg-ink-800 text-slate-400 transition-all hover:border-neon-purple/50 hover:text-neon-purple active:scale-90"
              >
                <FlipHorizontal className="h-4 w-4" />
              </button>
            </div>

            {/* Flip card container */}
            <div className="flip-card">
              <div className={`flip-inner ${flipped ? 'is-flipped' : ''}`}>
                {/* Front: current mode */}
                <div className="flip-face">
                  <CharacterCard ref={cardRef} character={character} mode={cardMode} />
                </div>
                {/* Back: opposite mode */}
                <div className="flip-face flip-back absolute inset-0">
                  <CharacterCard
                    character={character}
                    mode={cardMode === 'collector' ? 'tech' : 'collector'}
                  />
                </div>
              </div>
            </div>

            {/* Print button under card */}
            <button
              onClick={handlePrint}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-ink-500 bg-ink-800 py-2.5 font-mono text-xs font-medium uppercase tracking-wider text-slate-400 transition-all hover:border-neon-cyan/50 hover:text-neon-cyan active:scale-95"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Imprimir / Salvar PDF
            </button>
          </div>
        </div>
      </main>

      <footer className="border-t border-ink-700 py-4 text-center font-mono text-[10px] text-slate-600">
        DEVQUEST v1.0 // Forjado com React + Tailwind // 20 PTS MAX
      </footer>
    </div>
  );
}
