import { useState, useRef, useEffect, useCallback, useMemo, type ChangeEvent, type CSSProperties } from "react";

// ─── TYPES ────────────────────────────────────────────────────────────────────
export type Layout = "dot" | "grid";

export interface GridTheme {
  id: string;
  name: string;
  css: string;
  bg: string;
  bg2: string;
  accent: string;
  txt: string;
  txt2: string;
  tFont: string;
  border: string;
  rowAlt: string;
  hBg: string;
}

export interface DotTheme {
  id: string;
  name: string;
  css: string;
  bg: string;
  bg2: string;
  txt: string;
  txt2: string;
  accent: string;
  cat: string;
  dotC: string;
  div: string;
  foot: string;
}

export interface Format {
  id: string;
  label: string;
  icon: string;
  w: number;
  h: number;
}

export interface FontSizes {
  dotTitle1?: number;
  dotTitle2?: number;
  dotSub?: number;
  dotCatName?: number;
  dotItem?: number;
  dotNote?: number;
  dotFoot?: number;
  gridTitle?: number;
  gridSub?: number;
  gridCatName?: number;
  gridItemName?: number;
  gridItemDesc?: number;
  gridFoot?: number;
}

export interface CustomDotColors {
  bg: string;
  bg2: string;
  txt: string;
  txt2: string;
  accent: string;
  cat: string;
  foot: string;
}

export interface CustomGridColors {
  bg: string;
  bg2: string;
  accent: string;
  txt: string;
  txt2: string;
  border: string;
}

export interface Item {
  id: string;
  name: string;
  price: string;
  priceText: string;
  description: string;
}

export interface Category {
  id: string;
  name: string;
  items: Item[];
}

export interface TableData {
  id: string;
  layout: Layout;
  title: string;
  subtitle: string;
  footer: string;
  note: string;
  templateId: string;
  dotTemplateId: string;
  bgImage: string | null;
  bgOverlay: number;
  avatar: string | null;
  showCats: boolean;
  categories: Category[];
  fontSizes?: FontSizes;
  customDotColors?: CustomDotColors;
  customGridColors?: CustomGridColors;
}

// ─── TEMPLATES ────────────────────────────────────────────────────────────────
const TGRID: GridTheme[] = [
  { id:"elegance", name:"Elegância", css:"linear-gradient(135deg,#1a1a2e,#16213e)", bg:"#1a1a2e", bg2:"#16213e", accent:"#e94560", txt:"#fff", txt2:"#a0a8c0", tFont:"Georgia,serif", border:"#e94560", rowAlt:"rgba(233,69,96,.07)", hBg:"rgba(233,69,96,.18)" },
  { id:"gold",     name:"Dourado",   css:"linear-gradient(135deg,#0d0d0d,#1a1500)", bg:"#0d0d0d", bg2:"#1a1500", accent:"#c9a84c", txt:"#f5e6c8", txt2:"#9c8a6a", tFont:"Georgia,serif", border:"#c9a84c", rowAlt:"rgba(201,168,76,.08)", hBg:"rgba(201,168,76,.2)"  },
  { id:"rose",     name:"Rosa",      css:"linear-gradient(135deg,#fff0f5,#ffe4f0)", bg:"#fff0f5", bg2:"#ffe4f0", accent:"#e91e8c", txt:"#2d1a24", txt2:"#8a5070", tFont:"Georgia,serif", border:"#f06292", rowAlt:"rgba(233,30,140,.05)", hBg:"rgba(233,30,140,.12)" },
  { id:"dark",     name:"Noite",     css:"linear-gradient(135deg,#0a0a0a,#111)",    bg:"#0a0a0a", bg2:"#111",    accent:"#00e5ff", txt:"#e0e0e0", txt2:"#6a7080", tFont:"Arial,sans-serif", border:"#00e5ff", rowAlt:"rgba(0,229,255,.06)",  hBg:"rgba(0,229,255,.12)"  },
  { id:"violet",   name:"Violeta",   css:"linear-gradient(135deg,#120826,#1e0f3c)", bg:"#120826", bg2:"#1e0f3c", accent:"#b388ff", txt:"#ede7f6", txt2:"#9575cd", tFont:"Arial,sans-serif", border:"#b388ff", rowAlt:"rgba(179,136,255,.08)",hBg:"rgba(179,136,255,.15)"},
  { id:"cream",    name:"Bege",      css:"linear-gradient(135deg,#faf6f1,#f0e8dc)", bg:"#faf6f1", bg2:"#f0e8dc", accent:"#8b5e3c", txt:"#2c1a0e", txt2:"#7a5c4a", tFont:"Georgia,serif", border:"#c49a6c", rowAlt:"rgba(139,94,60,.06)",  hBg:"rgba(139,94,60,.12)"  },
  { id:"custom",   name:"✦ Custom",  css:"linear-gradient(135deg,#1a1a2e,#16213e)", bg:"#1a1a2e", bg2:"#16213e", accent:"#e94560", txt:"#fff", txt2:"#a0a8c0", tFont:"Georgia,serif", border:"#e94560", rowAlt:"rgba(233,69,96,.07)", hBg:"rgba(233,69,96,.18)" },
];

const TDOT: DotTheme[] = [
  { id:"dot_black",  name:"Noir",       css:"linear-gradient(160deg,#0d0d0d,#030303)",   bg:"#0d0d0d",    bg2:"#030303", txt:"#e6e6e6", txt2:"#b3b3b3",    accent:"#fff",    cat:"#fff",    dotC:"rgba(255,255,255,.3)",  div:"rgba(255,255,255,.12)", foot:"#888"    },
  { id:"dot_gold",   name:"Ouro",       css:"linear-gradient(160deg,#0a0800,#181400)", bg:"#0a0800", bg2:"#181400", txt:"#f0e0b0", txt2:"#9a8050", accent:"#c9a84c", cat:"#c9a84c", dotC:"rgba(201,168,76,.4)",   div:"rgba(201,168,76,.2)",  foot:"#7a6030" },
  { id:"dot_rose",   name:"Rosa Noir",  css:"linear-gradient(160deg,#0d0508,#160a10)", bg:"#0d0508", bg2:"#160a10", txt:"#f5d5e5", txt2:"#a06080", accent:"#e07090", cat:"#e07090", dotC:"rgba(224,112,144,.35)", div:"rgba(224,112,144,.2)", foot:"#a06080" },
  { id:"dot_ivory",  name:"Marfim",     css:"linear-gradient(160deg,#f8f4ee,#ede8e0)", bg:"#f8f4ee", bg2:"#ede8e0", txt:"#1a1410", txt2:"#7a6858", accent:"#4a3828", cat:"#4a3828", dotC:"rgba(74,56,40,.3)",    div:"rgba(74,56,40,.15)",   foot:"#7a6858" },
  { id:"dot_violet", name:"Violeta",    css:"linear-gradient(160deg,#08040f,#110818)", bg:"#08040f", bg2:"#110818", txt:"#e8d8f8", txt2:"#8060a8", accent:"#b088f0", cat:"#b088f0", dotC:"rgba(176,136,240,.35)",div:"rgba(176,136,240,.2)", foot:"#8060a8" },
  { id:"dot_grey",   name:"Cinza",      css:"linear-gradient(160deg,#181818,#222)",    bg:"#181818", bg2:"#222",    txt:"#d8d8d8", txt2:"#707070", accent:"#a0a0a0", cat:"#a8a8a8", dotC:"rgba(200,200,200,.3)",  div:"rgba(200,200,200,.15)", foot:"#707070" },
  { id:"dot_custom", name:"✦ Custom",   css:"linear-gradient(160deg,#0d0d0d,#030303)", bg:"#0d0d0d", bg2:"#030303", txt:"#e6e6e6", txt2:"#b3b3b3", accent:"#fff",    cat:"#fff",    dotC:"rgba(255,255,255,.3)",  div:"rgba(255,255,255,.12)", foot:"#888888" },
];

const FMTS: Format[] = [
  { id:"mobile",   label:"Mobile Full HD", icon:"📱", w:1080, h:1920 },
  { id:"story",    label:"Stories (9:16)", icon:"📸", w:1080, h:1920 },
  { id:"square",   label:"Post Quadrado",  icon:"⬛", w:1080, h:1080 },
  { id:"desktop",  label:"Desktop 16:9",   icon:"🖥️", w:1920, h:1080 },
  { id:"twitter",  label:"Twitter / X",    icon:"𝕏",  w:1600, h:900  },
  { id:"portrait", label:"Retrato 4:5",    icon:"🖼️", w:1080, h:1350 },
];

// ─── UTILS ───────────────────────────────────────────────────────────────────
const uid = (): string => Math.random().toString(36).slice(2, 9);
const clone = <T,>(o: T): T => JSON.parse(JSON.stringify(o));
const tG = (id: string): GridTheme => TGRID.find((t) => t.id === id) || TGRID[0];
const tD = (id: string): DotTheme => TDOT.find((t) => t.id === id) || TDOT[0];

function hexToRgba(hex: string, a: number): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16) || 0;
  const g = parseInt(h.slice(2, 4), 16) || 0;
  const b = parseInt(h.slice(4, 6), 16) || 0;
  return `rgba(${r},${g},${b},${a})`;
}

function eDotT(tb: TableData): DotTheme {
  const baseId = tb.dotTemplateId || "dot_black";
  if (baseId !== "dot_custom") return tD(baseId);
  const c = tb.customDotColors;
  if (!c) return tD("dot_black");
  return { id:"dot_custom", name:"Custom", css:`linear-gradient(160deg,${c.bg},${c.bg2})`, bg:c.bg, bg2:c.bg2, txt:c.txt, txt2:c.txt2, accent:c.accent, cat:c.cat, dotC:hexToRgba(c.cat, 0.3), div:hexToRgba(c.accent, 0.12), foot:c.foot };
}

function eGridT(tb: TableData): GridTheme {
  const baseId = tb.templateId || "elegance";
  if (baseId !== "custom") return tG(baseId);
  const c = tb.customGridColors;
  if (!c) return tG("elegance");
  return { id:"custom", name:"Custom", css:`linear-gradient(135deg,${c.bg},${c.bg2})`, bg:c.bg, bg2:c.bg2, accent:c.accent, txt:c.txt, txt2:c.txt2, tFont:"Georgia,serif", border:c.border, rowAlt:hexToRgba(c.accent, 0.07), hBg:hexToRgba(c.accent, 0.18) };
}

function fmtR(v: string | number | null | undefined): string {
  if (v === "" || v === null || v === undefined) return "";
  const n = typeof v === "number" ? v : parseFloat(v);
  return isNaN(n) ? String(v) : "R$" + n.toFixed(2).replace(".", ",");
}

function priceText(item: Item): string {
  if (item.priceText && item.priceText.trim()) return item.priceText.trim();
  if (item.price !== "" && item.price !== null && item.price !== undefined) return fmtR(item.price);
  return "";
}

function loadTables(): TableData[] {
  try {
    const raw = localStorage.getItem("pt3");
    return raw ? (JSON.parse(raw) as TableData[]) : [];
  } catch {
    return [];
  }
}
function saveTables(tables: TableData[]): void {
  try { localStorage.setItem("pt3", JSON.stringify(tables)); } catch {return;}
}

function newTable(): TableData {
  return {
    id: uid(), layout: "dot",
    title: "Tabela de\npreços", subtitle: "", footer: "", note: "",
    templateId: "elegance", dotTemplateId: "dot_black",
    bgImage: null, bgOverlay: 0.5, avatar: null,
    showCats: true, categories: [],
  };
}

// ─── HTML TABLE RENDERERS (for preview divs) ──────────────────────────────────
function htmlDot(tb: TableData, sc = 1): string {
  const t = eDotT(tb);
  const M = eDotM(tb);
  const p = (v: number): string => `${v * sc}px`;
  const bgS = tb.bgImage
    ? `background:linear-gradient(rgba(0,0,0,${tb.bgOverlay || 0.5}),rgba(0,0,0,${tb.bgOverlay || 0.5})),url(${tb.bgImage}) center/cover`
    : `background:linear-gradient(160deg,${t.bg},${t.bg2})`;
  const showC = tb.showCats !== false;
  const lines = (tb.title || "Tabela de\npreços").split("\n");
  const cats = (tb.categories || []).map((cat) => {
    const hdr = showC && cat.name
      ? `<div style="margin-bottom:${p(10)}">
           <span style="font-family:sans-serif;font-size:${p(M.catNameSize)};letter-spacing:${p(2.5)};text-transform:uppercase;color:${t.cat};font-weight:600">${cat.name}</span>
           <div style="height:${p(0.5)};background:${t.div};margin-top:${p(6)}"></div>
         </div>` : "";
    const rows = (cat.items || []).map((item) =>
      `<div style="display:flex;align-items:baseline;gap:${p(4)};margin-bottom:${p(6)}">
         <span style="font-family:sans-serif;font-size:${p(M.itemSize)};letter-spacing:${p(2.5)};text-transform:uppercase;color:${t.txt};font-weight:300;white-space:nowrap">${item.name}</span>
         <span style="flex:1;overflow:hidden;color:${t.dotC};font-size:${p(M.itemSize)};font-family:monospace;letter-spacing:${p(0.5)}">${".".repeat(80)}</span>
         <span style="font-family:sans-serif;font-size:${p(M.itemSize)};letter-spacing:${p(1.5)};color:${t.txt};font-weight:300;white-space:nowrap">${priceText(item)}</span>
       </div>`
    ).join("");
    return hdr + rows;
  }).join(`<div style="height:${p(30)}"></div>`);

  return `<div style="${bgS};padding:${p(40)} ${p(36)};border-radius:${p(12)}">
    ${tb.avatar ? `<img src="${tb.avatar}" style="display:block;width:${p(66)};height:${p(66)};border-radius:50%;object-fit:cover;margin:0 auto ${p(14)};border:${p(1.5)} solid ${t.accent}60">` : ""}
    <div style="text-align:center;margin-bottom:${p(34)}">
      <div style="font-family:Georgia,serif;font-size:${p(M.title1Size)};font-weight:400;color:${t.txt};line-height:1.05">${lines[0] || ""}</div>
      ${lines[1] ? `<div style="font-family:Georgia,serif;font-size:${p(M.title2Size)};font-style:italic;font-weight:300;color:${t.txt};line-height:1;margin-top:${p(10)}">${lines[1]}</div>` : ""}
      ${tb.subtitle ? `<div style="font-family:sans-serif;font-size:${p(M.subSize)};letter-spacing:${p(2.5)};text-transform:uppercase;color:${t.txt2};margin-top:${p(14)}">${tb.subtitle}</div>` : ""}
    </div>
    <div style="max-width:${p(500)};margin:0 auto">${cats}</div>
    ${tb.note ? `<div style="text-align:center;font-family:sans-serif;font-size:${p(M.noteSize)};letter-spacing:${p(1.5)};color:${t.txt2};margin-top:${p(26)};text-transform:uppercase">${tb.note}</div>` : ""}
    ${tb.footer ? tb.footer.split("|").map((line, i) => `<div style="text-align:center;font-family:sans-serif;font-size:${p(M.footSize)};letter-spacing:${p(1.5)};color:${t.foot};margin-top:${p(i === 0 ? 14 : 4)}">${line.trim()}</div>`).join("") : ""}
  </div>`;
}

function htmlGrid(tb: TableData, sc = 1): string {
  const t = eGridT(tb);
  const M = eGridM(tb);
  const p = (v: number): string => `${v * sc}px`;
  const bgS = tb.bgImage
    ? `background:linear-gradient(rgba(0,0,0,${tb.bgOverlay || 0.45}),rgba(0,0,0,${tb.bgOverlay || 0.45})),url(${tb.bgImage}) center/cover`
    : `background:linear-gradient(160deg,${t.bg},${t.bg2})`;
  const cats = (tb.categories || []).map((cat) => {
    const rows = (cat.items || []).map((item, i) =>
      `<div style="display:flex;justify-content:space-between;align-items:center;padding:${p(8)} ${p(12)};background:${i % 2 === 1 ? t.rowAlt : "transparent"};border-radius:${p(4)};gap:${p(8)}">
         <div>
           <div style="font-size:${p(M.itemNameSize)};font-weight:500;color:${t.txt}">${item.name}</div>
           ${item.description ? `<div style="font-size:${p(M.itemDescSize)};color:${t.txt2}">${item.description}</div>` : ""}
         </div>
         <span style="font-size:${p(M.itemNameSize)};font-weight:700;color:${t.accent};white-space:nowrap;background:${t.hBg};padding:${p(3)} ${p(10)};border-radius:${p(20)};border:${p(1)} solid ${t.border}">${priceText(item)}</span>
       </div>`
    ).join("");
    return `<div style="margin-bottom:${p(18)}">
      <div style="background:${t.hBg};border:${p(1)} solid ${t.border};border-radius:${p(6)};padding:${p(7)} ${p(14)};margin-bottom:${p(7)}">
        <div style="font-size:${p(M.catNameSize)};color:${t.accent};font-weight:700;letter-spacing:${p(0.5)};text-transform:uppercase">${cat.name}</div>
      </div>${rows}
    </div>`;
  }).join("");
  return `<div style="${bgS};padding:${p(28)};border-radius:${p(12)}">
    <div style="text-align:center;margin-bottom:${p(20)}">
      ${tb.avatar ? `<img src="${tb.avatar}" style="width:${p(66)};height:${p(66)};border-radius:50%;border:${p(3)} solid ${t.accent};object-fit:cover;display:block;margin:0 auto ${p(10)}">` : ""}
      <div style="font-family:${t.tFont};font-size:${p(M.titleSize)};font-weight:700;color:${t.accent};letter-spacing:${p(1)}">${tb.title || "Tabela de Preços"}</div>
      ${tb.subtitle ? `<div style="font-size:${p(M.subSize)};color:${t.txt2};margin-top:${p(5)}">${tb.subtitle}</div>` : ""}
      <div style="width:${p(42)};height:${p(2)};background:${t.accent};margin:${p(12)} auto 0;border-radius:2px"></div>
    </div>
    ${cats}
    ${tb.footer ? `<div style="text-align:center;font-size:${p(M.footSize)};color:${t.txt2};margin-top:${p(12)};border-top:${p(1)} solid ${t.border};padding-top:${p(10)}">${tb.footer}</div>` : ""}
  </div>`;
}

const htmlTable = (tb: TableData, sc?: number): string => (tb.layout === "dot" ? htmlDot(tb, sc) : htmlGrid(tb, sc));

// ─── CANVAS PRIMITIVES ─────────────────────────────────────────────────────────
function loadImage(src: string): Promise<HTMLImageElement | null> {
  return new Promise((res) => {
    const img = new Image();
    img.onload = () => res(img);
    img.onerror = () => res(null);
    img.src = src;
  });
}

function rRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number): void {
  ctx.beginPath();
  ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y); ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r); ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h); ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r); ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

// Stacks lines of text vertically without ever overlapping, regardless of how
// font sizes change between consecutive lines. `topY` is the top of this
// line's box; returns the top of the *next* line's box. This is the fix for
// the title-overlap bug: the old code advanced `y` by a fixed amount that did
// not account for the next line's own font size, so a big line-1 followed by
// a smaller/italic line-2 could land on top of line-1.
const ASCENT = 0.8;
function lineBoxH(fontPx: number, lineHeight = 1.2): number {
  return fontPx * lineHeight;
}
function drawLine(ctx: CanvasRenderingContext2D, text: string, cx: number, topY: number, fontPx: number, fontStr: string, lineHeight = 1.2): number {
  ctx.font = fontStr;
  ctx.fillText(text, cx, topY + fontPx * ASCENT);
  return topY + lineBoxH(fontPx, lineHeight);
}

// ─── LAYOUT METRICS (shared by measurement + drawing, so they can never drift) ─
// IMPORTANT: these numbers are transcribed directly from htmlDot/htmlGrid's
// literal CSS (margins, padding, font-size, line-height). The canvas export
// used to have its own independently-invented numbers, which is exactly why
// spacing in the exported PNG didn't match the on-page preview (e.g. the
// note/subtitle's margin-top). Keeping both renderers reading from the same
// design tokens (just scaled by each renderer's own `sc`) is what guarantees
// they stay in sync from now on.
const DOT_M = {
  topPad: 40, bottomPad: 40, sidePad: 36, maxColW: 500,
  avatarD: 66, avatarGap: 14,
  title1Size: 46, title1LH: 1.05,
  title2Size: 36, title2LH: 1.0, title2Gap: 10,
  subSize: 15, subGap: 14,
  preCatGap: 34,
  catNameSize: 10, catDivGapTop: 6, catDivH: 0.5, catHeaderGapAfter: 10,
  itemSize: 13, itemGapAfter: 6,
  catGapBetween: 30,
  noteSize: 11, noteGap: 26,
  footSize: 10, footGap: 14, footLineLH: 1.3,
  genLH: 1.2,
  contTopPad: 40, contTitleSize: 26, contGapAfter: 24,
};

const GRID_M = {
  padAll: 28, bottomPad: 28,
  avatarD: 66, avatarGap: 10,
  titleSize: 24, titleLH: 1.2,
  subSize: 12, subGap: 5,
  underGapTop: 12, underH: 2, headerGapAfter: 20,
  catBarPadV: 7, catNameSize: 13, catHeaderGapAfter: 7,
  rowPadV: 8, itemNameSize: 13, itemDescSize: 11,
  catGapAfter: 18,
  footGapTop: 12, footBorderH: 1, footPadTop: 10, footSize: 10,
  genLH: 1.2,
  contTopPad: 24, contTitleSize: 20, contGapAfter: 18,
};

type DotMetrics = typeof DOT_M;
type GridMetrics = typeof GRID_M;

function eDotM(tb: TableData): DotMetrics {
  const s = tb.fontSizes;
  if (!s) return DOT_M;
  const t1 = s.dotTitle1 ?? DOT_M.title1Size;
  return { ...DOT_M,
    title1Size: t1, title2Size: s.dotTitle2 ?? DOT_M.title2Size,
    subSize: s.dotSub ?? DOT_M.subSize, catNameSize: s.dotCatName ?? DOT_M.catNameSize,
    itemSize: s.dotItem ?? DOT_M.itemSize, noteSize: s.dotNote ?? DOT_M.noteSize,
    footSize: s.dotFoot ?? DOT_M.footSize,
    contTitleSize: Math.round(t1 * DOT_M.contTitleSize / DOT_M.title1Size),
  };
}

function eGridM(tb: TableData): GridMetrics {
  const s = tb.fontSizes;
  if (!s) return GRID_M;
  const t = s.gridTitle ?? GRID_M.titleSize;
  return { ...GRID_M,
    titleSize: t, subSize: s.gridSub ?? GRID_M.subSize,
    catNameSize: s.gridCatName ?? GRID_M.catNameSize, itemNameSize: s.gridItemName ?? GRID_M.itemNameSize,
    itemDescSize: s.gridItemDesc ?? GRID_M.itemDescSize, footSize: s.gridFoot ?? GRID_M.footSize,
    contTitleSize: Math.round(t * GRID_M.contTitleSize / GRID_M.titleSize),
  };
}

function dotHeaderFullH(tb: TableData, sc: number, M: DotMetrics = DOT_M): number {
  const lines = (tb.title || "Tabela de\npreços").split("\n");
  let h = M.topPad * sc;
  if (tb.avatar) h += M.avatarD * sc + M.avatarGap * sc;
  h += lineBoxH(M.title1Size * sc, M.title1LH);
  if (lines[1]) h += M.title2Gap * sc + lineBoxH(M.title2Size * sc, M.title2LH);
  if (tb.subtitle) h += M.subGap * sc + lineBoxH(M.subSize * sc, M.genLH);
  h += M.preCatGap * sc;
  return h;
}
function dotHeaderContH(sc: number, M: DotMetrics = DOT_M): number {
  return M.contTopPad * sc + lineBoxH(M.contTitleSize * sc, M.genLH) + M.contGapAfter * sc;
}
function dotCatHeaderH(sc: number, M: DotMetrics = DOT_M): number {
  return lineBoxH(M.catNameSize * sc, M.genLH) + M.catDivGapTop * sc + M.catDivH * sc + M.catHeaderGapAfter * sc;
}
function dotItemH(sc: number, M: DotMetrics = DOT_M): number {
  return lineBoxH(M.itemSize * sc, M.genLH) + M.itemGapAfter * sc;
}
function dotFooterH(tb: TableData, sc: number, M: DotMetrics = DOT_M): number {
  let h = 0;
  if (tb.note) h += M.noteGap * sc + lineBoxH(M.noteSize * sc, M.genLH);
  if (tb.footer) {
    const n = tb.footer.split("|").length;
    h += M.footGap * sc + n * lineBoxH(M.footSize * sc, M.footLineLH);
  }
  h += M.bottomPad * sc;
  return h;
}

function gridHeaderFullH(tb: TableData, sc: number, M: GridMetrics = GRID_M): number {
  let h = M.padAll * sc;
  if (tb.avatar) h += M.avatarD * sc + M.avatarGap * sc;
  h += lineBoxH(M.titleSize * sc, M.titleLH);
  if (tb.subtitle) h += M.subGap * sc + lineBoxH(M.subSize * sc, M.genLH);
  h += M.underGapTop * sc + M.underH * sc;
  h += M.headerGapAfter * sc;
  return h;
}
function gridHeaderContH(sc: number, M: GridMetrics = GRID_M): number {
  return M.contTopPad * sc + lineBoxH(M.contTitleSize * sc, M.genLH) + M.contGapAfter * sc;
}
function gridCatHeaderH(sc: number, M: GridMetrics = GRID_M): number {
  return M.catBarPadV * sc * 2 + lineBoxH(M.catNameSize * sc, M.genLH) + M.catHeaderGapAfter * sc;
}
function gridItemH(item: Item, sc: number, M: GridMetrics = GRID_M): number {
  let h = M.rowPadV * sc * 2 + lineBoxH(M.itemNameSize * sc, M.genLH);
  if (item.description) h += lineBoxH(M.itemDescSize * sc, M.genLH);
  return h;
}
function gridFooterH(tb: TableData, sc: number, M: GridMetrics = GRID_M): number {
  let h = 0;
  if (tb.footer) h += M.footGapTop * sc + M.footBorderH * sc + M.footPadTop * sc + lineBoxH(M.footSize * sc, M.genLH);
  h += M.bottomPad * sc;
  return h;
}

// ─── MEASUREMENT + PAGINATION ─────────────────────────────────────────────────
// These are pure functions (no canvas/DOM) so the layout math can be unit
// tested directly. `paginate` treats the chosen format's w/h as a MAXIMUM:
// if everything fits in one page, that page's height shrinks to the actual
// content height (instead of stretching to fill the full format height). If
// content doesn't fit, it is split across multiple pages, never cutting an
// item in half, each page capped at the format's max height, with the full
// header only on page 1 and a condensed repeated header + footer on every
// continuation page.
export interface MeasuredItem { item: Item; h: number; }
export interface MeasuredCategory { cat: Category; headerH: number; items: MeasuredItem[]; gapAfter: number; }
export interface Measurement {
  sc: number;
  headerFullH: number;
  headerContH: number;
  footerH: number;
  categories: MeasuredCategory[];
}
export interface PageSegment { cat: Category; items: Item[]; }
export interface ExportPage { isFirst: boolean; segments: PageSegment[]; contentH: number; }

function measureDot(fmt: Format, tb: TableData): Measurement {
  const sc = fmt.w / 700;
  const M = eDotM(tb);
  const showC = tb.showCats !== false;
  const chH = dotCatHeaderH(sc, M);
  const iH = dotItemH(sc, M);
  const cats = tb.categories || [];
  const categories: MeasuredCategory[] = cats.map((cat, idx) => ({
    cat,
    headerH: showC && cat.name ? chH : 0,
    items: (cat.items || []).map((item) => ({ item, h: iH })),
    gapAfter: idx < cats.length - 1 ? M.catGapBetween * sc : 0,
  }));
  return { sc, headerFullH: dotHeaderFullH(tb, sc, M), headerContH: dotHeaderContH(sc, M), footerH: dotFooterH(tb, sc, M), categories };
}

function measureGrid(fmt: Format, tb: TableData): Measurement {
  const sc = fmt.w / 700;
  const M = eGridM(tb);
  const chH = gridCatHeaderH(sc, M);
  const cats = tb.categories || [];
  const categories: MeasuredCategory[] = cats.map((cat) => ({
    cat,
    headerH: chH,
    items: (cat.items || []).map((item) => ({ item, h: gridItemH(item, sc, M) })),
    gapAfter: M.catGapAfter * sc,
  }));
  return { sc, headerFullH: gridHeaderFullH(tb, sc, M), headerContH: gridHeaderContH(sc, M), footerH: gridFooterH(tb, sc, M), categories };
}

export function measureTable(fmt: Format, tb: TableData): Measurement {
  return tb.layout === "dot" ? measureDot(fmt, tb) : measureGrid(fmt, tb);
}

export function paginate(m: Measurement, maxH: number): ExportPage[] {
  const pages: ExportPage[] = [];
  let segs: PageSegment[] = [];
  let h = m.headerFullH;
  let isFirst = true;
  let openSeg: PageSegment | null = null;

  const flushSegment = (): void => {
    if (openSeg && openSeg.items.length) segs.push(openSeg);
    openSeg = null;
  };
  const flushPage = (): void => {
    flushSegment();
    pages.push({ isFirst, segments: segs, contentH: Math.ceil(h + m.footerH) });
    segs = [];
    isFirst = false;
    h = m.headerContH;
  };

  for (const mc of m.categories) {
    openSeg = null;
    for (const mi of mc.items) {
      const headerCost = openSeg ? 0 : mc.headerH;
      const fits = h + headerCost + mi.h + m.footerH <= maxH;
      const pageHasContent = segs.length > 0 || (openSeg !== null && openSeg.items.length > 0);
      if (!fits && pageHasContent) flushPage();
      if (!openSeg) {
        openSeg = { cat: mc.cat, items: [] };
        h += mc.headerH;
      }
      openSeg.items.push(mi.item);
      h += mi.h;
    }
    flushSegment();
    h += mc.gapAfter;
  }
  pages.push({ isFirst, segments: segs, contentH: Math.ceil(h + m.footerH) });
  return pages;
}

// ─── PAGE RENDERERS ────────────────────────────────────────────────────────────
async function renderDotPage(ctx: CanvasRenderingContext2D, tb: TableData, sc: number, page: ExportPage, canvasW: number, canvasH: number): Promise<void> {
  const t = eDotT(tb);
  const M = eDotM(tb);
  if (tb.bgImage) {
    const img = await loadImage(tb.bgImage);
    if (img) ctx.drawImage(img, 0, 0, canvasW, canvasH);
    ctx.fillStyle = `rgba(0,0,0,${tb.bgOverlay || 0.5})`;
    ctx.fillRect(0, 0, canvasW, canvasH);
  } else {
    const g = ctx.createLinearGradient(0, 0, 0, canvasH);
    g.addColorStop(0, t.bg); g.addColorStop(1, t.bg2);
    ctx.fillStyle = g; ctx.fillRect(0, 0, canvasW, canvasH);
  }

  const cx = canvasW / 2;
  const sidePad = M.sidePad * sc;
  const colW = Math.min(canvasW - sidePad * 2, M.maxColW * sc);
  const colX = cx - colW / 2;
  let y: number;

  if (page.isFirst) {
    y = M.topPad * sc;
    if (tb.avatar) {
      const img = await loadImage(tb.avatar);
      if (img) {
        const r = (M.avatarD * sc) / 2;
        ctx.save(); ctx.beginPath(); ctx.arc(cx, y + r, r, 0, Math.PI * 2); ctx.clip();
        ctx.drawImage(img, cx - r, y, r * 2, r * 2); ctx.restore();
        ctx.strokeStyle = t.accent + "80"; ctx.lineWidth = 2 * sc;
        ctx.beginPath(); ctx.arc(cx, y + r, r, 0, Math.PI * 2); ctx.stroke();
        y += r * 2 + M.avatarGap * sc;
      }
    }
    const lines = (tb.title || "Tabela de\npreços").split("\n");
    ctx.textAlign = "center"; ctx.fillStyle = t.txt;
    y = drawLine(ctx, lines[0] || "", cx, y, M.title1Size * sc, `400 ${M.title1Size * sc}px Georgia,serif`, M.title1LH);
    if (lines[1]) {
      y += M.title2Gap * sc;
      y = drawLine(ctx, lines[1], cx, y, M.title2Size * sc, `italic 300 ${M.title2Size * sc}px Georgia,serif`, M.title2LH);
    }
    if (tb.subtitle) {
      y += M.subGap * sc;
      ctx.fillStyle = t.txt2;
      y = drawLine(ctx, tb.subtitle.toUpperCase(), cx, y, M.subSize * sc, `300 ${M.subSize * sc}px Arial,sans-serif`, M.genLH);
    }
    y += M.preCatGap * sc;
  } else {
    y = M.contTopPad * sc;
    ctx.textAlign = "center"; ctx.fillStyle = t.txt;
    const contTitle = (tb.title || "Tabela de preços").split("\n").join(" ").trim() || "Tabela de preços";
    y = drawLine(ctx, contTitle, cx, y, M.contTitleSize * sc, `400 ${M.contTitleSize * sc}px Georgia,serif`, M.genLH);
    y += M.contGapAfter * sc;
  }

  const showC = tb.showCats !== false;
  const lastCatOverall = tb.categories && tb.categories.length ? tb.categories[tb.categories.length - 1] : null;
  const rowH = dotItemH(sc, M);
  for (const seg of page.segments) {
    if (showC && seg.cat.name) {
      ctx.textAlign = "left"; ctx.fillStyle = t.cat;
      const afterName = drawLine(ctx, seg.cat.name.toUpperCase(), colX, y, M.catNameSize * sc, `600 ${M.catNameSize * sc}px Arial,sans-serif`, M.genLH);
      const divY = afterName + M.catDivGapTop * sc;
      ctx.fillStyle = t.div;
      ctx.fillRect(colX, divY, colW, M.catDivH * sc);
      y = divY + M.catDivH * sc + M.catHeaderGapAfter * sc;
    }
    for (const item of seg.items) {
      const pt = priceText(item);
      const fs = M.itemSize * sc;
      const baseline = y + fs * ASCENT;
      ctx.font = `300 ${fs}px Arial,sans-serif`;
      ctx.fillStyle = t.txt; ctx.textAlign = "left";
      const nw = ctx.measureText(item.name).width;
      ctx.fillText(item.name, colX, baseline);
      ctx.textAlign = "right";
      const pw = pt ? ctx.measureText(pt).width : 0;
      if (pt) ctx.fillText(pt, colX + colW, baseline);
      const dotStart = colX + nw + 5 * sc;
      const dotEnd = colX + colW - pw - (pt ? 8 * sc : 0);
      if (dotEnd > dotStart) {
        ctx.fillStyle = t.dotC;
        ctx.textAlign = "left";
        const step = 7 * sc;
        for (let x = dotStart; x < dotEnd - step * 0.5; x += step) ctx.fillText(".", x, baseline);
      }
      y += rowH;
    }
    const lastItemOfCat = seg.cat.items[seg.cat.items.length - 1];
    const completesCategory = seg.items.length > 0 && seg.items[seg.items.length - 1] === lastItemOfCat;
    if (completesCategory && seg.cat !== lastCatOverall) y += M.catGapBetween * sc;
  }

  if (tb.note) {
    y += M.noteGap * sc;
    ctx.textAlign = "center"; ctx.fillStyle = t.txt2;
    y = drawLine(ctx, tb.note, cx, y, M.noteSize * sc, `300 ${M.noteSize * sc}px Arial,sans-serif`, M.genLH);
  }
  if (tb.footer) {
    y += M.footGap * sc;
    ctx.textAlign = "center"; ctx.fillStyle = t.foot;
    for (const line of tb.footer.split("|")) {
      y = drawLine(ctx, line.trim(), cx, y, M.footSize * sc, `300 ${M.footSize * sc}px Arial,sans-serif`, M.footLineLH);
    }
  }
}

async function renderGridPage(ctx: CanvasRenderingContext2D, tb: TableData, sc: number, page: ExportPage, canvasW: number, canvasH: number): Promise<void> {
  const t = eGridT(tb);
  const M = eGridM(tb);
  if (tb.bgImage) {
    const img = await loadImage(tb.bgImage);
    if (img) ctx.drawImage(img, 0, 0, canvasW, canvasH);
    ctx.fillStyle = `rgba(0,0,0,${tb.bgOverlay || 0.45})`;
    ctx.fillRect(0, 0, canvasW, canvasH);
  } else {
    const g = ctx.createLinearGradient(0, 0, canvasW * 0.6, canvasH);
    g.addColorStop(0, t.bg); g.addColorStop(1, t.bg2);
    ctx.fillStyle = g; ctx.fillRect(0, 0, canvasW, canvasH);
  }

  const pad = M.padAll * sc;
  const cx = canvasW / 2;
  const colW = canvasW - pad * 2;
  let y: number;

  if (page.isFirst) {
    y = pad;
    if (tb.avatar) {
      const img = await loadImage(tb.avatar);
      if (img) {
        const r = (M.avatarD * sc) / 2;
        ctx.save(); ctx.beginPath(); ctx.arc(cx, y + r, r, 0, Math.PI * 2); ctx.clip();
        ctx.drawImage(img, cx - r, y, r * 2, r * 2); ctx.restore();
        ctx.strokeStyle = t.accent; ctx.lineWidth = 3 * sc;
        ctx.beginPath(); ctx.arc(cx, y + r, r, 0, Math.PI * 2); ctx.stroke();
        y += r * 2 + M.avatarGap * sc;
      }
    }
    ctx.fillStyle = t.accent; ctx.textAlign = "center";
    y = drawLine(ctx, tb.title || "Tabela de Preços", cx, y, M.titleSize * sc, `bold ${M.titleSize * sc}px Georgia,serif`, M.titleLH);
    if (tb.subtitle) {
      y += M.subGap * sc;
      ctx.fillStyle = t.txt2;
      y = drawLine(ctx, tb.subtitle, cx, y, M.subSize * sc, `${M.subSize * sc}px Arial`, M.genLH);
    }
    y += M.underGapTop * sc;
    ctx.fillStyle = t.accent;
    ctx.fillRect(cx - 21 * sc, y, 42 * sc, M.underH * sc);
    y += M.underH * sc + M.headerGapAfter * sc;
  } else {
    y = M.contTopPad * sc;
    ctx.fillStyle = t.accent; ctx.textAlign = "center";
    const contTitle = (tb.title || "Tabela de Preços").replace(/\n/g, " ");
    y = drawLine(ctx, contTitle, cx, y, M.contTitleSize * sc, `bold ${M.contTitleSize * sc}px Georgia,serif`, M.genLH);
    y += M.contGapAfter * sc;
  }

  for (const seg of page.segments) {
    const barH = gridCatHeaderH(sc, M) - M.catHeaderGapAfter * sc;
    rRect(ctx, pad, y, colW, barH, 5 * sc);
    ctx.fillStyle = t.hBg; ctx.fill();
    ctx.strokeStyle = t.border; ctx.lineWidth = 1.5 * sc; ctx.stroke();
    ctx.fillStyle = t.accent; ctx.font = `bold ${M.catNameSize * sc}px Arial`; ctx.textAlign = "left";
    ctx.fillText(seg.cat.name.toUpperCase(), pad + 14 * sc, y + M.catBarPadV * sc + M.catNameSize * sc * ASCENT);
    y += barH + M.catHeaderGapAfter * sc;

    seg.items.forEach((item, i) => {
      const h = gridItemH(item, sc, M);
      if (i % 2 === 1) { ctx.fillStyle = t.rowAlt; ctx.fillRect(pad, y, colW, h); }
      const nameBaseline = y + M.rowPadV * sc + M.itemNameSize * sc * ASCENT;
      ctx.fillStyle = t.txt; ctx.font = `500 ${M.itemNameSize * sc}px Arial`; ctx.textAlign = "left";
      ctx.fillText(item.name, pad + 12 * sc, nameBaseline);
      ctx.fillStyle = t.accent; ctx.font = `bold ${M.itemNameSize * sc}px Arial`; ctx.textAlign = "right";
      ctx.fillText(priceText(item), pad + colW - 12 * sc, nameBaseline);
      if (item.description) {
        const descTopY = y + M.rowPadV * sc + lineBoxH(M.itemNameSize * sc, M.genLH);
        ctx.fillStyle = t.txt2; ctx.font = `${M.itemDescSize * sc}px Arial`; ctx.textAlign = "left";
        ctx.fillText(item.description, pad + 12 * sc, descTopY + M.itemDescSize * sc * ASCENT);
      }
      y += h;
    });
    const lastItemOfCat = seg.cat.items[seg.cat.items.length - 1];
    const completesCategory = seg.items.length > 0 && seg.items[seg.items.length - 1] === lastItemOfCat;
    if (completesCategory) y += M.catGapAfter * sc;
  }

  if (tb.footer) {
    y += M.footGapTop * sc;
    ctx.fillStyle = t.border; ctx.fillRect(pad, y, colW, M.footBorderH * sc);
    y += M.footBorderH * sc + M.footPadTop * sc;
    ctx.fillStyle = t.txt2; ctx.textAlign = "center";
    drawLine(ctx, tb.footer, cx, y, M.footSize * sc, `${M.footSize * sc}px Arial`, M.genLH);
  }
}

// ─── EXPORT ORCHESTRATOR ───────────────────────────────────────────────────────
export interface ExportResult { dataUrl: string; index: number; total: number; }

export async function exportTableImages(canvas: HTMLCanvasElement, fmt: Format, tb: TableData): Promise<ExportResult[]> {
  const m = measureTable(fmt, tb);
  const pages = paginate(m, fmt.h);
  const ctx = canvas.getContext("2d");
  const results: ExportResult[] = [];
  if (!ctx) return results;
  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    const h = Math.max(1, page.contentH);
    canvas.width = fmt.w;
    canvas.height = h;
    ctx.clearRect(0, 0, fmt.w, h);
    if (tb.layout === "dot") await renderDotPage(ctx, tb, m.sc, page, fmt.w, h);
    else await renderGridPage(ctx, tb, m.sc, page, fmt.w, h);
    results.push({ dataUrl: canvas.toDataURL("image/png"), index: i + 1, total: pages.length });
  }
  return results;
}

// ─── ITEM MODAL ───────────────────────────────────────────────────────────────
interface ItemModalProps {
  itemId: string;
  data: Item;
  isDot: boolean;
  onChange: (d: Item) => void;
  onSave: () => void;
  onCancel: () => void;
}

function ItemModal({ itemId, data, isDot, onChange, onSave, onCancel }: ItemModalProps) {
  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.85)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:1000, padding:16 }}>
      <div style={{ background:"#1e1e2e", border:"1px solid #2a2a3e", borderRadius:16, padding:24, width:"100%", maxWidth:380 }}>
        <h3 style={{ color:"#fff", marginBottom:18, fontSize:15 }}>
          {itemId === "__new__" ? "Novo Serviço" : "Editar Serviço"}
        </h3>
        <div style={{ marginBottom:12 }}>
          <label style={{ fontSize:11, color:"#777", display:"block", marginBottom:4 }}>Nome do serviço *</label>
          <input style={{ width:"100%", background:"#12121e", border:"1px solid #333", borderRadius:8, color:"#e0e0e0", fontSize:13, padding:"8px 12px" }}
            value={data.name || ""} placeholder="Ex: PACK PEQUENO - 3 FOTOS"
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChange({ ...data, name: e.target.value })} />
        </div>
        {isDot ? (
          <div style={{ marginBottom:12 }}>
            <label style={{ fontSize:11, color:"#777", display:"block", marginBottom:4 }}>Preço como texto (ex: R$18,00 · R$7,00/MIN · A COMBINAR)</label>
            <input style={{ width:"100%", background:"#12121e", border:"1px solid #333", borderRadius:8, color:"#e0e0e0", fontSize:13, padding:"8px 12px" }}
              value={data.priceText || ""} placeholder="R$18,00 ou A COMBINAR"
              onChange={(e: ChangeEvent<HTMLInputElement>) => onChange({ ...data, priceText: e.target.value })} />
            <div style={{ fontSize:10, color:"#555", marginTop:4 }}>Deixe em branco para usar o campo numérico abaixo</div>
          </div>
        ) : (
          <div style={{ marginBottom:12 }}>
            <label style={{ fontSize:11, color:"#777", display:"block", marginBottom:4 }}>Descrição (opcional)</label>
            <input style={{ width:"100%", background:"#12121e", border:"1px solid #333", borderRadius:8, color:"#e0e0e0", fontSize:13, padding:"8px 12px" }}
              value={data.description || ""} placeholder="Detalhes do serviço..."
              onChange={(e: ChangeEvent<HTMLInputElement>) => onChange({ ...data, description: e.target.value })} />
          </div>
        )}
        <div style={{ marginBottom:20 }}>
          <label style={{ fontSize:11, color:"#777", display:"block", marginBottom:4 }}>
            Valor numérico (R$){isDot ? " — usado só se o texto acima estiver vazio" : ""}
          </label>
          <input type="number" min="0"
            style={{ width:"100%", background:"#12121e", border:"1px solid #333", borderRadius:8, color:"#e0e0e0", fontSize:13, padding:"8px 12px" }}
            value={data.price || ""} placeholder="18"
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChange({ ...data, price: e.target.value })} />
        </div>
        <div style={{ display:"flex", gap:10 }}>
          <button onClick={onCancel}
            style={{ flex:1, padding:12, background:"#12121e", border:"1px solid #333", borderRadius:8, color:"#777", cursor:"pointer" }}>
            Cancelar
          </button>
          <button onClick={onSave}
            style={{ flex:2, padding:12, background:"#e94560", border:"none", borderRadius:8, color:"#fff", fontWeight:700, cursor:"pointer" }}>
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── EXPORT MODAL ─────────────────────────────────────────────────────────────
interface ExportModalProps {
  table: TableData;
  onClose: () => void;
}

function ExportModal({ table, onClose }: ExportModalProps) {
  const [fmt, setFmt] = useState<string>("mobile");
  const [status, setStatus] = useState<string>("");
  const [busy, setBusy] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Live preview of what auto-fit will produce for each format: exact height
  // of the (first) generated image, plus how many images it will take if the
  // content doesn't fit in one.
  const formatInfo = useMemo(() => {
    const map: Record<string, { h: number; pages: number }> = {};
    for (const f of FMTS) {
      const m = measureTable(f, table);
      const pages = paginate(m, f.h);
      map[f.id] = { h: pages[0]?.contentH ?? f.h, pages: pages.length };
    }
    return map;
  }, [table]);

  const doExport = useCallback(async () => {
    const f = FMTS.find((x) => x.id === fmt) || FMTS[0];
    const canvas = canvasRef.current;
    if (!canvas) return;
    setBusy(true);
    try {
      setStatus("Calculando layout...");
      const results = await exportTableImages(canvas, f, table);
      const baseName = (table.title || "tabela").replace(/[\n\r]/g, "-").trim() || "tabela";
      for (const r of results) {
        setStatus(r.total > 1 ? `Baixando imagem ${r.index} de ${r.total}...` : "Preparando download...");
        const a = document.createElement("a");
        a.href = r.dataUrl;
        a.download = r.total > 1 ? `${baseName}-${fmt}-${r.index}-de-${r.total}.png` : `${baseName}-${fmt}.png`;
        a.click();
        if (r.index < r.total) await new Promise((res) => setTimeout(res, 350));
      }
      setStatus(results.length > 1 ? `✓ ${results.length} imagens geradas!` : "✓ Download iniciado!");
    } catch (e) {
      setStatus("Erro: " + (e instanceof Error ? e.message : String(e)));
    }
    setBusy(false);
  }, [fmt, table]);

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.85)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:1000, padding:16 }}>
      <div style={{ background:"#1e1e2e", border:"1px solid #2a2a3e", borderRadius:16, padding:24, width:"100%", maxWidth:520, maxHeight:"90vh", overflowY:"auto" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:6 }}>
          <h3 style={{ color:"#fff", fontSize:17 }}>Exportar Imagem</h3>
          <button onClick={onClose} style={{ background:"none", border:"none", color:"#666", fontSize:24, cursor:"pointer", lineHeight:1 }}>×</button>
        </div>
        <p style={{ color:"#555", fontSize:11, marginBottom:16 }}>
          A altura se ajusta à quantidade de itens. Se o conteúdo não couber em uma imagem, várias serão geradas automaticamente.
        </p>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:20 }}>
          {FMTS.map((f) => {
            const info = formatInfo[f.id];
            return (
              <button key={f.id} onClick={() => setFmt(f.id)}
                style={{ background: fmt === f.id ? "rgba(233,69,96,.15)" : "#12121e", border: `2px solid ${fmt === f.id ? "#e94560" : "#333"}`, borderRadius:10, padding:"12px 14px", textAlign:"left", color:"#fff", cursor:"pointer" }}>
                <div style={{ fontSize:16, marginBottom:4 }}>{f.icon}</div>
                <div style={{ fontWeight:600, fontSize:12 }}>{f.label}</div>
                <div style={{ fontSize:10, color:"#555", marginTop:2 }}>
                  {f.w}×{Math.round(info?.h ?? f.h)}px{info && info.pages > 1 ? ` · ${info.pages} imagens` : ""}
                </div>
              </button>
            );
          })}
        </div>
        <canvas ref={canvasRef} style={{ display:"none" }} />
        <button onClick={doExport} disabled={busy}
          style={{ width:"100%", padding:13, background: busy ? "#444" : "linear-gradient(135deg,#e94560,#c9a84c)", border:"none", borderRadius:10, color:"#fff", fontWeight:700, fontSize:14, cursor: busy ? "not-allowed" : "pointer" }}>
          {busy ? "Gerando..." : "⬇ Exportar PNG"}
        </button>
        {status && <div style={{ textAlign:"center", fontSize:12, color:"#888", marginTop:10 }}>{status}</div>}
      </div>
    </div>
  );
}

// ─── TABLE FORM ───────────────────────────────────────────────────────────────
interface ItemModalState { catId: string; itemId: string; data: Item; }

interface TableFormProps {
  initial: TableData | null;
  onSave: (data: TableData) => void;
  onCancel: () => void;
}

function TableForm({ initial, onSave, onCancel }: TableFormProps) {
  const [form, setForm] = useState<TableData>(() => (initial ? clone(initial) : newTable()));
  const [activeCat, setActiveCat] = useState<string | null>(null);
  const [itemModal, setItemModal] = useState<ItemModalState | null>(null);

  const isDot = form.layout === "dot";
  const setF = (patch: Partial<TableData>) => setForm((f) => ({ ...f, ...patch }));
  const tList = isDot ? TDOT : TGRID;
  const curTpl = isDot ? (form.dotTemplateId || "dot_black") : (form.templateId || "elegance");

  const addCat = () => {
    const cat: Category = { id: uid(), name: "", items: [] };
    setForm((f) => ({ ...f, categories: [...f.categories, cat] }));
    setActiveCat(cat.id);
  };
  const delCat = (id: string) => {
    setForm((f) => ({ ...f, categories: f.categories.filter((c) => c.id !== id) }));
    if (activeCat === id) setActiveCat(null);
  };
  const setCatName = (id: string, name: string) =>
    setForm((f) => ({ ...f, categories: f.categories.map((c) => (c.id === id ? { ...c, name } : c)) }));

  const openAdd = (catId: string) => setItemModal({ catId, itemId: "__new__", data: { id: uid(), name: "", price: "", priceText: "", description: "" } });
  const openEdit = (catId: string, itemId: string) => {
    const cat = form.categories.find((c) => c.id === catId);
    const item = cat?.items.find((i) => i.id === itemId);
    if (item) setItemModal({ catId, itemId, data: clone(item) });
  };
  const delItem = (catId: string, itemId: string) =>
    setForm((f) => ({ ...f, categories: f.categories.map((c) => (c.id === catId ? { ...c, items: c.items.filter((i) => i.id !== itemId) } : c)) }));

  const saveItem = () => {
    const m = itemModal;
    if (!m) return;
    if (!m.data.name?.trim()) { alert("Digite o nome do serviço."); return; }
    setForm((f) => ({
      ...f,
      categories: f.categories.map((c) => {
        if (c.id !== m.catId) return c;
        if (m.itemId === "__new__") return { ...c, items: [...c.items, clone(m.data)] };
        return { ...c, items: c.items.map((i) => (i.id === m.itemId ? clone(m.data) : i)) };
      }),
    }));
    setItemModal(null);
  };

  const loadImg = (e: ChangeEvent<HTMLInputElement>, key: "avatar" | "bgImage") => {
    const f = e.target.files?.[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = (ev) => setF({ [key]: ev.target?.result as string } as Partial<TableData>);
    r.readAsDataURL(f);
  };

  const handleSave = () => {
    if (!form.title?.trim()) { alert("Adicione um título."); return; }
    onSave(clone(form));
  };

  const inp: CSSProperties = { background:"#12121e", border:"1px solid #333", borderRadius:8, color:"#e0e0e0", fontSize:13, padding:"8px 12px", width:"100%", boxSizing:"border-box", fontFamily:"inherit" };
  const lbl: CSSProperties = { fontSize:11, color:"#777", display:"block", marginBottom:4 };
  const sec: CSSProperties = { marginBottom:14 };

  return (
    <div style={{ boxSizing:"border-box", display:"grid", gridTemplateColumns:"1.5fr 1fr", gap:24, alignItems:"start" }}>
      {/* LEFT */}
      <div style={{ boxSizing:"border-box", maxWidth:"100%", overflowY:"auto", maxHeight:"84vh", paddingRight:14, paddingLeft: 14 }}>
        <h3 style={{ color:"#fff", marginBottom:14, fontSize:16 }}>{initial ? "Editar Tabela" : "Nova Tabela"}</h3>

        <div style={sec}>
          <label style={lbl}>Estilo de layout</label>
          <div style={{ display:"flex", gap:8 }}>
            {(["dot", "grid"] as const).map((l) => (
              <button key={l} onClick={() => setF({ layout: l })}
                style={{ flex:1, padding:"10px 8px", border: `2px solid ${form.layout === l ? "#e94560" : "#333"}`, borderRadius:10, background:"#12121e", color: form.layout === l ? "#e94560" : "#888", fontSize:12, fontWeight:600, cursor:"pointer" }}>
                {l === "dot" ? "✦ Pontilhado Clássico" : "▦ Grade com Categorias"}
              </button>
            ))}
          </div>
        </div>

        <div style={sec}>
          <label style={lbl}>Título{isDot ? " (2 linhas com Enter para efeito serifa+itálico)" : ""}</label>
          {isDot
            ? <textarea rows={2} style={{ ...inp, resize:"none" }} value={form.title || ""} placeholder={"Tabela de\npreços"} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setF({ title: e.target.value })} />
            : <input style={inp} value={form.title || ""} placeholder="Minha Tabela de Preços" onChange={(e: ChangeEvent<HTMLInputElement>) => setF({ title: e.target.value })} />}
        </div>

        <div style={sec}>
          <label style={lbl}>Subtítulo / @usuario</label>
          <input style={inp} value={form.subtitle || ""} placeholder="@seu_usuario" onChange={(e: ChangeEvent<HTMLInputElement>) => setF({ subtitle: e.target.value })} />
        </div>

        {isDot && (
          <div style={sec}>
            <label style={lbl}>Nota de destaque (ex: NÃO MOSTRO O ROSTO!)</label>
            <input style={inp} value={form.note || ""} placeholder="Mensagem de destaque..." onChange={(e: ChangeEvent<HTMLInputElement>) => setF({ note: e.target.value })} />
          </div>
        )}

        <div style={sec}>
          <label style={lbl}>Contato / Rodapé</label>
          <input style={inp} value={form.footer || ""} placeholder="X - @usuario | TELEGRAM - @usuario" onChange={(e: ChangeEvent<HTMLInputElement>) => setF({ footer: e.target.value })} />
        </div>

        <div style={sec}>
          <label style={lbl}>Tema visual</label>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8 }}>
            {tList.map((tp) => {
              const isCustom = tp.id === "custom" || tp.id === "dot_custom";
              const customBg = isCustom
                ? (isDot && form.customDotColors ? `linear-gradient(160deg,${form.customDotColors.bg},${form.customDotColors.bg2})` :
                   !isDot && form.customGridColors ? `linear-gradient(135deg,${form.customGridColors.bg},${form.customGridColors.bg2})` : tp.css)
                : tp.css;
              return (
                <button key={tp.id} onClick={() => {
                  if (isCustom) {
                    if (isDot && !form.customDotColors) {
                      const cur = tD(form.dotTemplateId || "dot_black");
                      setF({ dotTemplateId: tp.id, customDotColors: { bg: cur.bg, bg2: cur.bg2, txt: cur.txt, txt2: cur.txt2, accent: cur.accent, cat: cur.cat, foot: cur.foot } });
                    } else if (!isDot && !form.customGridColors) {
                      const cur = tG(form.templateId || "elegance");
                      setF({ templateId: tp.id, customGridColors: { bg: cur.bg, bg2: cur.bg2, accent: cur.accent, txt: cur.txt, txt2: cur.txt2, border: cur.border } });
                    } else {
                      setF(isDot ? { dotTemplateId: tp.id } : { templateId: tp.id });
                    }
                  } else {
                    setF(isDot ? { dotTemplateId: tp.id } : { templateId: tp.id });
                  }
                }}
                  style={{ background: customBg, border: `2px solid ${curTpl === tp.id ? "#e94560" : "transparent"}`, borderRadius:8, padding:"20px 6px 7px", fontSize:11, fontWeight:600, color:"#fff", textShadow:"0 1px 3px rgba(0,0,0,.9)", cursor:"pointer" }}>
                  {tp.name}
                </button>
              );
            })}
          </div>
          {/* Custom color pickers */}
          {((isDot && curTpl === "dot_custom") || (!isDot && curTpl === "custom")) && (() => {
            const colorFields = isDot
              ? [["bg","Fundo 1"],["bg2","Fundo 2"],["txt","Texto"],["txt2","Texto 2"],["accent","Destaque"],["cat","Categoria"],["foot","Rodapé"]] as const
              : [["bg","Fundo 1"],["bg2","Fundo 2"],["accent","Destaque"],["txt","Texto"],["txt2","Texto 2"],["border","Borda"]] as const;
            const colors = isDot ? (form.customDotColors || { bg:"#0d0d0d", bg2:"#030303", txt:"#e6e6e6", txt2:"#b3b3b3", accent:"#ffffff", cat:"#ffffff", foot:"#888888" }) : (form.customGridColors || { bg:"#1a1a2e", bg2:"#16213e", accent:"#e94560", txt:"#ffffff", txt2:"#a0a8c0", border:"#e94560" });
            const setColor = (key: string, val: string) => {
              if (isDot) setF({ customDotColors: { ...colors, [key]: val } as CustomDotColors });
              else setF({ customGridColors: { ...colors, [key]: val } as CustomGridColors });
            };
            return (
              <div style={{ marginTop:10, background:"#12121e", border:"1px solid #2a2a3e", borderRadius:10, padding:12 }}>
                <div style={{ fontSize:11, color:"#777", marginBottom:8 }}>Cores personalizadas</div>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(100px,1fr))", gap:8 }}>
                  {colorFields.map(([key, label]) => (
                    <label key={key} style={{ display:"flex", alignItems:"center", gap:6, cursor:"pointer" }}>
                      <input type="color" value={(colors as unknown as Record<string, string>)[key] || "#000000"}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setColor(key, e.target.value)}
                        style={{ width:28, height:28, border:"1px solid #444", borderRadius:6, padding:0, cursor:"pointer", background:"transparent" }} />
                      <span style={{ fontSize:10, color:"#999" }}>{label}</span>
                    </label>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>

        {/* Font size controls */}
        <div style={sec}>
          <label style={lbl}>Tamanhos de texto</label>
          <div style={{ background:"#12121e", border:"1px solid #2a2a3e", borderRadius:10, padding:12 }}>
            {(isDot ? [
              ["dotTitle1", "Título (linha 1)", DOT_M.title1Size, 20, 80],
              ["dotTitle2", "Título (linha 2)", DOT_M.title2Size, 16, 60],
              ["dotSub", "Subtítulo", DOT_M.subSize, 8, 30],
              ["dotCatName", "Categoria", DOT_M.catNameSize, 6, 24],
              ["dotItem", "Itens", DOT_M.itemSize, 8, 24],
              ["dotNote", "Nota", DOT_M.noteSize, 6, 20],
              ["dotFoot", "Rodapé", DOT_M.footSize, 6, 24],
            ] : [
              ["gridTitle", "Título", GRID_M.titleSize, 12, 48],
              ["gridSub", "Subtítulo", GRID_M.subSize, 8, 24],
              ["gridCatName", "Categoria", GRID_M.catNameSize, 6, 24],
              ["gridItemName", "Nome do item", GRID_M.itemNameSize, 8, 24],
              ["gridItemDesc", "Descrição", GRID_M.itemDescSize, 6, 20],
              ["gridFoot", "Rodapé", GRID_M.footSize, 6, 20],
            ] as [string, string, number, number, number][]).map(([key, label, def, min, max]) => {
              const val = (form.fontSizes as Record<string, number | undefined> | undefined)?.[key] ?? def;
              return (
                <div key={key} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
                  <span style={{ fontSize:10, color:"#999", width:90, flexShrink:0 }}>{label}</span>
                  <input type="range" min={min} max={max} step={1} value={val}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      const v = parseInt(e.target.value, 10);
                      setF({ fontSizes: { ...form.fontSizes, [key]: v === def ? undefined : v } });
                    }}
                    style={{ flex:1, accentColor:"#e94560" }} />
                  <span style={{ fontSize:10, color:"#c9a84c", width:24, textAlign:"right", flexShrink:0 }}>{val}</span>
                  {val !== def && (
                    <button onClick={() => setF({ fontSizes: { ...form.fontSizes, [key]: undefined } })}
                      style={{ background:"none", border:"none", color:"#e94560", fontSize:12, cursor:"pointer", padding:0, lineHeight:1 }}>↺</button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {isDot && (
          <div style={sec}>
            <label style={{ ...lbl, display:"flex", alignItems:"center", gap:8, cursor:"pointer" }}>
              <input type="checkbox" checked={form.showCats !== false} onChange={(e: ChangeEvent<HTMLInputElement>) => setF({ showCats: e.target.checked })}
                style={{ width:"auto", accentColor:"#e94560" }} />
              Mostrar títulos dos grupos como separadores
            </label>
          </div>
        )}

        <div style={sec}>
          <label style={lbl}>Foto de perfil</label>
          <div style={{ display:"flex", gap:8, alignItems:"center" }}>
            {form.avatar && <img src={form.avatar} alt="" style={{ width:36, height:36, borderRadius:"50%", objectFit:"cover", border:"2px solid #c9a84c" }} />}
            <label style={{ background:"#12121e", border:"1px solid #333", borderRadius:8, color:"#777", padding:"7px 14px", cursor:"pointer", fontSize:12, whiteSpace:"nowrap" }}>
              {form.avatar ? "Trocar foto" : "+ Foto"}
              <input type="file" accept="image/*" style={{ display:"none" }} onChange={(e: ChangeEvent<HTMLInputElement>) => loadImg(e, "avatar")} />
            </label>
            {form.avatar && <button onClick={() => setF({ avatar: null })} style={{ background:"none", border:"none", color:"#e94560", fontSize:18, cursor:"pointer" }}>×</button>}
          </div>
        </div>

        <div style={sec}>
          <label style={lbl}>Imagem de fundo</label>
          <div style={{ display:"flex", gap:8, alignItems:"center" }}>
            {form.bgImage && <div style={{ width:36, height:36, borderRadius:6, background:`url(${form.bgImage}) center/cover`, flexShrink:0 }} />}
            <label style={{ background:"#12121e", border:"1px solid #333", borderRadius:8, color:"#777", padding:"7px 14px", cursor:"pointer", fontSize:12, whiteSpace:"nowrap" }}>
              {form.bgImage ? "Trocar fundo" : "+ Fundo"}
              <input type="file" accept="image/*" style={{ display:"none" }} onChange={(e: ChangeEvent<HTMLInputElement>) => loadImg(e, "bgImage")} />
            </label>
            {form.bgImage && <button onClick={() => setF({ bgImage: null })} style={{ background:"none", border:"none", color:"#e94560", fontSize:18, cursor:"pointer" }}>×</button>}
          </div>
          {form.bgImage && (
            <div style={{ marginTop:8 }}>
              <label style={lbl}>Sombra: {Math.round((form.bgOverlay || 0.5) * 100)}%</label>
              <input type="range" min="0" max="90" step="5" value={Math.round((form.bgOverlay || 0.5) * 100)}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setF({ bgOverlay: parseInt(e.target.value, 10) / 100 })}
                style={{ width:"100%", accentColor:"#e94560" }} />
            </div>
          )}
        </div>

        <div style={sec}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
            <label style={{ ...lbl, margin:0 }}>Grupos de serviços</label>
            <button onClick={addCat} style={{ background:"#e94560", border:"none", borderRadius:6, color:"#fff", padding:"5px 13px", fontSize:11, fontWeight:700, cursor:"pointer" }}>+ Grupo</button>
          </div>
          {form.categories.length === 0 && <p style={{ color:"#444", fontSize:12, textAlign:"center", padding:16 }}>Adicione um grupo para começar.</p>}
          {form.categories.map((cat) => {
            const open = activeCat === cat.id;
            return (
              <div key={cat.id} style={{ background:"#12121e", border:"1px solid #2a2a3e", borderRadius:10, marginBottom:10, overflow:"hidden" }}>
                <div style={{ background:"#1a1a2e", padding:"9px 12px", display:"flex", alignItems:"center", gap:8, cursor:"pointer" }}
                  onClick={() => setActiveCat(open ? null : cat.id)}>
                  <input value={cat.name} onClick={(e) => e.stopPropagation()} onChange={(e: ChangeEvent<HTMLInputElement>) => setCatName(cat.id, e.target.value)}
                    style={{ flex:1, background:"#0d0d1a", border:"1px solid #333", borderRadius:6, color:"#e0e0e0", fontSize:12, padding:"5px 10px", fontFamily:"inherit" }}
                    placeholder="Nome do grupo (ex: PACKS)" />
                  <span style={{ color:"#555", fontSize:11, flexShrink:0 }}>{open ? "▲" : "▼"}</span>
                  <button onClick={(e) => { e.stopPropagation(); delCat(cat.id); }}
                    style={{ background:"none", border:"none", color:"#e94560", fontSize:18, cursor:"pointer", padding:"0 2px", flexShrink:0 }}>×</button>
                </div>
                {open && (
                  <div style={{ padding:10 }}>
                    {(cat.items || []).map((item) => (
                      <div key={item.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"7px 10px", background:"#0d0d1a", borderRadius:6, marginBottom:5, gap:8 }}>
                        <div style={{ flex:1, minWidth:0 }}>
                          <div style={{ color:"#e0e0e0", fontSize:12, fontWeight:500, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{item.name || "(sem nome)"}</div>
                          <div style={{ color:"#c9a84c", fontSize:11 }}>{priceText(item) || "—"}</div>
                        </div>
                        <div style={{ display:"flex", gap:5, flexShrink:0 }}>
                          <button onClick={() => openEdit(cat.id, item.id)}
                            style={{ background:"#1e3a5f", border:"none", borderRadius:6, color:"#60a5fa", padding:"4px 9px", fontSize:11, cursor:"pointer" }}>✏ Editar</button>
                          <button onClick={() => delItem(cat.id, item.id)}
                            style={{ background:"#3a1020", border:"none", borderRadius:6, color:"#e94560", padding:"4px 9px", fontSize:11, cursor:"pointer" }}>Del</button>
                        </div>
                      </div>
                    ))}
                    <button onClick={() => openAdd(cat.id)}
                      style={{ width:"100%", padding:7, background:"transparent", border:"1px dashed #333", borderRadius:6, color:"#666", fontSize:12, cursor:"pointer", marginTop:4 }}>
                      + Adicionar serviço
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ display:"flex", gap:10, marginTop:20, paddingBottom:24 }}>
          <button onClick={onCancel} style={{ flex:1, padding:12, background:"#1a1a2e", border:"1px solid #333", borderRadius:10, color:"#777", cursor:"pointer" }}>Cancelar</button>
          <button onClick={handleSave} style={{ flex:2, padding:12, background:"linear-gradient(135deg,#e94560,#c9a84c)", border:"none", borderRadius:10, color:"#fff", fontWeight:700, fontSize:14, cursor:"pointer" }}>Salvar Tabela</button>
        </div>
      </div>

      {/* RIGHT: live preview */}
      <div style={{ position:"sticky", top:20 }}>
        <div style={{ fontSize:11, color:"#555", textAlign:"center", marginBottom:8 }}>Pré-visualização</div>
        <div style={{ overflowY:"auto", maxHeight:"78vh", borderRadius:10 }}
          dangerouslySetInnerHTML={{ __html: htmlTable(form, 0.72) }} />
      </div>

      {/* Item Modal */}
      {itemModal && (
        <ItemModal
          itemId={itemModal.itemId}
          data={itemModal.data}
          isDot={isDot}
          onChange={(d) => setItemModal((m) => (m ? { ...m, data: d } : m))}
          onSave={saveItem}
          onCancel={() => setItemModal(null)}
        />
      )}
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
type View = "list" | "form" | "preview";

export default function App() {
  const [tables, setTables] = useState<TableData[]>(loadTables);
  const [view, setView] = useState<View>("list");
  const [editing, setEditing] = useState<string | null>(null);
  const [previewing, setPreviewing] = useState<string | null>(null);
  const [exporting, setExporting] = useState<string | null>(null);
  const importRef = useRef<HTMLInputElement>(null);

  useEffect(() => saveTables(tables), [tables]);

  const goList = () => { setView("list"); setEditing(null); setPreviewing(null); };

  const handleSave = (data: TableData) => {
    setTables((ts) => {
      if (editing) return ts.map((t) => (t.id === data.id ? data : t));
      return [...ts, data];
    });
    goList();
  };

  const handleDelete = (id: string) => {
    if (!window.confirm("Excluir esta tabela permanentemente?")) return;
    setTables((ts) => ts.filter((t) => t.id !== id));
  };

  const doExportJSON = () => {
    const b = new Blob([JSON.stringify(tables, null, 2)], { type:"application/json" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(b); a.download = "tabelas.json"; a.click();
  };
  const doImportJSON = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return;
    const r = new FileReader();
    r.onload = (ev) => {
      try {
        const d = JSON.parse(ev.target?.result as string);
        if (Array.isArray(d)) { setTables(d as TableData[]); alert("Importado com sucesso!"); } else alert("Arquivo inválido.");
      } catch { alert("Erro ao ler arquivo."); }
    };
    r.readAsText(f); e.target.value = "";
  };

  const previewTable = previewing ? tables.find((t) => t.id === previewing) : null;
  const exportTable  = exporting  ? tables.find((t) => t.id === exporting)  : null;

  const navStyle: CSSProperties = { background:"#0f0f1e", borderBottom:"1px solid #1e1e3a", padding:"0 20px", display:"flex", alignItems:"center", gap:12, height:54 };
  const btnP: CSSProperties = { background:"linear-gradient(135deg,#e94560,#c9a84c)", border:"none", borderRadius:8, color:"#fff", padding:"7px 16px", fontWeight:600, fontSize:12, cursor:"pointer" };
  const btnG: CSSProperties = { background:"#12121e", border:"1px solid #333", borderRadius:8, color:"#999", padding:"7px 14px", fontSize:12, cursor:"pointer" };

  return (
    <div style={{ minHeight:"100vh", background:"#0a0a12", color:"#e0e0e0", fontFamily:"'Inter','Segoe UI',sans-serif" }}>
      {/* NAV */}
      <nav style={navStyle}>
        <span onClick={goList}
          style={{ fontWeight:800, fontSize:17, background:"linear-gradient(90deg,#e94560,#c9a84c)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", cursor:"pointer" }}>
          ✦ PriceTable
        </span>
        <div style={{ flex:1 }} />
        {view === "list" && <>
          <button style={btnP} onClick={() => { setEditing(null); setView("form"); }}>+ Nova Tabela</button>
          <button style={btnG} onClick={doExportJSON}>↓ JSON</button>
          <label style={{ ...btnG, display:"inline-block" }}>
            ↑ JSON <input ref={importRef} type="file" accept=".json" style={{ display:"none" }} onChange={doImportJSON} />
          </label>
        </>}
        {view !== "list" && <button style={btnG} onClick={goList}>← Voltar</button>}
        {view === "preview" && previewTable && (
          <button style={btnP} onClick={() => setExporting(previewTable.id)}>🖼 Gerar Imagem</button>
        )}
      </nav>

      <div style={{ padding:20, maxWidth:1200, margin:"0 auto" }}>
        {/* LIST */}
        {view === "list" && (
          <>
            {tables.length === 0 ? (
              <div style={{ textAlign:"center", padding:"80px 20px", color:"#444" }}>
                <div style={{ fontSize:44, marginBottom:14 }}>✦</div>
                <p style={{ fontSize:15, color:"#555" }}>Nenhuma tabela criada ainda.</p>
                <p style={{ fontSize:12, color:"#444", marginTop:8 }}>Clique em "+ Nova Tabela" para começar.</p>
              </div>
            ) : (
              <>
                <h2 style={{ color:"#fff", marginBottom:6 }}>Minhas Tabelas</h2>
                <p style={{ color:"#555", fontSize:12, marginBottom:20 }}>{tables.length} tabela{tables.length > 1 ? "s" : ""}</p>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:16 }}>
                  {tables.map((tb) => {
                    const isDot = tb.layout === "dot";
                    const t = isDot ? eDotT(tb) : eGridT(tb);
                    const items = (tb.categories || []).reduce((a, c) => a + c.items.length, 0);
                    return (
                      <div key={tb.id} style={{ background:"#12121e", border:"1px solid #1e1e3a", borderRadius:14, overflow:"hidden" }}>
                        <div style={{ background: t.css, padding:18, minHeight:78, position:"relative" }}>
                          <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,.38)" }} />
                          <div style={{ position:"relative" }}>
                            <span style={{ fontSize:9, background: isDot ? "rgba(201,168,76,.2)" : "rgba(233,69,96,.2)", color: isDot ? "#c9a84c" : "#e94560", border: `1px solid ${isDot ? "#c9a84c44" : "#e9456044"}`, borderRadius:4, padding:"2px 6px", fontWeight:700 }}>
                              {isDot ? "PONTILHADO" : "GRADE"}
                            </span>
                            <div style={{ fontWeight:700, fontSize:15, color:"#fff", marginTop:6 }}>{(tb.title || "Sem título").replace(/\n/g, " ")}</div>
                            {tb.subtitle && <div style={{ fontSize:11, color:"rgba(255,255,255,.6)", marginTop:3 }}>{tb.subtitle}</div>}
                            <div style={{ fontSize:10, color:"rgba(255,255,255,.45)", marginTop:5 }}>{(tb.categories || []).length} grupos · {items} itens</div>
                          </div>
                        </div>
                        <div style={{ display:"flex", gap:8, padding:12 }}>
                          {[
                            { label:"👁 Ver",     bg:"#1a1a2e", color:"#aaa",    fn:() => { setPreviewing(tb.id); setView("preview"); } },
                            { label:"✏️ Editar",  bg:"#1a2e3a", color:"#60a5fa", fn:() => { setEditing(tb.id); setView("form"); } },
                            { label:"🖼 Imagem",  bg:"#1e2a12", color:"#a3e635", fn:() => setExporting(tb.id) },
                          ].map((btn) => (
                            <button key={btn.label} onClick={btn.fn}
                              style={{ flex:1, padding:7, background: btn.bg, border:"none", borderRadius:8, color: btn.color, fontSize:11, fontWeight:600, cursor:"pointer" }}>
                              {btn.label}
                            </button>
                          ))}
                          <button onClick={() => handleDelete(tb.id)}
                            style={{ padding:"7px 10px", background:"#2e1218", border:"none", borderRadius:8, color:"#e94560", fontSize:12, cursor:"pointer" }}>🗑</button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </>
        )}

        {/* FORM */}
        {view === "form" && (
          <TableForm
            initial={editing ? tables.find((t) => t.id === editing) ?? null : null}
            onSave={handleSave}
            onCancel={goList}
          />
        )}

        {/* PREVIEW */}
        {view === "preview" && previewTable && (
          <div>
            <h2 style={{ color:"#fff", marginBottom:20 }}>{(previewTable.title || "").replace(/\n/g, " ")}</h2>
            <div style={{ maxWidth:560, margin:"0 auto" }} dangerouslySetInnerHTML={{ __html: htmlTable(previewTable, 1) }} />
          </div>
        )}
      </div>

      {/* Export modal */}
      {exportTable && <ExportModal table={exportTable} onClose={() => setExporting(null)} />}
    </div>
  );
}