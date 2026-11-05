// POST /api/auth   { credential } → confere o login do Google, cria/atualiza o jogador e abre a sessão.
// DELETE /api/auth → sai da conta.
import { configured, ensureSchema, sql, verifyGoogleCredential, sessionCookie, clearCookie, json, loadPlayer } from './_lib.js';

export async function POST(request) {
  if (!configured()) return json({ error: 'Login ainda não configurado.' }, 503);
  let body;
  try { body = await request.json(); } catch { return json({ error: 'Pedido inválido.' }, 400); }
  if (!body || typeof body.credential !== 'string' || body.credential.length > 4096) return json({ error: 'Pedido inválido.' }, 400);

  let g;
  try { g = await verifyGoogleCredential(body.credential); } catch { return json({ error: 'Não foi possível confirmar o login do Google.' }, 401); }

  await ensureSchema();
  const id = `google:${g.sub}`;
  const name = typeof g.name === 'string' ? g.name.slice(0, 120) : null;
  const email = typeof g.email === 'string' ? g.email.slice(0, 200) : null;
  const picture = typeof g.picture === 'string' && g.picture.startsWith('https://') ? g.picture.slice(0, 500) : null;
  await sql`insert into players (id, email, name, picture) values (${id}, ${email}, ${name}, ${picture})
    on conflict (id) do update set email = excluded.email, name = excluded.name, picture = excluded.picture, last_login = now()`;

  const data = await loadPlayer(id);
  return json(data, 200, { 'set-cookie': await sessionCookie(id) });
}

export function DELETE() {
  return json({ ok: true }, 200, { 'set-cookie': clearCookie() });
}
