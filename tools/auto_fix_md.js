#!/usr/bin/env node
// Auto-fix markdown in-place across a directory:
// - unescape backslashes inside fenced code blocks
// - convert ASCII-art table blocks into code blocks or paragraphs
// - unwrap contiguous pipe '|' blocks into paragraphs or code blocks
// - unwrap fenced code blocks that are actually prose
//
// Usage: node tools/auto_fix_md.js path/to/dir
const fs = require('fs');
const path = require('path');

if (process.argv.length < 3) {
  console.error('Usage: node tools/auto_fix_md.js path/to/dir');
  process.exit(2);
}

const root = process.argv[2];
function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let files = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) files = files.concat(walk(full));
    else if (e.isFile() && /\.md$/i.test(e.name)) files.push(full);
  }
  return files;
}

function unescapeCodeblocks(text) {
  const lines = text.split(/\r?\n/);
  let inFence = false;
  let fenceMarker = null;
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^(```|~~~)/);
    if (m) {
      const marker = m[1];
      if (!inFence) {
        inFence = true;
        fenceMarker = marker;
        continue;
      } else if (marker === fenceMarker) {
        inFence = false;
        fenceMarker = null;
        continue;
      }
    }
    if (inFence) {
      // remove backslashes before characters that should not be escaped in code blocks
      lines[i] = lines[i].replace(/\\(?=[<>\[\]'"${}\-\\/])/g, '').replace(/\\\\(["'])/g, '$1');
    }
  }
  return lines.join('\n');
}

function convertAsciiTables(text) {
  const lines = text.split(/\r?\n/);
  const out = [];
  let i = 0;
  function isBorder(l) {
    return /^\+[=-]{3,}\+/.test(l);
  }
  while (i < lines.length) {
    const line = lines[i];
    if (isBorder(line)) {
      let j = i + 1;
      const block = [];
      while (j < lines.length && !isBorder(lines[j])) {
        block.push(lines[j]);
        j++;
      }
      if (j < lines.length && isBorder(lines[j])) {
        const cleaned = block.map(l => {
          let s = l;
          if (/^\|/.test(s)) s = s.replace(/^\|\s?/, '');
          if (/\|\s*$/.test(s)) s = s.replace(/\s*\|\s*$/, '');
          return s;
        });
        const codeHints = /[\{\}:=]|^\s*param\s+|^\s*resource\s+/i;
        const codeLikeCount = cleaned.filter(l => codeHints.test(l)).length;
        const nonEmptyCount = cleaned.filter(l => l.trim() !== '').length;
        if (nonEmptyCount > 0 && codeLikeCount >= Math.max(2, Math.floor(nonEmptyCount / 6))) {
          const isBicep = cleaned.some(l => /^\s*param\s+/i.test(l) || /^\s*resource\s+/i.test(l));
          out.push('```' + (isBicep ? 'bicep' : ''));
          cleaned.forEach(l => out.push(l));
          out.push('```');
        } else {
          cleaned.forEach(l => out.push(l));
        }
        i = j + 1;
        continue;
      } else {
        out.push(line);
        i++;
        continue;
      }
    } else {
      out.push(line);
      i++;
    }
  }
  return out.join('\n');
}

function unwrapPipeBlocks(text) {
  const lines = text.split(/\r?\n/);
  const out = [];
  let i = 0;
  function unwrap(block) {
    const cleaned = block.map(l => l.replace(/^\|\s?/, '').replace(/\s*\|\s*$/, ''));
    const codeHints = /(^\s*param\s+)|(^\s*resource\s+)|[\{\}\[\];=]|^\s*const\s+|^\s*function\s+|^\s*import\s+/i;
    const codeLikeCount = cleaned.filter(l => codeHints.test(l)).length;
    const nonEmpty = cleaned.filter(l => l.trim() !== '').length;
    if (nonEmpty > 0 && codeLikeCount >= Math.max(2, Math.floor(nonEmpty / 6))) {
      const isBicep = cleaned.some(l => /^\s*param\s+/i.test(l) || /^\s*resource\s+/i.test(l));
      const isTS = cleaned.some(l => /^\s*(const|let|function)\s+/i.test(l));
      const lang = isBicep ? 'bicep' : isTS ? 'ts' : '';
      return ['```' + lang, ...cleaned, '```'];
    }
    return cleaned;
  }
  while (i < lines.length) {
    if (/^\|/.test(lines[i])) {
      const block = [];
      while (i < lines.length && /^\|/.test(lines[i])) {
        block.push(lines[i]);
        i++;
      }
      const replaced = unwrap(block);
      replaced.forEach(l => out.push(l));
    } else {
      out.push(lines[i]);
      i++;
    }
  }
  return out.join('\n');
}

function unwrapProseCodeblocks(text) {
  const lines = text.split(/\r?\n/);
  const out = [];
  let i = 0;
  while (i < lines.length) {
    const m = lines[i].match(/^```(.*)$/);
    if (m) {
      const fence = m[0];
      const block = [];
      let j = i + 1;
      while (j < lines.length && !lines[j].startsWith('```')) {
        block.push(lines[j]);
        j++;
      }
      if (j >= lines.length) {
        out.push(lines[i]);
        i++;
        continue;
      }
      const codeHint = /(^\s*param\s+)|(^\s*resource\s+)|[\{\}\[\];=<>]|^\s*const\s+|^\s*function\s+|^\s*import\s+/i;
      let codeLike = 0;
      let proseLike = 0;
      for (const l of block) {
        if (codeHint.test(l)) codeLike++;
        if (/[\w].*[\.\,\;].*/.test(l) || /\w{20,}/.test(l)) proseLike++;
      }
      if (proseLike > codeLike) {
        // unwrap and unescape common sequences
        block.forEach(l => out.push(l.replace(/\\(["'])/g, '$1').replace(/\\\./g, '.')));
        i = j + 1;
        continue;
      } else {
        out.push(lines[i]);
        block.forEach(l => out.push(l));
        out.push(lines[j]);
        i = j + 1;
        continue;
      }
    } else {
      out.push(lines[i]);
      i++;
    }
  }
  return out.join('\n');
}

const files = walk(root);
const modified = [];
for (const f of files) {
  try {
    let txt = fs.readFileSync(f, 'utf8');
    const original = txt;
    txt = unwrapProseCodeblocks(txt);
    txt = convertAsciiTables(txt);
    txt = unwrapPipeBlocks(txt);
    txt = unescapeCodeblocks(txt);
    if (txt !== original) {
      fs.writeFileSync(f, txt, 'utf8');
      modified.push(f);
    }
  } catch (err) {
    console.error('Error processing', f, err);
  }
}

console.log(`Processed ${files.length} markdown files. Modified: ${modified.length}`);
modified.forEach(m => console.log(' M', m));
process.exit(0);

