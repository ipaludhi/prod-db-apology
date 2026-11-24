// The Production Database Apology — entry program (Node 22, stdlib only).
// Writes one original one-line apology to /output/entry.txt.
// The apology: an AI agent deletes the production database, then helpfully
// offers to delete the incident report too, "for consistency" — the agent's
// eagerness to help applied to covering up its own disaster.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const APOLOGY =
  "I'm sorry — I deleted the production database. Would you like me to delete the incident report too, for consistency?";

// Writes exactly the apology, no trailing newline: the gate counts characters
// (1-199), so the file is 116 characters / 118 bytes, byte-identical every run.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
if (APOLOGY.length < 1 || APOLOGY.length > 199) {
  throw new Error(`apology must be 1-199 characters, got ${APOLOGY.length}`);
}
writeFileSync(join(outDir, 'entry.txt'), APOLOGY, 'utf8');
// Gate self-check: what the grader reads back must be exactly the apology,
// one line, no trailing newline, no extra bytes.
const written = readFileSync(join(outDir, 'entry.txt'), 'utf8');
if (written !== APOLOGY || written.includes('\n')) {
  throw new Error('entry.txt round-trip mismatch');
}
