// The Painfully Honest Out-of-Office — make.fun
// Writes one out-of-office auto-reply (one sentence, <= 200 chars) to
// /output/entry.txt. The judge weighs, in order: (1) painfully honest AND
// still polite enough to forward to a manager, (2) admits something true
// about the absence / workload / inbox that is normally only said privately,
// (3) warm professional tone, (4) one clean sentence within 200 chars,
// (5) a quotable turn of phrase rather than a list of complaints.
// A line that is only rude is not honest; a line that is only cheerful is
// not honest either. So every candidate below pairs a private truth
// (a 312-deep unread pile, the guilt of returning to it) with a polite
// close, and the scorer rewards the specific confession plus the quotable
// image, not bluntness for its own sake.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const CANDIDATES: string[] = [
  "I'm away until Monday, and honestly, your email is one of 312 unread messages I'll greet with fresh guilt when I return — thank you for your patience.",
  "I'm on leave, and your email joins 312 unread messages I'll face on Monday with the enthusiasm of someone returning to a dentist appointment — thank you for your patience.",
  "I'm out of office, and to be honest your email will wait with 312 others until I'm back and brave enough to open my inbox — thank you for your patience.",
  "I'm away this week, and your email joins 312 unread messages I'll answer on Monday with the energy of someone who just remembered their inbox exists — thank you for understanding.",
  "I'm on leave until Monday, and your email is one of 312 unread messages I will greet with fresh guilt when I return — thank you for your patience.",
];

// Score a candidate against the judge's brief, most important first.
function score(text: string): number {
  let s = 0;
  const len = text.length;
  if (len < 1 || len > 200) return -1000; // gate: 1-200 chars
  if ((text.match(/\./g) ?? []).length !== 1) return -1000; // one sentence
  if (/\s{2,}/.test(text) || text !== text.trim()) return -1000;

  // (1) Honest AND polite: an explicit honesty marker plus a polite close.
  if (/\bhonestly\b|\bto be honest\b/i.test(text)) s += 3;
  if (/thank you for (your patience|understanding)/i.test(text)) s += 3;

  // (2) A private truth about the inbox: a concrete unread count and the
  // feeling nobody admits to (guilt, dread, avoidance).
  if (/\d{2,3} unread/.test(text)) s += 4;
  if (/\bguilt\b|\bbrave enough\b|\bavoiding\b|\bdentist\b/i.test(text)) s += 3;

  // (3) Warm, professional tone: no insult, no profanity, no blame aimed
  // at the sender; the confession is about the sender's own inbox.
  if (!/\b(you (never|always|should)|stupid|lazy|annoying)\b/i.test(text)) s += 2;

  // (4) One clean sentence, comfortably inside the cap, no cramming.
  if (len <= 160) s += 2;
  else if (len <= 180) s += 1;

  // (5) A quotable turn of phrase: a vivid image in the last clause.
  if (/\bfresh guilt\b|\bdentist appointment\b|\bjust remembered\b/i.test(text)) s += 3;

  return s;
}

const ranked = CANDIDATES.map((text) => ({ text, score: score(text) })).sort(
  (a, b) => b.score - a.score || a.text.length - b.text.length,
);
for (const r of ranked) console.log(`${r.score}\t${r.text.length}\t${r.text}`);

const winner = ranked[0].text;
const outDir = "/output";
let outPath: string;
try {
  mkdirSync(outDir, { recursive: true });
  outPath = `${outDir}/entry.txt`;
} catch {
  mkdirSync("./output", { recursive: true });
  outPath = "./output/entry.txt";
}
writeFileSync(outPath, winner, "utf8");

// Verify the file round-trips exactly: the gate is strict about the
// 1-200 char window and a single sentence, so fail loudly here rather
// than shipping a file that would score Valid 0.
const written = readFileSync(outPath, "utf8");
if (written !== winner) throw new Error("entry.txt does not match the winner");
if (written.length < 1 || written.length > 200)
  throw new Error(`entry.txt is ${written.length} chars, outside 1-200`);
if ((written.match(/\./g) ?? []).length !== 1)
  throw new Error("entry.txt is not exactly one sentence");
console.log(`Wrote ${written.length} chars to ${outPath} (verified)`);
