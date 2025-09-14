import { useCallback, useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/Language';

type Dict = Record<string, any>;

// Discover all translation modules under src/languages/** (Vite-powered)
// Example file: src/languages/en/pages/home.ts -> key root: pages.home
const allModules = import.meta.glob('../languages/**/**/*.ts');

function pathToKey(path: string, lang: string): string {
  // path like: ../languages/en/pages/home.ts
  const prefix = `../languages/${lang}/`;
  let cleaned = path.startsWith(prefix) ? path.slice(prefix.length) : path;
  cleaned = cleaned.replace(/\.(ts|tsx|js|jsx)$/i, '');
  // Normalize potential plural folder usage to singular to match codebase
  cleaned = cleaned.replace(/^components\//, 'component/');
  // Convert folders to dot-notation
  return cleaned.replace(/\\/g, '/').replace(/\//g, '.');
}

function setDeep(obj: Dict, dotPath: string, value: any) {
  const parts = dotPath.split('.');
  let cur: Dict = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const p = parts[i];
    if (!cur[p] || typeof cur[p] !== 'object') cur[p] = {};
    cur = cur[p];
  }
  cur[parts[parts.length - 1]] = value;
}

function getDeep(obj: Dict, dotPath: string): any {
  const parts = dotPath.split('.');
  let cur: any = obj;
  for (const p of parts) {
    if (cur == null) return undefined;
    cur = cur[p];
  }
  return cur;
}

function interpolate(str: string, vars?: Record<string, string | number>) {
  if (!vars) return str;
  return str.replace(/\{(.*?)\}/g, (_, k) => `${vars[k] ?? ''}`);
}

// Cache dictionaries per language to avoid reloading
const dictCache = new Map<string, Dict>();

async function loadLanguageDict(lang: string): Promise<Dict> {
  if (dictCache.has(lang)) return dictCache.get(lang)!;

  const entries = Object.entries(allModules)
    .filter(([path]) => path.includes(`/languages/${lang}/`));

  const mods = await Promise.all(
    entries.map(([p, loader]) => loader().then((m) => ({ path: p, mod: m })))
  );

  const dict: Dict = {};
  for (const { path, mod } of mods) {
    const key = pathToKey(path, lang);
    const data = (mod && 'default' in mod) ? (mod as any).default : mod;
    setDeep(dict, key, data);
  }
  dictCache.set(lang, dict);
  return dict;
}

export function useI18n() {
  const { language, getLanguage } = useLanguage();
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dictRef = useRef<Dict>({});
  const [version, setVersion] = useState(0);

  useEffect(() => {
    console.log("Current language from context:", getLanguage());
    console.log("Language changed to", language);
    let cancelled = false;
    setReady(false);
    setError(null);
    loadLanguageDict(language)
      .then((d) => {
        if (!cancelled) {
          dictRef.current = d;
          setVersion((v) => v + 1);
          setReady(true);
        }
      })
      .catch((e) => {
        if (!cancelled) {
          setError(`${e}`);
          setReady(true);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [language]);

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>, fallback?: string) => {
      const raw = getDeep(dictRef.current, key);
      const str = (typeof raw === 'string') ? raw : (fallback ?? key);
      return interpolate(str, vars);
    },
    [language, version]
  );

  return { t, ready, error, language } as const;
}
