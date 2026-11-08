// GET /api/config → login ligado?, Client ID do Google e configurações do jogo definidas no painel admin.
import { configured, GOOGLE_CLIENT_ID, HAS_BLOB, getSettings, DEFAULT_SETTINGS } from './_lib.js';

export async function GET() {
  let settings = { ...DEFAULT_SETTINGS };
  try { if (configured()) settings = await getSettings(); } catch { /* sem banco: usa o padrão */ }
  return Response.json(
    {
      enabled: configured(),
      googleClientId: configured() ? GOOGLE_CLIENT_ID : '',
      backups: HAS_BLOB,
      announcement: settings.announcement || '',
      eventName: settings.eventName || '',
      coinMultiplier: [1, 2, 3].includes(settings.coinMultiplier) ? settings.coinMultiplier : 1,
      // MP3 da Iara falando o aviso/evento (gerado quando o admin salva); vazio = o jogo usa a voz do aparelho
      eventVoice: settings.voice && settings.voice.hash ? `/api/voz-evento?v=${settings.voice.hash}` : '',
    },
    { headers: { 'cache-control': 'no-store' } },
  );
}
