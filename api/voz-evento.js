// GET /api/voz-evento?v=<hash> → o MP3 da Iara falando o aviso/evento atual (gerado quando o admin salva).
import { readEventVoice } from './_voz.js';

export async function GET(request) {
  const v = new URL(request.url).searchParams.get('v') || '';
  let stream = null;
  try { stream = await readEventVoice(v); } catch { /* sem áudio: o jogo usa a voz do aparelho */ }
  if (!stream) return new Response('não encontrado', { status: 404, headers: { 'cache-control': 'no-store' } });
  // o endereço muda quando o texto muda (v = hash), então pode ficar em cache por bastante tempo
  return new Response(stream, { headers: { 'content-type': 'audio/mpeg', 'cache-control': 'public, max-age=86400, immutable' } });
}
