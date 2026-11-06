// Gera os áudios da Iara no ElevenLabs a partir de narracao/roteiro-narracao.csv.
//
// Uso (PowerShell):
//   $env:ELEVENLABS_API_KEY = "sua-chave"
//   $env:ELEVENLABS_VOICE_ID = "id-da-voz"
//   node narracao/gerar-audios.mjs --teste      # gera só 5 falas para ouvir a voz
//   node narracao/gerar-audios.mjs              # gera todas as que faltam
//
// Opções:
//   --simular         não chama o ElevenLabs; só mostra quantas falas e caracteres seriam gerados
//   --teste           gera 5 falas variadas em narracao/audio-teste/ para escolher a voz
//   --refazer         gera de novo mesmo os áudios que já existem
//   --so=prefixo      gera só as falas cujo id começa com o prefixo (ex.: --so=sabia_)
//
// Variáveis opcionais: ELEVENLABS_MODEL (padrão eleven_multilingual_v2), ELEVENLABS_SPEED (0.7 a 1.2, padrão 1),
// ELEVENLABS_STABILITY (padrão 0.45), ELEVENLABS_STYLE (padrão 0.35).
//
// O script continua de onde parou: áudios que já existem e cujo texto não mudou são pulados.
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const flag = (n) => args.includes(`--${n}`);
const opt = (n) => { const a = args.find((x) => x.startsWith(`--${n}=`)); return a ? a.slice(n.length + 3) : ''; };
const SIMULAR = flag('simular'), TESTE = flag('teste'), REFAZER = flag('refazer'), SO = opt('so');

const API_KEY = process.env.ELEVENLABS_API_KEY || '';
const VOICE_ID = process.env.ELEVENLABS_VOICE_ID || '';
const MODEL = process.env.ELEVENLABS_MODEL || 'eleven_multilingual_v2';
const num = (v, d, min, max) => { const n = Number(v); return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : d; };
const SETTINGS = {
  stability: num(process.env.ELEVENLABS_STABILITY, 0.45, 0, 1),
  similarity_boost: 0.8,
  style: num(process.env.ELEVENLABS_STYLE, 0.35, 0, 1),
  use_speaker_boost: true,
  speed: num(process.env.ELEVENLABS_SPEED, 1, 0.7, 1.2),
};
const CONCORRENCIA = 2;

// ---- lê o CSV (separado por ";" com aspas) ----
function parseCsv(text) {
  const rows = []; let row = [], cell = '', q = false;
  text = text.replace(/^﻿/, '');
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) { if (c === '"' && text[i + 1] === '"') { cell += '"'; i++; } else if (c === '"') q = false; else cell += c; continue; }
    if (c === '"') q = true; else if (c === ';') { row.push(cell); cell = ''; }
    else if (c === '\n' || c === '\r') { if (c === '\r' && text[i + 1] === '\n') i++; row.push(cell); cell = ''; if (row.some((x) => x !== '')) rows.push(row); row = []; }
    else cell += c;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  const [head, ...body] = rows;
  return body.map((r) => Object.fromEntries(head.map((h, i) => [h, r[i] ?? ''])));
}

const csvPath = join(here, 'roteiro-narracao.csv');
if (!existsSync(csvPath)) { console.error('Não achei narracao/roteiro-narracao.csv. Rode antes: node narracao/gerar-roteiro.mjs'); process.exit(1); }
let falas = parseCsv(readFileSync(csvPath, 'utf8')).filter((f) => f.id && f.texto);
if (SO) falas = falas.filter((f) => f.id.startsWith(SO));
if (TESTE) {
  const escolha = ['abertura_primeira', 'comemora_1', 'sabia_tucunare', 'arrebentou_1', 'mega_chegando'];
  falas = escolha.map((id) => falas.find((f) => f.id === id)).filter(Boolean);
}

const outDir = join(here, TESTE ? 'audio-teste' : 'audio');
const manifestPath = join(outDir, 'manifest.json');
const hash = (t) => createHash('sha1').update(`${VOICE_ID}|${MODEL}|${JSON.stringify(SETTINGS)}|${t}`).digest('hex').slice(0, 12);
let manifest = {};
if (existsSync(manifestPath)) { try { manifest = JSON.parse(readFileSync(manifestPath, 'utf8')); } catch { manifest = {}; } }

// Refaz o que falta, o que mudou de texto e (com Voice ID definido) o que foi gerado com outra voz/configuração.
const textHash = (t) => createHash('sha1').update(t).digest('hex').slice(0, 12);
const mudou = (f) => {
  const m = manifest[f.id]; if (!m) return false;
  if (m.texto && m.texto !== textHash(f.texto)) return true;
  return !!VOICE_ID && m.hash !== hash(f.texto);
};
const pendentes = falas.filter((f) => REFAZER || !existsSync(join(outDir, f.arquivo)) || mudou(f));
const chars = pendentes.reduce((a, f) => a + f.texto.length, 0);
console.log(`Roteiro: ${falas.length} falas · faltam ${pendentes.length} (${chars.toLocaleString('pt-BR')} caracteres) · modelo ${MODEL}`);

if (SIMULAR) { console.log('Modo simulação: nada foi enviado ao ElevenLabs.'); process.exit(0); }
if (!API_KEY || !VOICE_ID) {
  console.error('\nFaltam as variáveis ELEVENLABS_API_KEY e/ou ELEVENLABS_VOICE_ID.');
  console.error('PowerShell:  $env:ELEVENLABS_API_KEY = "sua-chave";  $env:ELEVENLABS_VOICE_ID = "id-da-voz"');
  console.error('Git Bash:    export ELEVENLABS_API_KEY="sua-chave" ELEVENLABS_VOICE_ID="id-da-voz"');
  process.exit(1);
}
if (!pendentes.length) { console.log('Tudo pronto: nenhum áudio faltando.'); process.exit(0); }
mkdirSync(outDir, { recursive: true });

const espera = (ms) => new Promise((r) => setTimeout(r, ms));
async function gerar(f) {
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(VOICE_ID)}?output_format=mp3_44100_128`;
  for (let tentativa = 1; tentativa <= 5; tentativa++) {
    const r = await fetch(url, {
      method: 'POST',
      headers: { 'xi-api-key': API_KEY, 'content-type': 'application/json', accept: 'audio/mpeg' },
      body: JSON.stringify({ text: f.texto, model_id: MODEL, voice_settings: SETTINGS }),
    });
    if (r.ok) return Buffer.from(await r.arrayBuffer());
    const corpo = await r.text().catch(() => '');
    if (r.status === 401) throw new Error('Chave de API inválida (401). Confira ELEVENLABS_API_KEY.');
    if (r.status === 404) throw new Error('Voz não encontrada (404). Confira ELEVENLABS_VOICE_ID.');
    if (r.status === 402 && /library voices/i.test(corpo)) throw new Error('Essa voz é da Voice Library, que a conta gratuita não pode usar pela API. Use uma voz criada por você no Voice Design (aba My Voices) ou assine um plano pago.');
    if (r.status === 402) throw new Error(`O ElevenLabs pediu um plano pago (402): ${corpo.slice(0, 200)}`);
    if (/quota|credits|limit/i.test(corpo) && r.status !== 429) throw new Error(`Créditos do ElevenLabs acabaram: ${corpo.slice(0, 200)}`);
    if (r.status === 429 || r.status >= 500) { const s = 2 ** tentativa; console.warn(`  ${f.id}: servidor ocupado (${r.status}), tentando de novo em ${s}s…`); await espera(s * 1000); continue; }
    throw new Error(`${f.id}: erro ${r.status} ${corpo.slice(0, 200)}`);
  }
  throw new Error(`${f.id}: desisti depois de 5 tentativas.`);
}

let feitos = 0, erro = null;
const fila = [...pendentes];
async function trabalhador() {
  while (fila.length && !erro) {
    const f = fila.shift();
    try {
      const mp3 = await gerar(f);
      writeFileSync(join(outDir, f.arquivo), mp3);
      manifest[f.id] = { arquivo: f.arquivo, hash: hash(f.texto), texto: textHash(f.texto), bytes: mp3.length };
      writeFileSync(manifestPath, JSON.stringify(manifest, null, 1));
      feitos++;
      console.log(`  ✓ ${String(feitos).padStart(3)}/${pendentes.length}  ${f.arquivo}`);
    } catch (e) { erro = e; }
  }
}
await Promise.all(Array.from({ length: CONCORRENCIA }, trabalhador));

// process.exitCode em vez de process.exit(): no Windows, sair à força com pedidos abertos derruba o Node.
if (erro) {
  console.error(`\nParou: ${erro.message}`);
  console.error(`${feitos} áudios foram salvos. Rode o mesmo comando de novo para continuar de onde parou.`);
  process.exitCode = 1;
} else {
  console.log(`\nPronto! ${feitos} áudios em ${TESTE ? 'narracao/audio-teste' : 'narracao/audio'}.`);
  if (TESTE) console.log('Ouça os arquivos. Se gostar da voz, rode sem --teste para gerar todas as falas.');
}
