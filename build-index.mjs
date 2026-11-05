// Gera o index.html (página completa do site) a partir de pescaria-lendaria.html (versão de artefato do Claude).
// Uso: node build-index.mjs
import { readFileSync, writeFileSync } from 'node:fs';

const src = readFileSync('pescaria-lendaria.html', 'utf8');
const cut = src.indexOf('</style>') + '</style>'.length;
let head = src.slice(0, cut);
const body = src.slice(cut).trim();
head = head
  .replace(/<title>[^<]*<\/title>\s*/, '')
  .replace(/<meta charset="utf-8">\s*/, '')
  .replace(/<meta name="viewport"[^>]*>\s*/, '');

const icon = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🎣</text></svg>');
const out = `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover">
<title>Pescaria Lendária</title>
<meta name="description" content="Jogo de pescaria educativo: pesque no mar e no Rio Amazonas, aprenda curiosidades sobre cada peixe com a Iara e chegue até o Megalodon!">
<meta name="theme-color" content="#06142b">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta property="og:title" content="Pescaria Lendária">
<meta property="og:description" content="Pesque, aprenda sobre os peixes e encontre o Megalodon!">
<link rel="icon" href="${icon}">
${head}
</head>
<body>
${body}
</body>
</html>
`;
writeFileSync('index.html', out);
console.log(`index.html gerado (${out.length} bytes)`);
