// PUT /api/save { data } → grava o progresso da conta no Neon.
// Uma vez por dia também guarda uma cópia de segurança no Vercel Blob (privado).
// Se o admin alterou o progresso (adminRev maior no banco), devolve 409 com o progresso novo.
import { put } from '@vercel/blob';
import { configured, ensureSchema, sql, sessionPlayer, json, HAS_BLOB, summarize, blobId } from './_lib.js';

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

  await ensureSchema();
  const prev = await sql`select updated_at, data from saves where player_id = ${id}`;
  const serverRev = prev.length ? Number(prev[0].data && prev[0].data.adminRev) || 0 : 0;
  const clientRev = Number(data.adminRev) || 0;
  if (serverRev > clientRev) return json({ error: 'O progresso foi atualizado pelo administrador.', save: prev[0].data }, 409);

  const s = summarize(data);
  const dataText = JSON.stringify(data);
  await sql`insert into saves (player_id, data, coins, album, caught, mega, updated_at)
    values (${id}, ${dataText}::jsonb, ${s.coins}, ${s.album}, ${s.caught}, ${s.mega}, now())
    on conflict (player_id) do update set data = excluded.data, coins = excluded.coins, album = excluded.album,
      caught = excluded.caught, mega = excluded.mega, updated_at = now()`;

  let backup = false;
  const today = new Date().toISOString().slice(0, 10);
  const lastDay = prev.length ? new Date(prev[0].updated_at).toISOString().slice(0, 10) : null;
  if (HAS_BLOB && lastDay !== today) {
    try {
      await put(`backups/${blobId(id)}/${today}.json`, dataText, {
        access: 'private', contentType: 'application/json', addRandomSuffix: false, allowOverwrite: true,
      });
      backup = true;
    } catch { /* a cópia de segurança é opcional; o progresso já foi salvo no banco */ }
  }
  return json({ ok: true, backup });
}
