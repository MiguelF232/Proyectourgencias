#!/usr/bin/env node
/**
 * build-visor.js — Genera un visor autocontenido (un solo archivo HTML)
 * con el CSS y el JS embebidos. Útil para abrir/compartir la app sin servidor.
 *
 * Uso:  node build-visor.js
 * Salida: visor/urgencias-visor.html
 */
const fs = require('fs');
const path = require('path');

const root = __dirname;
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');

const html = read('index.html');
const css = read('css/styles.css');
const dataJs = read('js/data.js');
const hospitalesJs = read('js/hospitales.js');
const appJs = read('js/app.js');

let out = html
  // Reemplaza el link del CSS por un <style> embebido.
  .replace(
    /<link\s+rel="stylesheet"\s+href="css\/styles\.css"\s*\/>/,
    '<style>\n' + css + '\n</style>'
  )
  // Reemplaza los <script src=...> por el código embebido en orden.
  .replace(/<script\s+src="js\/data\.js"><\/script>/, '<script>\n' + dataJs + '\n</script>')
  .replace(/<script\s+src="js\/hospitales\.js"><\/script>/, '<script>\n' + hospitalesJs + '\n</script>')
  .replace(/<script\s+src="js\/app\.js"><\/script>/, '<script>\n' + appJs + '\n</script>');

const outDir = path.join(root, 'visor');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
const outFile = path.join(outDir, 'urgencias-visor.html');
fs.writeFileSync(outFile, out, 'utf8');

console.log('Visor generado:', path.relative(root, outFile));
console.log('Tamaño:', (Buffer.byteLength(out, 'utf8') / 1024).toFixed(1), 'KB');
