/**
 * Next.js 16 static export RSC payload fix.
 *
 * Problem: Files are generated as directory structures:
 *   explore/__next.!KGFwcCk/explore.txt
 *   explore/__next.!KGFwcCk/explore/__PAGE__.txt
 *
 * But browsers request dot-separated paths:
 *   explore/__next.!KGFwcCk.explore.txt
 *   explore/__next.!KGFwcCk.explore.__PAGE__.txt
 *
 * Solution: Copy directory-based files to dot-separated flat files.
 */
import { readdirSync, statSync, copyFileSync, existsSync } from 'fs';
import { join } from 'path';

const outDir = join(process.cwd(), 'out');
let count = 0;

function getAllFiles(dir) {
  const results = [];
  try {
    const entries = readdirSync(dir);
    for (const entry of entries) {
      const full = join(dir, entry);
      try {
        const stat = statSync(full);
        if (stat.isDirectory()) {
          results.push(...getAllFiles(full));
        } else {
          results.push(full);
        }
      } catch { /* skip */ }
    }
  } catch { /* skip */ }
  return results;
}

function findNextDirs(dir) {
  const results = [];
  try {
    const entries = readdirSync(dir);
    for (const entry of entries) {
      const full = join(dir, entry);
      try {
        const stat = statSync(full);
        if (stat.isDirectory()) {
          if (entry.startsWith('__next.')) {
            results.push({ parent: dir, name: entry, path: full });
          }
          results.push(...findNextDirs(full));
        }
      } catch { /* skip */ }
    }
  } catch { /* skip */ }
  return results;
}

console.log('Fixing RSC payload paths...');

const nextDirs = findNextDirs(outDir);

for (const { parent, name, path: dirPath } of nextDirs) {
  // Get all files recursively inside this __next.* directory
  const files = getAllFiles(dirPath);

  for (const file of files) {
    // Get relative path from the __next.* dir
    const relPath = file.substring(dirPath.length + 1).replace(/\\/g, '/');
    // Convert slashes to dots
    const dotPath = relPath.replace(/\//g, '.');
    // Create the flat destination: parent/__next.XXX.dotPath
    const destFile = join(parent, `${name}.${dotPath}`);

    if (!existsSync(destFile)) {
      try {
        copyFileSync(file, destFile);
        count++;
      } catch (e) {
        console.error(`Failed to copy ${file} -> ${destFile}:`, e.message);
      }
    }
  }
}

console.log(`Fixed ${count} RSC payload files.`);
