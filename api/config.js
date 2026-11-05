// GET /api/config → diz ao jogo se o login está configurado e qual Client ID do Google usar.
import { configured, GOOGLE_CLIENT_ID, HAS_BLOB } from './_lib.js';

export function GET() {
  return Response.json(
    { enabled: configured(), googleClientId: configured() ? GOOGLE_CLIENT_ID : '', backups: HAS_BLOB },
    { headers: { 'cache-control': 'no-store' } },
  );
}
