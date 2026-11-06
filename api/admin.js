// Painel admin. Só para e-mails em ADMIN_EMAILS.
// GET  /api/admin?action=stats | players | player&id= | log | settings | export | backup&id=&date=
// POST /api/admin { action: update | reset | restore | delete | settings, ... }
import { list, get, del } from '@vercel/blob';
import { requireAdmin, sql, json, getSettings, logAdmin, summarize, blobId, HAS_BLOB, DEFAULT_SETTINGS } from './_lib.js';

const SORTS = { recent: 'p.last_login', created: 'p.created_at', coins: 's.coins', caught: 's.caught', album: 's.album', name: 'p.name' };
const BAITS = ['minhoca', 'grilo', 'camarao', 'fruta', 'peixinho', 'lula', 'lendaria'];
const PAGE = 50;

const forbidden = () => json({ error: 'Acesso só para administradores.' }, 403);
const int = (v, min, max) => { const n = Math.floor(Number(v)); return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : null; };

async function playerRow(id) {
  const rows = await sql`select p.id, p.name, p.email, p.picture, p.created_at, p.last_login, s.data, s.updated_at
    from players p left join saves s on s.player_id = p.id where p.id = ${id}`;
  return rows[0] || null;
}

async function listBackups(id) {
  if (!HAS_BLOB) return [];
  try {
    const r = await list({ prefix: `backups/${blobId(id)}/`, limit: 100 });
    return r.blobs.map((b) => ({ date: b.pathname.split('/').pop().replace('.json', ''), size: b.size, uploadedAt: b.uploadedAt }))
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  } catch { return []; }
}

async function readBackup(id, date) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(date))) return null;
  const r = await get(`backups/${blobId(id)}/${date}.json`, { access: 'private', useCache: false });
  if (!r || r.statusCode !== 200) return null;
  return JSON.parse(await new Response(r.stream).text());
}

// Grava o progresso alterado pelo admin; adminRev faz o jogo do jogador aceitar a mudança.
async function writeSave(id, data, prevData) {
  data.adminRev = (Number(prevData && prevData.adminRev) || 0) + 1;
  data.updated = Date.now();
  const s = summarize(data);
  await sql`insert into saves (player_id, data, coins, album, caught, mega, updated_at)
    values (${id}, ${JSON.stringify(data)}::jsonb, ${s.coins}, ${s.album}, ${s.caught}, ${s.mega}, now())
    on conflict (player_id) do update set data = excluded.data, coins = excluded.coins, album = excluded.album,
      caught = excluded.caught, mega = excluded.mega, updated_at = now()`;
  return data;
}

const csvCell = (v) => { const s = v == null ? '' : String(v); return /[",\n;]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s; };

export async function GET(request) {
  const admin = await requireAdmin(request);
  if (!admin) return forbidden();
  const url = new URL(request.url);
  const action = url.searchParams.get('action') || 'stats';

  if (action === 'stats') {
    const [tot] = await sql`select
        (select count(*) from players)::int as players,
        (select count(*) from players where last_login > now() - interval '1 day')::int as active1,
        (select count(*) from players where last_login > now() - interval '7 days')::int as active7,
        (select count(*) from players where created_at > now() - interval '7 days')::int as new7,
        coalesce(sum(s.caught), 0)::bigint as caught,
        coalesce(sum(s.coins), 0)::bigint as coins,
        count(*) filter (where s.mega)::int as mega,
        coalesce(round(avg(s.album)::numeric, 1), 0)::float as album_avg,
        count(*) filter (where (s.data->>'river')::int >= 1)::int as river
      from saves s`;
    const signups = await sql`select to_char(d, 'YYYY-MM-DD') as day, coalesce(c.n, 0)::int as n
      from generate_series(date_trunc('day', now()) - interval '29 days', date_trunc('day', now()), interval '1 day') d
      left join (select date_trunc('day', created_at) as day, count(*) as n from players group by 1) c on c.day = d
      order by d`;
    const species = await sql`select e.key as id, sum((e.value->>'count')::int)::int as n, count(*)::int as players
      from saves s, jsonb_each(coalesce(s.data->'album', '{}'::jsonb)) e group by e.key order by n desc`;
    const top = await sql`select p.id, p.name, p.email, p.picture, s.coins, s.caught, s.album, s.mega
      from players p join saves s on s.player_id = p.id order by s.coins desc limit 10`;
    return json({ totals: tot, signups, species, top, settings: await getSettings() });
  }

  if (action === 'players') {
    const q = (url.searchParams.get('q') || '').trim().slice(0, 80);
    const like = `%${q}%`;
    const sortKey = SORTS[url.searchParams.get('sort')] ? url.searchParams.get('sort') : 'recent';
    const page = int(url.searchParams.get('page'), 0, 10000) || 0;
    const order = sql.unsafe(`${SORTS[sortKey]} ${sortKey === 'name' ? 'asc' : 'desc'} nulls last`);
    const rows = await sql`select p.id, p.name, p.email, p.picture, p.created_at, p.last_login,
        s.coins, s.caught, s.album, s.mega, s.updated_at, (s.data->>'river')::int as river, (s.data->>'rod')::int as rod
      from players p left join saves s on s.player_id = p.id
      where (${q} = '' or p.name ilike ${like} or p.email ilike ${like})
      order by ${order} limit ${PAGE} offset ${page * PAGE}`;
    const [{ n }] = await sql`select count(*)::int as n from players p where (${q} = '' or p.name ilike ${like} or p.email ilike ${like})`;
    return json({ players: rows, total: n, page, pageSize: PAGE });
  }

  if (action === 'player') {
    const id = url.searchParams.get('id') || '';
    const row = await playerRow(id);
    if (!row) return json({ error: 'Jogador não encontrado.' }, 404);
    const log = await sql`select at, admin_email, action, detail from admin_log where target = ${id} order by at desc limit 30`;
    return json({ player: row, backups: await listBackups(id), log });
  }

  if (action === 'backup') {
    const id = url.searchParams.get('id') || '';
    const data = await readBackup(id, url.searchParams.get('date'));
    return data ? json({ data }) : json({ error: 'Cópia não encontrada.' }, 404);
  }

  if (action === 'log') {
    const rows = await sql`select l.at, l.admin_email, l.action, l.target, l.detail, p.name as target_name
      from admin_log l left join players p on p.id = l.target order by l.at desc limit 200`;
    return json({ log: rows });
  }

  if (action === 'settings') return json({ settings: await getSettings() });

  if (action === 'export') {
    const rows = await sql`select p.name, p.email, p.created_at, p.last_login, s.coins, s.caught, s.album, s.mega,
        (s.data->>'rod')::int as rod, (s.data->>'line')::int as line, (s.data->>'river')::int as river
      from players p left join saves s on s.player_id = p.id order by p.created_at`;
    const head = ['nome', 'email', 'criado_em', 'ultimo_acesso', 'moedas', 'peixes_pescados', 'album', 'megalodon', 'vara', 'linha', 'rio'];
    const lines = [head.join(';')].concat(rows.map((r) => [r.name, r.email, new Date(r.created_at).toISOString(), new Date(r.last_login).toISOString(),
      r.coins ?? 0, r.caught ?? 0, r.album ?? 0, r.mega ? 'sim' : 'não', r.rod ?? 0, r.line ?? 0, r.river ? 'sim' : 'não'].map(csvCell).join(';')));
    await logAdmin(admin.email, 'export', null, { rows: rows.length });
    return new Response('﻿' + lines.join('\n'), { headers: {
      'content-type': 'text/csv; charset=utf-8', 'cache-control': 'no-store',
      'content-disposition': `attachment; filename="pescaria-jogadores-${new Date().toISOString().slice(0, 10)}.csv"` } });
  }

  return json({ error: 'Ação desconhecida.' }, 400);
}

export async function POST(request) {
  const admin = await requireAdmin(request);
  if (!admin) return forbidden();
  let body;
  try { body = await request.json(); } catch { return json({ error: 'Pedido inválido.' }, 400); }
  const action = body && body.action;

  if (action === 'settings') {
    const cur = await getSettings();
    const next = {
      ...DEFAULT_SETTINGS, ...cur,
      announcement: typeof body.announcement === 'string' ? body.announcement.trim().slice(0, 160) : cur.announcement,
      eventName: typeof body.eventName === 'string' ? body.eventName.trim().slice(0, 40) : cur.eventName,
      coinMultiplier: [1, 2, 3].includes(Number(body.coinMultiplier)) ? Number(body.coinMultiplier) : cur.coinMultiplier,
    };
    await sql`insert into settings (key, value, updated_at) values ('game', ${JSON.stringify(next)}::jsonb, now())
      on conflict (key) do update set value = excluded.value, updated_at = now()`;
    await logAdmin(admin.email, 'settings', null, next);
    return json({ ok: true, settings: next });
  }

  const id = typeof body.id === 'string' ? body.id : '';
  const row = await playerRow(id);
  if (!row) return json({ error: 'Jogador não encontrado.' }, 404);
  const prev = row.data || {};

  if (action === 'update') {
    const data = JSON.parse(JSON.stringify(prev));
    const changes = {};
    const c = int(body.coins, 0, 100_000_000); if (c !== null) { changes.coins = [data.coins || 0, c]; data.coins = c; }
    const rod = int(body.rod, 0, 4); if (rod !== null) { changes.rod = [data.rod || 0, rod]; data.rod = rod; }
    const line = int(body.line, 0, 4); if (line !== null) { changes.line = [data.line || 0, line]; data.line = line; }
    if (typeof body.river === 'boolean') { changes.river = [!!data.river, body.river]; data.river = body.river ? 1 : 0; if (!body.river && data.loc === 'rio') data.loc = 'mar'; }
    if (typeof body.mega === 'boolean') { changes.mega = [!!data.mega, body.mega]; data.mega = body.mega; }
    if (Array.isArray(body.baits)) {
      const owned = { minhoca: 1 };
      for (const b of body.baits) if (BAITS.includes(b)) owned[b] = 1;
      changes.baits = Object.keys(owned); data.baits = owned;
      if (!owned[data.bait]) data.bait = 'minhoca';
    }
    if (!Object.keys(changes).length) return json({ error: 'Nada para alterar.' }, 400);
    const saved = await writeSave(id, data, prev);
    await logAdmin(admin.email, 'update', id, changes);
    return json({ ok: true, data: saved });
  }

  if (action === 'reset') {
    const saved = await writeSave(id, { casts: 0 }, prev);
    await logAdmin(admin.email, 'reset', id, { before: summarize(prev) });
    return json({ ok: true, data: saved });
  }

  if (action === 'restore') {
    const backup = await readBackup(id, body.date);
    if (!backup) return json({ error: 'Cópia não encontrada.' }, 404);
    const saved = await writeSave(id, backup, prev);
    await logAdmin(admin.email, 'restore', id, { date: body.date, before: summarize(prev), after: summarize(saved) });
    return json({ ok: true, data: saved });
  }

  if (action === 'delete') {
    if (body.confirm !== row.email) return json({ error: 'Digite o e-mail do jogador para confirmar.' }, 400);
    if (HAS_BLOB) {
      try { const r = await list({ prefix: `backups/${blobId(id)}/`, limit: 1000 }); if (r.blobs.length) await del(r.blobs.map((b) => b.url)); } catch { /* segue */ }
    }
    await sql`delete from players where id = ${id}`;
    await logAdmin(admin.email, 'delete', id, { name: row.name, email: row.email, before: summarize(prev) });
    return json({ ok: true });
  }

  return json({ error: 'Ação desconhecida.' }, 400);
}
