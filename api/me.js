// GET /api/me → dados da conta logada e o progresso salvo.
import { configured, ensureSchema, sessionPlayer, json, loadPlayer, clearCookie } from './_lib.js';

export async function GET(request) {
  if (!configured()) return json({ error: 'Login ainda não configurado.' }, 503);
  const id = await sessionPlayer(request);
  if (!id) return json({ error: 'Sem sessão.' }, 401);
  await ensureSchema();
  const data = await loadPlayer(id);
  if (!data) return json({ error: 'Conta não encontrada.' }, 401, { 'set-cookie': clearCookie() });
  return json(data);
}
