// Voz da Iara gerada pelo servidor (ElevenLabs) para textos que o admin escreve, como avisos e eventos.
// Precisa das variáveis ELEVENLABS_API_KEY e ELEVENLABS_VOICE_ID na Vercel; sem elas o jogo usa a voz do aparelho.
import { createHash } from 'node:crypto';
import { put, get } from '@vercel/blob';
import { HAS_BLOB } from './_lib.js';

const API_KEY = process.env.ELEVENLABS_API_KEY || '';
const VOICE_ID = process.env.ELEVENLABS_VOICE_ID || '';
const MODEL = process.env.ELEVENLABS_MODEL || 'eleven_multilingual_v2';
const num = (v, d, min, max) => { const n = Number(v); return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : d; };
// mesmas configurações do gerador do roteiro (narracao/gerar-audios.mjs), para a voz soar igual
const SETTINGS = {
  stability: num(process.env.ELEVENLABS_STABILITY, 0.45, 0, 1),
  similarity_boost: 0.8,
  style: num(process.env.ELEVENLABS_STYLE, 0.35, 0, 1),
  use_speaker_boost: true,
  speed: num(process.env.ELEVENLABS_SPEED, 1, 0.7, 1.2),
};

export const HAS_VOICE = !!(API_KEY && VOICE_ID && HAS_BLOB);

// O mesmo texto que o jogo fala ao abrir (pescaria-lendaria.html, função do aviso).
export function eventSpeech(s) {
  const parts = [];
  if (s.announcement) parts.push(`Aviso do porto: ${s.announcement}`);
  if (s.coinMultiplier > 1) parts.push(`Hoje tem ${s.eventName || 'evento especial'}: as moedas valem ${s.coinMultiplier === 2 ? 'o dobro' : 'o triplo'}!`);
  return parts.join(' ');
}

const voiceHash = (text) => createHash('sha1').update(`${VOICE_ID}|${MODEL}|${JSON.stringify(SETTINGS)}|${text}`).digest('hex').slice(0, 12);
const pathOf = (hash) => `voz/evento-${hash}.mp3`;

// Gera o MP3 e guarda no Blob. Devolve {hash, text, bytes} ou lança um erro com mensagem amigável.
export async function makeEventVoice(text) {
  if (!HAS_VOICE) throw new Error('Voz automática desligada: falta ELEVENLABS_API_KEY ou ELEVENLABS_VOICE_ID na Vercel.');
  const hash = voiceHash(text);
  const r = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(VOICE_ID)}?output_format=mp3_44100_128`, {
    method: 'POST',
    headers: { 'xi-api-key': API_KEY, 'content-type': 'application/json', accept: 'audio/mpeg' },
    body: JSON.stringify({ text, model_id: MODEL, voice_settings: SETTINGS }),
  });
  if (!r.ok) {
    const body = await r.text().catch(() => '');
    if (r.status === 401) throw new Error('ElevenLabs recusou a chave (401). Confira ELEVENLABS_API_KEY na Vercel.');
    if (r.status === 404) throw new Error('ElevenLabs não achou a voz (404). Confira ELEVENLABS_VOICE_ID na Vercel.');
    if (r.status === 402) throw new Error('ElevenLabs pediu um plano pago ou acabaram os créditos (402).');
    if (r.status === 429) throw new Error('ElevenLabs está ocupado (429). Tente salvar de novo daqui a pouco.');
    throw new Error(`ElevenLabs respondeu ${r.status}: ${body.slice(0, 160)}`);
  }
  const mp3 = Buffer.from(await r.arrayBuffer());
  await put(pathOf(hash), mp3, { access: 'private', contentType: 'audio/mpeg', addRandomSuffix: false, allowOverwrite: true });
  return { hash, text, bytes: mp3.length };
}

export async function readEventVoice(hash) {
  if (!HAS_BLOB || !/^[0-9a-f]{12}$/.test(String(hash))) return null;
  const r = await get(pathOf(hash), { access: 'private' });
  if (!r || r.statusCode !== 200) return null;
  return r.stream;
}
