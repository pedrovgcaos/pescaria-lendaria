// PUT /api/save { data } → grava o progresso da conta no Neon.
// Uma vez por dia também guarda uma cópia de segurança no Vercel Blob (privado).
import { put } from '@vercel/blob';
import { configured, ensureSchema, sql, sessionPlayer, json, HAS_BLOB } from './_lib.js';

const MAX_BYTES = 200_000;

export async function PUT(request) {
  if (!configured()) return json({ error: 'Login ainda não configurado.' }, 503);
  const id = await sessionPlayer(request);
  if (!id) return json({ error: 'Sem sessão.' }, 401);

  const text = await request.text();
  if (text.length > MAX_BYTES) return json({ error: 'Progresso grande demais.' }, 413);
  let body;
  try { body = JSON.parse(text); } catch { return json({ error: 'Pedido inválido.' }, 400); }
  const data = body && body.data;
  if (!data || typeof data !== 'object' || Array.isArray(data)) return json({ error: 'Pedido inválido.' }, 400);

  const num = (v) => (Number.isFinite(v) ? Math.max(0, Math.floor(v)) : 0);
  const coins = num(data.coins);
  const album = data.album && typeof data.album === 'object' ? Object.keys(data.album).length : 0;
  const caught = num(data.stats && data.stats.caught);
  const mega = data.mega === true;

  await ensureSchema();
  const prev = await sql`select updated_at from saves where player_id = ${id}`;
  await sql`insert into saves (player_id, data, coins, album, caught, mega, updated_at)
    values (${id}, ${JSON.stringify(data)}::jsonb, ${coins}, ${album}, ${caught}, ${mega}, now())
    on conflict (player_id) do update set data = excluded.data, coins = excluded.coins, album = excluded.album,
      caught = excluded.caught, mega = excluded.mega, updated_at = now()`;

  let backup = false;
  const today = new Date().toISOString().slice(0, 10);
  const lastDay = prev.length ? new Date(prev[0].updated_at).toISOString().slice(0, 10) : null;
  if (HAS_BLOB && lastDay !== today) {
    try {
      const safeId = id.replace(/[^a-zA-Z0-9_-]/g, '_');
      await put(`backups/${safeId}/${today}.json`, text, {
        access: 'private', contentType: 'application/json', addRandomSuffix: false, allowOverwrite: true,
      });
      backup = true;
    } catch { /* a cópia de segurança é opcional; o progresso já foi salvo no banco */ }
  }
  return json({ ok: true, backup });
}
